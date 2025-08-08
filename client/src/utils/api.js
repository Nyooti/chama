import axios from 'axios';
import toast from 'react-hot-toast';

// Create axios instance
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
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

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Unauthorized - clear token and redirect to login
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    } else if (error.response?.status >= 500) {
      // Server error
      toast.error('Server error. Please try again later.');
    } else if (!error.response) {
      // Network error
      toast.error('Network error. Please check your connection.');
    }
    
    return Promise.reject(error);
  }
);

// API helper functions
export const apiHelpers = {
  // Generic CRUD operations
  get: (url, config = {}) => api.get(url, config),
  post: (url, data, config = {}) => api.post(url, data, config),
  put: (url, data, config = {}) => api.put(url, data, config),
  patch: (url, data, config = {}) => api.patch(url, data, config),
  delete: (url, config = {}) => api.delete(url, config),

  // Auth endpoints
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  logout: () => api.post('/auth/logout'),
  refreshToken: () => api.post('/auth/refresh'),

  // User endpoints
  getProfile: () => api.get('/user/profile'),
  updateProfile: (data) => api.put('/user/profile', data),
  changePassword: (data) => api.patch('/user/password', data),

  // Chama endpoints
  getChamas: (params = {}) => api.get('/chamas', { params }),
  getChama: (id) => api.get(`/chamas/${id}`),
  createChama: (data) => api.post('/chamas', data),
  updateChama: (id, data) => api.put(`/chamas/${id}`, data),
  deleteChama: (id) => api.delete(`/chamas/${id}`),
  joinChama: (id, data) => api.post(`/chamas/${id}/join`, data),
  leaveChama: (id) => api.post(`/chamas/${id}/leave`),

  // Contribution endpoints
  getContributions: (params = {}) => api.get('/contributions', { params }),
  getContribution: (id) => api.get(`/contributions/${id}`),
  createContribution: (data) => api.post('/contributions', data),
  updateContribution: (id, data) => api.put(`/contributions/${id}`, data),
  deleteContribution: (id) => api.delete(`/contributions/${id}`),

  // Loan endpoints
  getLoans: (params = {}) => api.get('/loans', { params }),
  getLoan: (id) => api.get(`/loans/${id}`),
  createLoan: (data) => api.post('/loans', data),
  updateLoan: (id, data) => api.put(`/loans/${id}`, data),
  deleteLoan: (id) => api.delete(`/loans/${id}`),
  approveLoan: (id, data) => api.patch(`/loans/${id}/approve`, data),
  rejectLoan: (id, data) => api.patch(`/loans/${id}/reject`, data),

  // Meeting endpoints
  getMeetings: (params = {}) => api.get('/meetings', { params }),
  getMeeting: (id) => api.get(`/meetings/${id}`),
  createMeeting: (data) => api.post('/meetings', data),
  updateMeeting: (id, data) => api.put(`/meetings/${id}`, data),
  deleteMeeting: (id) => api.delete(`/meetings/${id}`),

  // Report endpoints
  getFinancialReport: (params = {}) => api.get('/reports/financial', { params }),
  getContributionReport: (params = {}) => api.get('/reports/contributions', { params }),
  getLoanReport: (params = {}) => api.get('/reports/loans', { params }),

  // Notification endpoints
  getNotifications: (params = {}) => api.get('/notifications', { params }),
  markNotificationRead: (id) => api.patch(`/notifications/${id}/read`),
  markAllNotificationsRead: () => api.patch('/notifications/read-all'),
  deleteNotification: (id) => api.delete(`/notifications/${id}`),
};

export default api;
