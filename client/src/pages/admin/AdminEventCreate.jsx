import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AdminTopbar from '../../components/admin/AdminTopbar';
import api from '../../services/api';

const AdminEventCreate = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    eventDate: new Date().toISOString().split('T')[0],
    location: '',
    status: 'draft'
  });

  const [coverFile, setCoverFile] = useState(null);
  const [photoFiles, setPhotoFiles] = useState([]);
  const [videoFiles, setVideoFiles] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.title.trim()) {
      setError('Event title is required.');
      return;
    }
    if (!formData.description.trim()) {
      setError('Event description is required.');
      return;
    }
    if (!formData.eventDate) {
      setError('Valid event date is required.');
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

      const res = await api.post('/admin/events', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (res.data.success) {
        navigate('/admin/events');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create event.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <AdminTopbar pageTitle="Create New Event" />

      <div className="admin-content">
        <div className="admin-card" style={{ maxWidth: '820px' }}>
          <div className="card-header">
            <h2>Create New School Event / Circular</h2>
            <Link to="/admin/events" className="btn-admin btn-admin-outline btn-admin-sm">
              ← Cancel & Back
            </Link>
          </div>

          <div className="card-content">
            {error && (
              <div className="alert alert-danger" style={{ marginBottom: '20px' }}>
                ⚠ {error}
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
                  placeholder="e.g. Annual Sports Meet 2026 / Science Exhibition"
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
                    placeholder="e.g. Main Sports Ground, Dindrud"
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
                  <option value="draft">Draft (Private, not visible to visitors)</option>
                  <option value="published">Published (Visible immediately on public website)</option>
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
                  placeholder="Provide comprehensive details about the circular, event schedule, participants, and instructions..."
                  required
                ></textarea>
              </div>

              <div style={{ padding: '18px', background: '#faf8fb', borderRadius: 'var(--admin-radius)', border: '1px solid var(--admin-line)', marginBottom: '24px' }}>
                <h3 style={{ fontSize: '15px', color: 'var(--admin-purple-dark)', marginTop: 0, marginBottom: '14px' }}>
                  Media Uploads
                </h3>

                <div className="form-group">
                  <label className="form-label">Cover Photograph (Featured Banner)</label>
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/gif"
                    className="form-control"
                    onChange={(e) => setCoverFile(e.target.files[0])}
                  />
                  <small style={{ color: 'var(--admin-muted)', display: 'block', marginTop: '4px' }}>
                    Recommended size: 1200x630px. Max size 10MB.
                  </small>
                </div>

                <div className="form-group">
                  <label className="form-label">Additional Event Photos (Multiple)</label>
                  <input
                    type="file"
                    multiple
                    accept="image/jpeg,image/png,image/webp,image/gif"
                    className="form-control"
                    onChange={(e) => setPhotoFiles(Array.from(e.target.files))}
                  />
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Event Videos (MP4 / WebM)</label>
                  <input
                    type="file"
                    multiple
                    accept="video/mp4,video/webm,video/quicktime"
                    className="form-control"
                    onChange={(e) => setVideoFiles(Array.from(e.target.files))}
                  />
                  <small style={{ color: 'var(--admin-muted)', display: 'block', marginTop: '4px' }}>
                    Max video size 60MB per file.
                  </small>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  type="submit"
                  className="btn-admin btn-admin-primary"
                  disabled={submitting}
                  style={{ cursor: submitting ? 'not-allowed' : 'pointer', padding: '10px 20px', fontSize: '14px' }}
                >
                  {submitting ? 'Uploading & Creating...' : 'Save & Create Event →'}
                </button>
                <Link to="/admin/events" className="btn-admin btn-admin-outline" style={{ padding: '10px 20px', fontSize: '14px' }}>
                  Cancel
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminEventCreate;
