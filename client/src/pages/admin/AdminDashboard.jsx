import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminTopbar from '../../components/admin/AdminTopbar';
import api from '../../services/api';

const AdminDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get('/admin/dashboard-stats');
        if (res.data.success) {
          setData(res.data);
        }
      } catch (err) {
        console.error('Failed to load dashboard statistics:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const stats = data?.stats || {
    total_events: 0,
    published_events: 0,
    draft_events: 0,
    total_media: 0,
    total_enquiries: 0,
    new_enquiries: 0
  };

  return (
    <>
      <AdminTopbar pageTitle="Dashboard" />

      <div className="admin-content">
        {/* Statistics Overview Cards */}
        <div className="stats-row">
          <div className="stat-card">
            <div className="stat-icon">📅</div>
            <div className="stat-info">
              <span>Total Events</span>
              <strong>{stats.total_events}</strong>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon" style={{ color: '#198754', background: '#e8f5e9' }}>✅</div>
            <div className="stat-info">
              <span>Published Events</span>
              <strong>{stats.published_events}</strong>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon" style={{ color: '#ff9800', background: '#fff3e0' }}>📝</div>
            <div className="stat-info">
              <span>Draft Events</span>
              <strong>{stats.draft_events}</strong>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon" style={{ color: '#0288d1', background: '#e1f5fe' }}>🖼️</div>
            <div className="stat-info">
              <span>Event Media Uploads</span>
              <strong>{stats.total_media}</strong>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon" style={{ color: '#7b1fa2', background: '#f3e5f5' }}>✉️</div>
            <div className="stat-info">
              <span>Total Enquiries</span>
              <strong>{stats.total_enquiries} ({stats.new_enquiries} New)</strong>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '24px', alignItems: 'flex-start' }}>
          {/* Recent Events */}
          <div className="admin-card">
            <div className="card-header">
              <h2>Recent Events & Notices</h2>
              <Link to="/admin/events/new" className="btn-admin btn-admin-primary">
                + New Event
              </Link>
            </div>
            <div className="card-content" style={{ padding: 0 }}>
              {data?.recentEvents && data.recentEvents.length > 0 ? (
                <div className="table-responsive">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Title</th>
                        <th>Event Date</th>
                        <th>Status</th>
                        <th style={{ textAlign: 'right' }}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.recentEvents.map((ev) => (
                        <tr key={ev._id}>
                          <td>
                            <strong>{ev.title}</strong>
                          </td>
                          <td>{formatDate(ev.eventDate)}</td>
                          <td>
                            <span className={`badge badge-${ev.status === 'published' ? 'success' : 'warning'}`}>
                              {ev.status === 'published' ? 'Published' : 'Draft'}
                            </span>
                          </td>
                          <td style={{ textAlign: 'right' }}>
                            <Link to={`/admin/events/${ev._id}/edit`} className="btn-admin btn-admin-sm btn-admin-outline">
                              Edit
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div style={{ padding: '32px', textAlign: 'center', color: 'var(--admin-muted)' }}>
                  No events created yet.
                </div>
              )}
            </div>
          </div>

          {/* Recent Enquiries */}
          <div className="admin-card">
            <div className="card-header">
              <h2>Recent Enquiries</h2>
              <Link to="/admin/enquiries" className="btn-admin btn-admin-outline btn-admin-sm">
                View All
              </Link>
            </div>
            <div className="card-content" style={{ padding: 0 }}>
              {data?.recentEnquiries && data.recentEnquiries.length > 0 ? (
                <div className="table-responsive">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Sender</th>
                        <th>Type</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.recentEnquiries.map((enq) => (
                        <tr key={enq._id}>
                          <td>
                            <strong>{enq.name}</strong>
                            <span style={{ display: 'block', fontSize: '11.5px', color: 'var(--admin-muted)' }}>
                              {enq.email}
                            </span>
                          </td>
                          <td>
                            <span className="badge badge-secondary" style={{ textTransform: 'capitalize' }}>
                              {enq.enquiryType}
                            </span>
                          </td>
                          <td>
                            <span className={`badge badge-${enq.status === 'new' ? 'danger' : enq.status === 'resolved' ? 'success' : 'info'}`}>
                              {enq.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div style={{ padding: '32px', textAlign: 'center', color: 'var(--admin-muted)' }}>
                  No enquiries received yet.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
