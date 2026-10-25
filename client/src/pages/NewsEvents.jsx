import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import api from '../services/api';
import { useLanguage } from '../context/LanguageContext';

const NewsEvents = () => {
  const { homeLabel, t } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const pageParam = parseInt(searchParams.get('p') || '1', 10);

  const [events, setEvents] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalEvents, setTotalEvents] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/events?page=${pageParam}&limit=6&status=published`);
        if (res.data.success) {
          setEvents(res.data.events || []);
          setTotalPages(res.data.totalPages || 1);
          setTotalEvents(res.data.total || 0);
        }
      } catch (err) {
        console.warn('Failed to load news & events:', err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [pageParam]);

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const handlePageChange = (newPage) => {
    setSearchParams({ p: newPage.toString() });
    window.scrollTo(0, 300);
  };

  return (
    <>
      <section className="page-banner">
        <div className="container">
          <span className="eyebrow">{t('Notice Board')}</span>
          <h1 className="page-title">{t('News & Events')}</h1>
          <div className="breadcrumbs">
            <Link to="/"><span className="home-text notranslate">{homeLabel}</span></Link> &nbsp; / &nbsp; {t('News & Events')}
          </div>
        </div>
      </section>

      <main className="section">
        <div className="container">
          <div className="section-head center">
            <span className="kicker">Live Updates</span>
            <h2>School Happenings & Circulars</h2>
            <p>
              Stay connected with current academic announcements, competitions, celebrations, and notices from our administration.
            </p>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px', color: 'var(--muted)' }}>
              Loading announcements...
            </div>
          ) : events.length > 0 ? (
            <>
              <div className="grid events-grid">
                {events.map((event) => {
                  const coverSrc = event.coverImagePath
                    ? `/${event.coverImagePath}`
                    : '/assets/images/activity/activity-2.png';

                  return (
                    <article key={event._id} className="card event-card">
                      <div className="card-media">
                        <img src={coverSrc} alt={event.title} loading="lazy" />
                        <span className="card-date">{formatDate(event.eventDate)}</span>
                      </div>
                      <div className="event-card-body">
                        <h3>{event.title}</h3>
                        {event.location && <span className="event-location">📍 {event.location}</span>}
                        <p>{event.description ? event.description.substring(0, 140) + '...' : ''}</p>

                        {event.mediaCount > 0 && (
                          <span style={{ fontSize: '12px', color: 'var(--purple)', fontWeight: 700, marginTop: '8px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                            📷 {event.mediaCount} media item(s) attached
                          </span>
                        )}

                        <div style={{ marginTop: 'auto', paddingTop: '16px' }}>
                          <Link to={`/events/${event._id}`} className="btn btn-purple btn-sm" style={{ width: '100%' }}>
                            Read Full Event & Media →
                          </Link>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginTop: '36px' }}>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                    <button
                      key={num}
                      type="button"
                      className={`btn btn-sm ${pageParam === num ? 'btn-purple' : 'btn-outline-dark'}`}
                      style={{ minWidth: '40px' }}
                      onClick={() => handlePageChange(num)}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div style={{ textAlign: 'center', padding: '40px', background: '#faf8fb', borderRadius: 'var(--radius)', border: '1px solid var(--line)' }}>
              <p style={{ margin: 0, color: 'var(--muted)' }}>No notices or events published at this time.</p>
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default NewsEvents;
