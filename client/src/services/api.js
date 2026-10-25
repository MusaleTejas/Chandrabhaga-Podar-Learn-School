import axios from 'axios';

// Normalize base URL
let rawBaseURL = import.meta.env.VITE_API_URL || '/api';
rawBaseURL = rawBaseURL.trim().replace(/\/+$/, '');

// If user supplied full host like https://app.onrender.com without /api, append /api
let computedBaseURL = rawBaseURL;
if (rawBaseURL.startsWith('http') && !rawBaseURL.endsWith('/api')) {
  computedBaseURL = `${rawBaseURL}/api`;
}

const api = axios.create({
  baseURL: computedBaseURL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor to attach JWT token
api.interceptors.request.use(
  (config) => {
    // If running on a deployed host (not localhost) and VITE_API_URL is missing, warn early
    if (
      typeof window !== 'undefined' &&
      window.location.hostname !== 'localhost' &&
      window.location.hostname !== '127.0.0.1' &&
      !import.meta.env.VITE_API_URL
    ) {
      console.error('[API Error] VITE_API_URL environment variable is not configured on Vercel. Requests are falling back to the static host.');
    }

    const token = localStorage.getItem('cpls_admin_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle session expiration and provide helpful messages
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // 405 Method Not Allowed specifically happens when POSTing to Vercel's static server instead of backend
      if (error.response.status === 405) {
        error.message = 'Vercel is missing the VITE_API_URL environment variable pointing to your Render backend.';
      }

      if (error.response.status === 401) {
        // If unauthorized on a protected route, clear token
        if (typeof window !== 'undefined' && window.location.pathname.startsWith('/admin') && window.location.pathname !== '/admin/login') {
          localStorage.removeItem('cpls_admin_token');
          localStorage.removeItem('cpls_admin_user');
          window.location.href = '/admin/login';
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;
