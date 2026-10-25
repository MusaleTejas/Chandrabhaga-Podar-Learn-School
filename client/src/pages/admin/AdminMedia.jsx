import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminTopbar from '../../components/admin/AdminTopbar';
import api from '../../services/api';

const AdminMedia = () => {
  const [mediaList, setMediaList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [flashMsg, setFlashMsg] = useState({ type: '', text: '' });

  const fetchMedia = async () => {
    setLoading(true);
    try {
      const res = await api.get('/admin/media');
      if (res.data.success) {
        setMediaList(res.data.media || []);
      }
    } catch (err) {
      console.error('Failed to load media list:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Permanently delete this media file from the server?')) {
      return;
    }
    try {
      const res = await api.delete(`/admin/media/${id}`);
      if (res.data.success) {
        setFlashMsg({ type: 'success', text: res.data.message });
        setMediaList(mediaList.filter((m) => m._id !== id));
      }
    } catch (err) {
      setFlashMsg({ type: 'danger', text: err.response?.data?.message || 'Failed to delete media.' });
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <>
      <AdminTopbar pageTitle="Manage Uploaded Media" />

      <div className="admin-content">
        {flashMsg.text && (
          <div className={`alert alert-${flashMsg.type}`} style={{ marginBottom: '20px' }}>
            {flashMsg.text}
          </div>
        )}

        <div className="admin-card">
          <div className="card-header">
            <h2>Uploaded Event Media ({mediaList.length})</h2>
            <Link to="/admin/events/new" className="btn-admin btn-admin-primary">
              + Upload with New Event
            </Link>
          </div>

          <div className="card-content">
            {loading ? (
              <div style={{ textAlign: 'center', padding: '40px', color: 'var(--admin-muted)' }}>
                Loading media library...
              </div>
            ) : mediaList.length > 0 ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '18px' }}>
                {mediaList.map((item) => (
                  <div
                    key={item._id}
                    style={{
                      background: '#faf8fb',
                      border: '1px solid var(--admin-line)',
                      borderRadius: 'var(--admin-radius)',
                      overflow: 'hidden',
                      padding: '12px',
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                  >
                    {item.media_type === 'image' ? (
                      <a href={`/${item.file_path}`} target="_blank" rel="noopener noreferrer">
                        <img
                          src={`/${item.file_path}`}
                          alt=""
                          style={{ width: '100%', height: '140px', objectFit: 'cover', borderRadius: '6px' }}
                        />
                      </a>
                    ) : (
                      <div style={{ width: '100%', height: '140px', background: '#000', borderRadius: '6px', display: 'grid', placeItems: 'center', color: '#fff', fontSize: '28px' }}>
                        🎬
                      </div>
                    )}

                    <div style={{ marginTop: '10px', flexGrow: 1 }}>
                      <span className={`badge badge-${item.media_type === 'video' ? 'info' : 'secondary'}`} style={{ marginBottom: '6px' }}>
                        {item.media_type ? item.media_type.toUpperCase() : 'IMAGE'}
                      </span>
                      <strong style={{ display: 'block', fontSize: '13px', color: 'var(--admin-purple-dark)', marginBottom: '4px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {item.event_title || 'Unassigned Event'}
                      </strong>
                      <span style={{ fontSize: '11.5px', color: 'var(--admin-muted)', display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {item.original_filename || item.file_path}
                      </span>
                    </div>

                    <div style={{ marginTop: '12px', paddingTop: '10px', borderTop: '1px solid var(--admin-line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '11px', color: 'var(--admin-muted)' }}>
                        {formatDate(item.created_at)}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleDelete(item._id)}
                        className="btn-admin btn-admin-danger"
                        style={{ fontSize: '11px', padding: '3px 8px' }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ padding: '40px 20px', textAlign: 'center', color: 'var(--admin-muted)' }}>
                <div style={{ fontSize: '36px', marginBottom: '12px' }}>🖼️</div>
                <p style={{ fontSize: '15px', margin: '0 0 14px' }}>No event photos or videos have been uploaded yet.</p>
                <Link to="/admin/events/new" className="btn-admin btn-admin-primary">
                  + Create an Event & Upload Media
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminMedia;
