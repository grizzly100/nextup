import React, { useState, useEffect } from 'react';
import { linkService } from '../services/api';
import './EntityList.css';

const LinkList = () => {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    url: '',
    description: '',
  });

  useEffect(() => {
    loadLinks();
  }, []);

  const loadLinks = async () => {
    try {
      setLoading(true);
      const response = await linkService.list();
      setLinks(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to load links');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateLink = async (e) => {
    e.preventDefault();
    try {
      await linkService.create(formData);
      setFormData({ url: '', description: '' });
      setShowForm(false);
      loadLinks();
    } catch (err) {
      setError('Failed to create link');
      console.error(err);
    }
  };

  const handleDeleteLink = async (linkId) => {
    if (window.confirm('Are you sure?')) {
      try {
        await linkService.delete(linkId);
        loadLinks();
      } catch (err) {
        setError('Failed to delete link');
        console.error(err);
      }
    }
  };

  return (
    <div className="entity-container">
      <div className="entity-header">
        <h2>Links</h2>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary">
          {showForm ? 'Cancel' : '+ New Link'}
        </button>
      </div>

      {error && <div className="alert error">{error}</div>}

      {showForm && (
        <form onSubmit={handleCreateLink} className="entity-form">
          <div className="form-group">
            <label>URL *</label>
            <input
              type="url"
              value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              placeholder="https://example.com"
              required
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <input
              type="text"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Link description"
            />
          </div>
          <button type="submit" className="btn-primary">Create Link</button>
        </form>
      )}

      {loading ? (
        <div className="loading">Loading links...</div>
      ) : links.length === 0 ? (
        <div className="no-data">No links found</div>
      ) : (
        <div className="entity-grid">
          {links.map(link => (
            <div key={link.id} className="entity-card">
              <h3>{link.description || 'Untitled'}</h3>
              <p>
                <a href={link.url} target="_blank" rel="noopener noreferrer" className="link-url">
                  {link.url}
                </a>
              </p>
              <button
                onClick={() => handleDeleteLink(link.id)}
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

export default LinkList;
