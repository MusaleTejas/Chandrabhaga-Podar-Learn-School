import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(() => {
    const saved = localStorage.getItem('cpls_admin_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('cpls_admin_token') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyAuth = async () => {
      if (token) {
        try {
          const res = await api.get('/auth/me');
          if (res.data.success) {
            setAdmin(res.data.admin);
            localStorage.setItem('cpls_admin_user', JSON.stringify(res.data.admin));
          }
        } catch (err) {
          console.warn('Session check failed, logging out.');
          logout();
        }
      }
      setLoading(false);
    };

    verifyAuth();
  }, [token]);

  const login = async (username, password) => {
    const res = await api.post('/auth/login', { username, password });
    if (res.data.success) {
      setToken(res.data.token);
      setAdmin(res.data.admin);
      localStorage.setItem('cpls_admin_token', res.data.token);
      localStorage.setItem('cpls_admin_user', JSON.stringify(res.data.admin));
      return res.data;
    }
  };

  const logout = () => {
    setToken(null);
    setAdmin(null);
    localStorage.removeItem('cpls_admin_token');
    localStorage.removeItem('cpls_admin_user');
  };

  return (
    <AuthContext.Provider value={{ admin, token, isAuthenticated: !!token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
