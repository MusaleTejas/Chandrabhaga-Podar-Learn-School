import React, { useState, useEffect } from 'react';
import AdminTopbar from '../../components/admin/AdminTopbar';
import api from '../../services/api';

const AdminEnquiries = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [flashMsg, setFlashMsg] = useState({ type: '', text: '' });

  const fetchEnquiries = async (status = statusFilter) => {
    setLoading(true);
    try {
      const res = await api.get(`/admin/enquiries?status=${status}`);
      if (res.data.success) {
        setEnquiries(res.data.enquiries || []);
      }
    } catch (err) {
      console.error('Failed to load enquiries:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries(statusFilter);
  }, [statusFilter]);

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await api.patch(`/admin/enquiries/${id}`, { status: newStatus });
      if (res.data.success) {
        setFlashMsg({ type: 'success', text: `Enquiry status updated to ${newStatus}.` });
        fetchEnquiries(statusFilter);
      }
    } catch (err) {
      setFlashMsg({ type: 'danger', text: 'Failed to update status.' });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this enquiry record?')) return;
    try {
      const res = await api.delete(`/admin/enquiries/${id}`);
      if (res.data.success) {
        setFlashMsg({ type: 'success', text: 'Enquiry record deleted.' });
        setEnquiries(enquiries.filter((e) => e._id !== id));
      }
    } catch (err) {
      setFlashMsg({ type: 'danger', text: 'Failed to delete enquiry.' });
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      <AdminTopbar pageTitle="Manage Enquiries" />

      <div className="admin-content">
        {flashMsg.text && (
          <div className={`alert alert-${flashMsg.type}`} style={{ marginBottom: '20px' }}>
            {flashMsg.text}
          </div>
        )}

        <div className="admin-card">
          <div className="card-header">
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
              <h2>Inquiries & Messages ({enquiries.length})</h2>
              <div style={{ display: 'flex', gap: '6px', marginLeft: '14px' }}>
                {['all', 'new', 'in_progress', 'resolved'].map((st) => (
                  <button
                    key={st}
                    type="button"
                    className={`btn-admin btn-admin-sm ${statusFilter === st ? 'btn-admin-primary' : 'btn-admin-outline'}`}
                    style={{ fontSize: '11.5px', padding: '4px 8px', textTransform: 'capitalize' }}
                    onClick={() => setStatusFilter(st)}
                  >
                    {st.replace('_', ' ')}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="card-content" style={{ padding: 0 }}>
            {loading ? (
              <div style={{ padding: '32px', textAlign: 'center', color: 'var(--admin-muted)' }}>
                Loading enquiries...
              </div>
            ) : enquiries.length > 0 ? (
              <div className="table-responsive">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Sender / Contact</th>
                      <th>Type</th>
                      <th>Message Content</th>
                      <th>Submitted</th>
                      <th>Status</th>
                      <th style={{ textAlign: 'right' }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {enquiries.map((enq) => (
                      <tr key={enq._id} style={{ background: enq.status === 'new' ? '#fffdf7' : 'inherit' }}>
                        <td>
                          <strong style={{ color: 'var(--admin-purple-dark)' }}>{enq.name}</strong><br />
                          <a href={`mailto:${enq.email}`} style={{ fontSize: '12px', color: 'var(--admin-purple)' }}>{enq.email}</a><br />
                          {enq.phone && (
                            <a href={`tel:${enq.phone}`} style={{ fontSize: '11.5px', color: 'var(--admin-muted)' }}>📞 {enq.phone}</a>
                          )}
                        </td>
                        <td>
                          <span className="badge badge-secondary" style={{ textTransform: 'capitalize' }}>
                            {enq.enquiryType}
                          </span>
                        </td>
                        <td style={{ maxWidth: '320px', whiteSpace: 'pre-line', fontSize: '12.5px', lineHeight: 1.5 }}>
                          {enq.message}
                        </td>
                        <td style={{ fontSize: '11.5px', color: 'var(--admin-muted)' }}>
                          {formatDate(enq.submittedAt)}
                        </td>
                        <td>
                          <select
                            value={enq.status}
                            onChange={(e) => handleStatusChange(enq._id, e.target.value)}
                            style={{
                              fontSize: '11px',
                              padding: '3px 6px',
                              borderRadius: '4px',
                              border: '1px solid var(--admin-line)',
                              fontWeight: 600,
                              background: enq.status === 'new' ? '#ffebee' : enq.status === 'resolved' ? '#e8f5e9' : '#fff3e0'
                            }}
                          >
                            <option value="new">New</option>
                            <option value="read">Read</option>
                            <option value="in_progress">In Progress</option>
                            <option value="resolved">Resolved</option>
                          </select>
                        </td>
                        <td style={{ textAlign: 'right' }}>
                          <button
                            type="button"
                            onClick={() => handleDelete(enq._id)}
                            className="btn-admin btn-admin-sm btn-admin-danger"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div style={{ padding: '40px 20px', textAlign: 'center', color: 'var(--admin-muted)' }}>
                No enquiries found in this category.
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminEnquiries;
