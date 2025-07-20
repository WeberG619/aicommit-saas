import axios from 'axios';
import toast from 'react-hot-toast';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

// Create axios instance
export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/auth/login';
      toast.error('Session expired. Please login again.');
    } else if (error.response?.data?.error) {
      toast.error(error.response.data.error);
    } else {
      toast.error('An unexpected error occurred');
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (data: { email: string; password: string; name: string }) =>
    api.post('/auth/register', data),
  
  login: (data: { email: string; password: string }) =>
    api.post('/auth/login', data),
  
  logout: () => api.post('/auth/logout'),
  
  resetPassword: (email: string) =>
    api.post('/auth/reset-password', { email }),
  
  updatePassword: (data: { token: string; password: string }) =>
    api.post('/auth/update-password', data),
};

// Commits API
export const commitsAPI = {
  generate: (data: { 
    diff: string; 
    style: string; 
    customInstructions?: string;
    businessContext?: string;
    ticketNumber?: string;
    impactArea?: string;
  }) =>
    api.post('/commits/generate', data),
  
  getHistory: (params?: { limit?: number; offset?: number }) =>
    api.get('/commits/history', { params }),
  
  analyze: (limit?: number) =>
    api.post('/commits/analyze', { limit }),
  
  getStyles: () => api.get('/commits/styles'),
  
  createStyle: (data: { name: string; prompt: string; examples: string }) =>
    api.post('/commits/styles', data),
};

// Subscriptions API
export const subscriptionsAPI = {
  createCheckout: (plan: string) =>
    api.post('/subscriptions/checkout', { plan }),
  
  updatePlan: (newPlan: string) =>
    api.post('/subscriptions/update', { newPlan }),
  
  cancel: () => api.post('/subscriptions/cancel'),
  
  createPortal: () => api.post('/subscriptions/portal'),
  
  getStatus: () => api.get('/subscriptions/status'),
};

// Users API
export const usersAPI = {
  getProfile: () => api.get('/users/me'),
  
  updateProfile: (data: { name?: string; company?: string; timezone?: string }) =>
    api.put('/users/me', data),
  
  getUsage: () => api.get('/users/usage'),
  
  getTeam: () => api.get('/users/team'),
  
  inviteTeamMember: (data: { email: string; role?: string }) =>
    api.post('/users/team/invite', data),
  
  removeTeamMember: (memberId: string) =>
    api.delete(`/users/team/${memberId}`),
  
  getApiKeys: () => api.get('/users/api-keys'),
  
  createApiKey: (name: string) =>
    api.post('/users/api-keys', { name }),
  
  deleteApiKey: (keyId: string) =>
    api.delete(`/users/api-keys/${keyId}`),
};