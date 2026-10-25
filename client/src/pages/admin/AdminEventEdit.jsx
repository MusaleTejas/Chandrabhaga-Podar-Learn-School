import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import AdminTopbar from '../../components/admin/AdminTopbar';
import api from '../../services/api';

const AdminEventEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    eventDate: '',
    location: '',
    status: 'draft',
    coverImagePath: ''
  });

  const [attachedMedia, setAttachedMedia] = useState([]);
  const [coverFile, setCoverFile] = useState(null);
  const [photoFiles, setPhotoFiles] = useState([]);
  const [videoFiles, setVideoFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchEvent = async () => {
    try {
      const res = await api.get(`/events/${id}`);
      if (res.data.success) {
        const ev = res.data.event;
        setFormData({
          title: ev.title || '',
          description: ev.description || '',
          eventDate: ev.eventDate ? ev.eventDate.split('T')[0] : '',
          location: ev.location || '',
          status: ev.status || 'draft',
          coverImagePath: ev.coverImagePath || ''
        });
        setAttachedMedia(ev.media || []);
      }
    } catch (err) {
      setError('Failed to load event details.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvent();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDeleteMedia = async (mediaId) => {
    if (!window.confirm('Delete this media file?')) return;
    try {
      const res = await api.delete(`/admin/media/${mediaId}`);
      if (res.data.success) {
        setAttachedMedia(attachedMedia.filter((m) => m._id !== mediaId));
        setSuccess('Media item deleted.');
      }
    } catch (err) {
      setError('Failed to delete media item.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.title.trim() || !formData.description.trim() || !formData.eventDate) {
      setError('Title, description, and date are required.');
      return;
    }

    try {
      setSubmitting(true);
      const data = new FormData();
      data.append('title', formData.title);
      data.append('description', formData.description);
      data.append('eventDate', formData.eventDate);
      data.append('location', formData.location);
      data.append('status', formData.status);

      if (coverFile) {
        data.append('coverImage', coverFile);
      }
      for (let i = 0; i < photoFiles.length; i++) {
        data.append('photos', photoFiles[i]);
      }
      for (let i = 0; i < videoFiles.length; i++) {
        data.append('videos', videoFiles[i]);
      }

      const res = await api.put(`/admin/events/${id}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (res.data.success) {
        setSuccess('Event updated successfully.');
        setPhotoFiles([]);
        setVideoFiles([]);
        setCoverFile(null);
        fetchEvent();
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update event.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <>
        <AdminTopbar pageTitle="Edit Event" />
        <div className="admin-content" style={{ textAlign: 'center', padding: '60px', color: 'var(--admin-muted)' }}>
          Loading event data...
        </div>
      </>
    );
  }

  return (
    <>
      <AdminTopbar pageTitle="Edit Event" />

      <div className="admin-content">
        <div className="admin-card" style={{ maxWidth: '820px' }}>
          <div className="card-header">
            <h2>Edit School Event / Circular</h2>
            <Link to="/admin/events" className="btn-admin btn-admin-outline btn-admin-sm">
              ← Back to Events
            </Link>
          </div>

          <div className="card-content">
            {error && (
              <div className="alert alert-danger" style={{ marginBottom: '20px' }}>
                ⚠ {error}
              </div>
            )}
            {success && (
              <div className="alert alert-success" style={{ marginBottom: '20px' }}>
                ✓ {success}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Event Title *</label>
                <input
                  type="text"
                  name="title"
                  className="form-control"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label">Event Date *</label>
                  <input
                    type="date"
                    name="eventDate"
                    className="form-control"
                    value={formData.eventDate}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Location / Venue</label>
                  <input
                    type="text"
                    name="location"
                    className="form-control"
                    value={formData.location}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Publication Status</label>
                <select
                  name="status"
                  className="form-control"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="draft">Draft (Private)</option>
                  <option value="published">Published (Public)</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Full Event Description *</label>
                <textarea
                  name="description"
                  className="form-control"
                  rows="6"
                  value={formData.description}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              {/* Cover Image */}
              <div className="form-group" style={{ padding: '16px', background: '#faf8fb', borderRadius: 'var(--admin-radius)' }}>
                <label className="form-label">Featured Cover Image</label>
                {formData.coverImagePath && (
                  <div style={{ marginBottom: '10px' }}>
                    <img
                      src={`/${formData.coverImagePath}`}
                      alt="Current cover"
                      style={{ maxHeight: '140px', borderRadius: '4px', objectFit: 'cover' }}
                    />
                  </div>
                )}
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  className="form-control"
                  onChange={(e) => setCoverFile(e.target.files[0])}
                />
                <small style={{ color: 'var(--admin-muted)', display: 'block', marginTop: '4px' }}>
                  Select a new file only if you wish to replace the current cover photo.
                </small>
              </div>

              {/* Attached Media List */}
              {attachedMedia.length > 0 && (
                <div style={{ margin: '24px 0', padding: '16px', border: '1px solid var(--admin-line)', borderRadius: 'var(--admin-radius)' }}>
                  <h4 style={{ margin: '0 0 14px', color: 'var(--admin-purple-dark)' }}>
                    Currently Attached Media ({attachedMedia.length})
                  </h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '12px' }}>
                    {attachedMedia.map((m) => (
                      <div key={m._id} style={{ border: '1px solid var(--admin-line)', borderRadius: '4px', padding: '6px', textAlign: 'center', background: '#fff' }}>
                        {m.mediaType === 'image' ? (
                          <img
                            src={`/${m.filePath}`}
                            alt=""
                            style={{ width: '100%', height: '80px', objectFit: 'cover', borderRadius: '4px' }}
                          />
                        ) : (
                          <div style={{ width: '100%', height: '80px', background: '#000', color: '#fff', display: 'grid', placeItems: 'center', borderRadius: '4px' }}>
                            🎬
                          </div>
                        )}
                        <span style={{ fontSize: '11px', display: 'block', margin: '4px 0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {m.originalFilename || m.mediaType}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleDeleteMedia(m._id)}
                          className="btn-admin btn-admin-danger"
                          style={{ fontSize: '10px', padding: '2px 6px', width: '100%' }}
                        >
                          Delete
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Upload Additional Media */}
              <div style={{ padding: '18px', background: '#faf8fb', borderRadius: 'var(--admin-radius)', border: '1px solid var(--admin-line)', marginBottom: '24px' }}>
                <h4 style={{ margin: '0 0 12px', color: 'var(--admin-purple-dark)' }}>
                  Upload Additional Media
                </h4>
                <div className="form-group">
                  <label className="form-label">Add More Photographs</label>
                  <input
                    type="file"
                    multiple
                    accept="image/jpeg,image/png,image/webp,image/gif"
                    className="form-control"
                    onChange={(e) => setPhotoFiles(Array.from(e.target.files))}
                  />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Add More Videos</label>
                  <input
                    type="file"
                    multiple
                    accept="video/mp4,video/webm,video/quicktime"
                    className="form-control"
                    onChange={(e) => setVideoFiles(Array.from(e.target.files))}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  type="submit"
                  className="btn-admin btn-admin-primary"
                  disabled={submitting}
                  style={{ cursor: submitting ? 'not-allowed' : 'pointer', padding: '10px 20px', fontSize: '14px' }}
                >
                  {submitting ? 'Saving Changes...' : 'Update Event →'}
                </button>
                <Link to="/admin/events" className="btn-admin btn-admin-outline" style={{ padding: '10px 20px', fontSize: '14px' }}>
                  Back to List
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminEventEdit;
