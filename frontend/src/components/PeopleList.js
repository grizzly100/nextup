import React, { useState, useEffect } from 'react';
import { personService, organisationService } from '../services/api';
import './EntityList.css';

const PeopleList = () => {
  const [people, setPeople] = useState([]);
  const [organisations, setOrganisations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    organisation_id: '',
  });

  useEffect(() => {
    loadPeople();
    loadOrganisations();
  }, []);

  const loadPeople = async () => {
    try {
      setLoading(true);
      const response = await personService.list();
      setPeople(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to load people');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadOrganisations = async () => {
    try {
      const response = await organisationService.list();
      setOrganisations(response.data);
    } catch (err) {
      console.error('Failed to load organisations:', err);
    }
  };

  const handleCreatePerson = async (e) => {
    e.preventDefault();
    try {
      await personService.create(formData);
      setFormData({
        first_name: '',
        last_name: '',
        email: '',
        organisation_id: '',
      });
      setShowForm(false);
      loadPeople();
    } catch (err) {
      setError('Failed to create person');
      console.error(err);
    }
  };

  const handleDeletePerson = async (personId) => {
    if (window.confirm('Are you sure?')) {
      try {
        await personService.delete(personId);
        loadPeople();
      } catch (err) {
        setError('Failed to delete person');
        console.error(err);
      }
    }
  };

  const getOrganisationName = (orgId) => {
    const org = organisations.find(o => o.id === orgId);
    return org ? org.name : 'Unknown';
  };

  return (
    <div className="entity-container">
      <div className="entity-header">
        <h2>People</h2>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary">
          {showForm ? 'Cancel' : '+ New Person'}
        </button>
      </div>

      {error && <div className="alert error">{error}</div>}

      {showForm && (
        <form onSubmit={handleCreatePerson} className="entity-form">
          <div className="form-row">
            <div className="form-group">
              <label>First Name *</label>
              <input
                type="text"
                value={formData.first_name}
                onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Last Name *</label>
              <input
                type="text"
                value={formData.last_name}
                onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Email *</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Organisation *</label>
              <select
                value={formData.organisation_id}
                onChange={(e) => setFormData({ ...formData, organisation_id: e.target.value })}
                required
              >
                <option value="">Select an organisation</option>
                {organisations.map(org => (
                  <option key={org.id} value={org.id}>{org.name}</option>
                ))}
              </select>
            </div>
          </div>
          <button type="submit" className="btn-primary">Create Person</button>
        </form>
      )}

      {loading ? (
        <div className="loading">Loading people...</div>
      ) : people.length === 0 ? (
        <div className="no-data">No people found</div>
      ) : (
        <div className="entity-grid">
          {people.map(person => (
            <div key={person.id} className="entity-card">
              <h3>{person.first_name} {person.last_name}</h3>
              <p><strong>Email:</strong> {person.email}</p>
              <p><strong>Organisation:</strong> {getOrganisationName(person.organisation_id)}</p>
              <button
                onClick={() => handleDeletePerson(person.id)}
                className="btn-danger"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PeopleList;
