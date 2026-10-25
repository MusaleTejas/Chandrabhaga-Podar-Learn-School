import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import LightboxModal from '../components/LightboxModal';
import { useLanguage } from '../context/LanguageContext';

const EventDetails = () => {
  const { id } = useParams();
  const { homeLabel, t } = useLanguage();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Lightbox
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxSrc, setLightboxSrc] = useState('');
  const [lightboxAlt, setLightboxAlt] = useState('');

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await api.get(`/events/${id}`);
        if (res.data.success) {
          setEvent(res.data.event);
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load event details.');
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const openLightbox = (src, alt) => {
    setLightboxSrc(src);
    setLightboxAlt(alt);
    setLightboxOpen(true);
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '80px 20px', color: 'var(--muted)' }}>
        Loading event details...
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="container" style={{ padding: '60px 20px', textAlign: 'center' }}>
        <h2>Event Unavailable</h2>
        <p style={{ color: 'var(--muted)', margin: '14px 0 24px' }}>{error || 'The requested event could not be found.'}</p>
        <Link to="/news-events" className="btn btn-purple">
          ← Back to All Events
        </Link>
      </div>
    );
  }

  const photos = (event.media || []).filter((m) => m.mediaType === 'image');
  const videos = (event.media || []).filter((m) => m.mediaType === 'video');

  return (
    <>
      <section className="page-banner">
        <div className="container">
          <span className="eyebrow">
            {formatDate(event.eventDate)}
            {event.location && ` · 📍 ${event.location}`}
            {event.status === 'draft' && (
              <> · <span style={{ background: '#ffc107', color: '#000', padding: '2px 8px', borderRadius: '4px', fontSize: '11px' }}>ADMIN DRAFT PREVIEW</span></>
            )}
          </span>
          <h1 className="page-title">{event.title}</h1>
          <div className="breadcrumbs">
            <Link to="/"><span className="home-text notranslate">{homeLabel}</span></Link> &nbsp; / &nbsp; <Link to="/news-events">{t('News & Events')}</Link> &nbsp; / &nbsp; {event.title}
          </div>
        </div>
      </section>

      <main className="section">
        <div className="container">
          <div style={{ maxWidth: '860px', margin: '0 auto' }}>
            {/* Event Cover Image */}
            {event.coverImagePath && (
              <div style={{ marginBottom: '32px', borderRadius: 'var(--radius)', overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
                <img
                  src={`/${event.coverImagePath}`}
                  alt={event.title}
                  style={{ width: '100%', maxHeight: '440px', objectFit: 'cover', display: 'block' }}
                />
              </div>
            )}

            {/* Event Body Description */}
            <div className="prose" style={{ whiteSpace: 'pre-line', lineHeight: 1.8, fontSize: '16px' }}>
              {event.description}
            </div>

            {/* Attached Event Videos */}
            {videos.length > 0 && (
              <div style={{ marginTop: '48px' }}>
                <h3 style={{ color: 'var(--purple-dark)', borderBottom: '2px solid var(--purple)', paddingBottom: '8px', marginBottom: '20px' }}>
                  🎬 Event Videos ({videos.length})
                </h3>
                <div className="grid grid-2" style={{ gap: '20px' }}>
                  {videos.map((vid) => (
                    <div key={vid._id} style={{ background: '#000', borderRadius: '8px', overflow: 'hidden' }}>
                      <video controls playsInline preload="metadata" style={{ width: '100%', height: '220px', objectFit: 'cover', display: 'block' }}>
                        <source src={`/${vid.filePath}`} type="video/mp4" />
                        Your browser does not support video.
                      </video>
                      {vid.caption && (
                        <div style={{ padding: '8px 12px', background: '#faf8fb', fontSize: '13px', color: 'var(--ink)' }}>
                          {vid.caption}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Attached Event Photos */}
            {photos.length > 0 && (
              <div style={{ marginTop: '48px' }}>
                <h3 style={{ color: 'var(--purple-dark)', borderBottom: '2px solid var(--purple)', paddingBottom: '8px', marginBottom: '20px' }}>
                  📷 Event Photographs ({photos.length})
                </h3>
                <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '16px' }}>
                  {photos.map((photo) => (
                    <div
                      key={photo._id}
                      style={{ height: '170px', borderRadius: '6px', overflow: 'hidden', cursor: 'pointer', background: '#eee' }}
                      onClick={() => openLightbox(`/${photo.filePath}`, photo.caption || event.title)}
                    >
                      <img
                        src={`/${photo.filePath}`}
                        alt={photo.caption || event.title}
                        loading="lazy"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div style={{ marginTop: '48px', paddingTop: '24px', borderTop: '1px solid var(--line)' }}>
              <Link to="/news-events" className="btn btn-purple btn-sm">
                ← Back to All News & Events
              </Link>
            </div>
          </div>
        </div>
      </main>

      <LightboxModal
        isOpen={lightboxOpen}
        imageSrc={lightboxSrc}
        imageAlt={lightboxAlt}
        onClose={() => setLightboxOpen(false)}
      />
    </>
  );
};

export default EventDetails;
