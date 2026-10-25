import React, { useState } from 'react';
import AdminTopbar from '../../components/admin/AdminTopbar';
import api from '../../services/api';

const AdminChangePassword = () => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.currentPassword || !formData.newPassword || !formData.confirmPassword) {
      setError('All password fields are required.');
      return;
    }
    if (formData.newPassword !== formData.confirmPassword) {
      setError('New password and confirmation password do not match.');
      return;
    }
    if (formData.newPassword.length < 8) {
      setError('New password must be at least 8 characters long.');
      return;
    }

    try {
      setSubmitting(true);
      const res = await api.post('/auth/change-password', formData);
      if (res.data.success) {
        setSuccess('Your password has been changed successfully.');
        setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to change password.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <AdminTopbar pageTitle="Change Password" />

      <div className="admin-content">
        <div className="admin-card" style={{ maxWidth: '560px' }}>
          <div className="card-header">
            <h2>Change Administrator Password</h2>
          </div>

          <div className="card-content">
            {error && (
              <div className="alert alert-danger" style={{ marginBottom: '18px' }}>
                ⚠ {error}
              </div>
            )}
            {success && (
              <div className="alert alert-success" style={{ marginBottom: '18px' }}>
                ✓ {success}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Current Password *</label>
                <input
                  type="password"
                  name="currentPassword"
                  className="form-control"
                  value={formData.currentPassword}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">New Password * (Minimum 8 characters)</label>
                <input
                  type="password"
                  name="newPassword"
                  className="form-control"
                  value={formData.newPassword}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Confirm New Password *</label>
                <input
                  type="password"
                  name="confirmPassword"
                  className="form-control"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn-admin btn-admin-primary"
                disabled={submitting}
                style={{ padding: '10px 20px', fontSize: '14px', cursor: submitting ? 'not-allowed' : 'pointer' }}
              >
                {submitting ? 'Updating Password...' : 'Update Password →'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminChangePassword;
