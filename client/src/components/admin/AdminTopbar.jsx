import React from 'react';
import { useAuth } from '../../context/AuthContext';

const AdminTopbar = ({ pageTitle }) => {
  const { admin } = useAuth();

  return (
    <header className="admin-topbar">
      <div className="topbar-left">
        <strong style={{ fontSize: '16px', color: 'var(--admin-purple-dark)' }}>
          {pageTitle || 'Administrator Panel'}
        </strong>
      </div>
      <div className="topbar-right">
        <div className="user-pill">
          <span>👤 {admin ? admin.username : 'Admin'}</span>
        </div>
      </div>
    </header>
  );
};

export default AdminTopbar;
