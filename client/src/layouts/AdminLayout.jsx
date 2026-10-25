import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AdminSidebar from '../components/admin/AdminSidebar';

const AdminLayout = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ display: 'grid', placeItems: 'center', height: '100vh', background: '#f5f0f7' }}>
        <div style={{ textAlign: 'center', color: '#4a154b', fontWeight: 700 }}>
          <div style={{ fontSize: '32px', marginBottom: '10px' }}>⏳</div>
          Loading CPLS Administration Portal...
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-main">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
