import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminTopbar from '../../components/admin/AdminTopbar';
import api from '../../services/api';

const AdminEvents = () => {
  const [events, setEvents] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [flashMsg, setFlashMsg] = useState({ type: '', text: '' });

  const fetchEvents = async (status = statusFilter) => {
    setLoading(true);
    try {
      const res = await api.get(`/admin/events?status=${status}`);
      if (res.data.success) {
        setEvents(res.data.events || []);
      }
    } catch (err) {
      console.error('Failed to fetch events:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents(statusFilter);
  }, [statusFilter]);

  const handleToggleStatus = async (id) => {
    try {
      const res = await api.patch(`/admin/events/${id}/status`);
      if (res.data.success) {
        setFlashMsg({ type: 'success', text: res.data.message });
        fetchEvents(statusFilter);
      }
    } catch (err) {
      setFlashMsg({ type: 'danger', text: err.response?.data?.message || 'Failed to update status.' });
    }
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Permanently delete event "${title}" and all its attached media?`)) {
      return;
    }
    try {
      const res = await api.delete(`/admin/events/${id}`);
      if (res.data.success) {
        setFlashMsg({ type: 'success', text: res.data.message });
        fetchEvents(statusFilter);
      }
    } catch (err) {
      setFlashMsg({ type: 'danger', text: err.response?.data?.message || 'Failed to delete event.' });
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <>
      <AdminTopbar pageTitle="Manage Events" />

      <div className="admin-content">
        {flashMsg.text && (
          <div className={`alert alert-${flashMsg.type}`} style={{ marginBottom: '20px' }}>
            {flashMsg.text}
          </div>
        )}

        <div className="admin-card">
          <div className="card-header">
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
              <h2>Events & Circulars ({events.length})</h2>
              <div style={{ display: 'flex', gap: '6px', marginLeft: '14px' }}>
                <button
                  type="button"
                  className={`btn-admin btn-admin-sm ${statusFilter === 'all' ? 'btn-admin-primary' : 'btn-admin-outline'}`}
                  style={{ fontSize: '11.5px', padding: '4px 8px' }}
                  onClick={() => setStatusFilter('all')}
                >
                  All
                </button>
                <button
                  type="button"
                  className={`btn-admin btn-admin-sm ${statusFilter === 'published' ? 'btn-admin-primary' : 'btn-admin-outline'}`}
                  style={{ fontSize: '11.5px', padding: '4px 8px' }}
                  onClick={() => setStatusFilter('published')}
                >
                  Published
                </button>
                <button
                  type="button"
                  className={`btn-admin btn-admin-sm ${statusFilter === 'draft' ? 'btn-admin-primary' : 'btn-admin-outline'}`}
                  style={{ fontSize: '11.5px', padding: '4px 8px' }}
                  onClick={() => setStatusFilter('draft')}
                >
                  Drafts
                </button>
              </div>
            </div>
            <Link to="/admin/events/new" className="btn-admin btn-admin-primary">
              + Create New Event
            </Link>
          </div>

          <div className="card-content" style={{ padding: 0 }}>
            {loading ? (
              <div style={{ padding: '32px', textAlign: 'center', color: 'var(--admin-muted)' }}>
                Loading events...
              </div>
            ) : events.length > 0 ? (
              <div className="table-responsive">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th style={{ width: '50px' }}>Media</th>
                      <th>Event Title</th>
                      <th>Event Date</th>
                      <th>Location</th>
                      <th>Status</th>
                      <th>Attached Media</th>
                      <th style={{ textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {events.map((ev) => (
                      <tr key={ev._id}>
                        <td>
                          {ev.coverImagePath ? (
                            <img
                              src={`/${ev.coverImagePath}`}
                              alt=""
                              style={{ width: '42px', height: '32px', objectFit: 'cover', borderRadius: '4px' }}
                            />
                          ) : (
                            <span style={{ fontSize: '18px' }}>🖼️</span>
                          )}
                        </td>
                        <td>
                          <strong style={{ color: 'var(--admin-purple-dark)' }}>{ev.title}</strong>
                        </td>
                        <td>{formatDate(ev.eventDate)}</td>
                        <td>{ev.location || <span style={{ color: 'var(--admin-muted)' }}>None</span>}</td>
                        <td>
                          <button
                            type="button"
                            onClick={() => handleToggleStatus(ev._id)}
                            className={`badge badge-${ev.status === 'published' ? 'success' : 'warning'}`}
                            style={{ cursor: 'pointer', border: 'none' }}
                            title="Click to toggle status"
                          >
                            {ev.status === 'published' ? 'Published ✓' : 'Draft ⏸'}
                          </button>
                        </td>
                        <td>
                          <span className="badge badge-secondary">{ev.media_count || 0} files</span>
                        </td>
                        <td style={{ textAlign: 'right' }}>
                          <div style={{ display: 'inline-flex', gap: '6px' }}>
                            <Link to={`/admin/events/${ev._id}/edit`} className="btn-admin btn-admin-sm btn-admin-outline">
                              Edit
                            </Link>
                            <button
                              type="button"
                              onClick={() => handleDelete(ev._id, ev.title)}
                              className="btn-admin btn-admin-sm btn-admin-danger"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div style={{ padding: '40px 20px', textAlign: 'center', color: 'var(--admin-muted)' }}>
                <p style={{ margin: '0 0 14px' }}>No events found matching this filter.</p>
                <Link to="/admin/events/new" className="btn-admin btn-admin-primary">
                  + Create Your First Event
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminEvents;
