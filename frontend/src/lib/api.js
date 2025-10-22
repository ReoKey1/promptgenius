import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth endpoints
export const auth = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me'),
  updateTier: (tier) => api.post('/auth/update-tier', { tier }),
};

// Prompts endpoints
export const prompts = {
  getAll: () => api.get('/prompts'),
  getOne: (id) => api.get(`/prompts/${id}`),
  create: (data) => api.post('/prompts', data),
  update: (id, data) => api.put(`/prompts/${id}`, data),
  delete: (id) => api.delete(`/prompts/${id}`),
  getVersions: (id) => api.get(`/prompts/${id}/versions`),
};

// Templates endpoints
export const templates = {
  getAll: () => api.get('/templates'),
  getOne: (id) => api.get(`/templates/${id}`),
  create: (data) => api.post('/templates', data),
  update: (id, data) => api.put(`/templates/${id}`, data),
  delete: (id) => api.delete(`/templates/${id}`),
};

// Brand voices endpoints
export const brandVoices = {
  getAll: () => api.get('/brand-voices'),
  getOne: (id) => api.get(`/brand-voices/${id}`),
  create: (data) => api.post('/brand-voices', data),
  update: (id, data) => api.put(`/brand-voices/${id}`, data),
  delete: (id) => api.delete(`/brand-voices/${id}`),
};

// Teams endpoints
export const teams = {
  getAll: () => api.get('/teams'),
  create: (data) => api.post('/teams', data),
  invite: (teamId, data) => api.post(`/teams/${teamId}/invite`, data),
  removeMember: (teamId, userId) => api.delete(`/teams/${teamId}/members/${userId}`),
};

// Payments endpoints
export const payments = {
  createCheckout: (data) => api.post('/payments/create-checkout', data),
  createSubscription: (data) => api.post('/payments/create-subscription', data),
  createPortalSession: () => api.post('/payments/create-portal-session'),
};

export default api;

