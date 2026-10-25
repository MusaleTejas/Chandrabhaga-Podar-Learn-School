import React, { useState } from 'react';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { SCHOOL_DETAILS } from '../../utils/constants';

const AdminLogin = () => {
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!username.trim() || !password) {
      setError('Please enter both username and password.');
      return;
    }

    try {
      setSubmitting(true);
      await login(username.trim(), password);
      navigate('/admin');
    } catch (err) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else if (err.message && err.message.toLowerCase().includes('network')) {
        setError('Network Error: Unable to reach backend server. Please verify the backend is running.');
      } else {
        setError(err.message || 'Invalid credentials provided or account inactive.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #200b2b, #4a154b)', display: 'grid', placeItems: 'center', padding: '24px' }}>
      <div style={{ background: '#ffffff', borderRadius: '14px', maxWidth: '440px', width: '100%', padding: '36px 32px', boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}>
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <img src="/assets/images/logo.svg" alt="CPLS Crest" width="68" height="68" style={{ marginBottom: '12px' }} />
          <h2 style={{ margin: '0 0 6px', color: 'var(--purple-dark)', fontSize: '22px' }}>
            CPLS Administrator Portal
          </h2>
          <span style={{ fontSize: '13px', color: 'var(--muted)' }}>
            Authorized School Management · Dindrud Campus
          </span>
        </div>

        {error && (
          <div style={{ background: '#ffebee', border: '1px solid #ffcdd2', color: '#c62828', padding: '12px 14px', borderRadius: '6px', fontSize: '13.5px', marginBottom: '20px', fontWeight: 600 }}>
            ⚠ {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '6px', color: 'var(--ink)' }}>
              Username or Registered Email
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g. cpls_admin"
              required
              autoFocus
              style={{ width: '100%', padding: '11px 14px', borderRadius: '6px', border: '1px solid var(--line)', fontSize: '14px' }}
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <label style={{ fontSize: '13px', fontWeight: 700, color: 'var(--ink)' }}>
                Administrator Password
              </label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{ background: 'none', border: 'none', color: 'var(--purple)', fontSize: '12px', fontWeight: 600, cursor: 'pointer', padding: 0 }}
              >
                {showPassword ? 'Hide Password' : 'Show Password'}
              </button>
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              required
              style={{ width: '100%', padding: '11px 14px', borderRadius: '6px', border: '1px solid var(--line)', fontSize: '14px' }}
            />
          </div>

          <button
            type="submit"
            className="btn btn-purple"
            disabled={submitting}
            style={{ width: '100%', padding: '12px', fontSize: '15px', fontWeight: 700, cursor: submitting ? 'not-allowed' : 'pointer' }}
          >
            {submitting ? 'Authenticating...' : 'Sign In to Administration →'}
          </button>
        </form>

        <div style={{ marginTop: '24px', paddingTop: '18px', borderTop: '1px solid var(--line)', textAlign: 'center' }}>
          <Link to="/" style={{ color: 'var(--purple)', fontSize: '13px', fontWeight: 600 }}>
            ← Return to Public School Website
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
