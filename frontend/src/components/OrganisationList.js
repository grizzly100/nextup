import React, { useState, useEffect } from 'react';
import { organisationService } from '../services/api';
import './EntityList.css';

const OrganisationList = () => {
  const [organisations, setOrganisations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    parent_id: '',
  });

  useEffect(() => {
    loadOrganisations();
  }, []);

  const loadOrganisations = async () => {
    try {
      setLoading(true);
      const response = await organisationService.list();
      setOrganisations(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to load organisations');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateOrganisation = async (e) => {
    e.preventDefault();
    try {
      await organisationService.create(formData);
      setFormData({ name: '', parent_id: '' });
      setShowForm(false);
      loadOrganisations();
    } catch (err) {
      setError('Failed to create organisation');
      console.error(err);
    }
  };

  const handleDeleteOrganisation = async (orgId) => {
    if (window.confirm('Are you sure?')) {
      try {
        await organisationService.delete(orgId);
        loadOrganisations();
      } catch (err) {
        setError('Failed to delete organisation');
        console.error(err);
      }
    }
  };

  const getParentName = (parentId) => {
    if (!parentId) return 'None';
    const parent = organisations.find(o => o.id === parentId);
    return parent ? parent.name : 'Unknown';
  };

  return (
    <div className="entity-container">
      <div className="entity-header">
        <h2>Organisations</h2>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary">
          {showForm ? 'Cancel' : '+ New Organisation'}
        </button>
      </div>

      {error && <div className="alert error">{error}</div>}

      {showForm && (
        <form onSubmit={handleCreateOrganisation} className="entity-form">
          <div className="form-group">
            <label>Name *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Parent Organisation</label>
            <select
              value={formData.parent_id}
              onChange={(e) => setFormData({ ...formData, parent_id: e.target.value })}
            >
              <option value="">None</option>
              {organisations.map(org => (
                <option key={org.id} value={org.id}>{org.name}</option>
              ))}
            </select>
          </div>
          <button type="submit" className="btn-primary">Create Organisation</button>
        </form>
      )}

      {loading ? (
        <div className="loading">Loading organisations...</div>
      ) : organisations.length === 0 ? (
        <div className="no-data">No organisations found</div>
      ) : (
        <div className="entity-grid">
          {organisations.map(org => (
            <div key={org.id} className="entity-card">
              <h3>{org.name}</h3>
              <p><strong>Parent:</strong> {getParentName(org.parent_id)}</p>
              <button
                onClick={() => handleDeleteOrganisation(org.id)}
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

export default OrganisationList;
