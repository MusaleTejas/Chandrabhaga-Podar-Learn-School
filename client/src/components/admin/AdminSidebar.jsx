import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';

const AdminSidebar = () => {
  const { admin, logout } = useAuth();
  const location = useLocation();
  const currentPath = location.pathname;

  const [newCount, setNewCount] = useState(0);

  useEffect(() => {
    const fetchBadge = async () => {
      try {
        const res = await api.get('/admin/new-enquiries-count');
        if (res.data.success) {
          setNewCount(res.data.count);
        }
      } catch (err) {
        // silent fail
      }
    };

    fetchBadge();
    const interval = setInterval(fetchBadge, 20000);
    return () => clearInterval(interval);
  }, []);

  return (
    <aside className="admin-sidebar">
      <div className="sidebar-header">
        <Link to="/admin" className="sidebar-brand">
          <img src="/assets/images/logo.svg" alt="Logo" />
          <div>
            <strong>CPLS ADMIN</strong>
            <span>Dindrud Campus</span>
          </div>
        </Link>
      </div>

      <nav className="sidebar-nav">
        <Link to="/admin" className={currentPath === '/admin' ? 'active' : ''}>
          <span>📊</span> Dashboard
        </Link>
        <Link to="/admin/events" className={currentPath === '/admin/events' ? 'active' : ''}>
          <span>📅</span> Manage Events
        </Link>
        <Link to="/admin/events/new" className={currentPath === '/admin/events/new' ? 'active' : ''}>
          <span>➕</span> Add New Event
        </Link>
        <Link to="/admin/media" className={currentPath === '/admin/media' ? 'active' : ''}>
          <span>🖼️</span> Media Gallery
        </Link>
        <Link to="/admin/enquiries" className={currentPath === '/admin/enquiries' ? 'active' : ''}>
          <span>✉️</span> Enquiries
          {newCount > 0 && <span className="nav-badge">{newCount}</span>}
        </Link>
        <Link to="/admin/change-password" className={currentPath === '/admin/change-password' ? 'active' : ''}>
          <span>🔑</span> Change Password
        </Link>
        <Link to="/" target="_blank" rel="noopener">
          <span>🌐</span> View Public Site ↗
        </Link>
      </nav>

      <div className="sidebar-footer">
        <span>
          Logged in: <strong>{admin ? admin.username : 'Admin'}</strong>
        </span>
        <button
          type="button"
          onClick={logout}
          style={{ background: 'none', border: 'none', color: '#ff9999', fontWeight: 700, cursor: 'pointer', padding: 0 }}
        >
          Logout
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
