import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Organisations
export const organisationService = {
  list: () => api.get('/organisations'),
  get: (id) => api.get(`/organisations/${id}`),
  create: (data) => api.post('/organisations', data),
  update: (id, data) => api.put(`/organisations/${id}`, data),
  delete: (id) => api.delete(`/organisations/${id}`),
};

// People
export const personService = {
  list: () => api.get('/people'),
  get: (id) => api.get(`/people/${id}`),
  create: (data) => api.post('/people', data),
  update: (id, data) => api.put(`/people/${id}`, data),
  delete: (id) => api.delete(`/people/${id}`),
};

// Links
export const linkService = {
  list: () => api.get('/links'),
  get: (id) => api.get(`/links/${id}`),
  create: (data) => api.post('/links', data),
  update: (id, data) => api.put(`/links/${id}`, data),
  delete: (id) => api.delete(`/links/${id}`),
};

// Tasks
export const taskService = {
  list: (filters = {}) => {
    const params = new URLSearchParams(filters);
    return api.get(`/tasks?${params.toString()}`);
  },
  get: (id) => api.get(`/tasks/${id}`),
  create: (data) => api.post('/tasks', data),
  update: (id, data) => api.put(`/tasks/${id}`, data),
  delete: (id) => api.delete(`/tasks/${id}`),
  upcoming: () => api.get('/tasks/dashboard/upcoming'),
};

export default api;
