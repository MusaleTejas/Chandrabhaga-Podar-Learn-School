import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { SCHOOL_DETAILS } from '../utils/constants';
import { useLanguage } from '../context/LanguageContext';

const Home = () => {
  const { t } = useLanguage();
  const [events, setEvents] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(true);

  useEffect(() => {
    const fetchLatestEvents = async () => {
      try {
        const res = await api.get('/events?limit=3&status=published');
        if (res.data.success) {
          setEvents(res.data.events || []);
        }
      } catch (err) {
        console.warn('Failed to load latest events:', err.message);
      } finally {
        setLoadingEvents(false);
      }
    };

    fetchLatestEvents();
  }, []);

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <>
      {/* Hero Section with Authentic Background Video */}
      <section className="hero" aria-label="Hero Introduction">
        <div className="hero-video-wrapper">
          <video className="hero-video" autoPlay muted loop playsInline poster="/assets/images/outdoor/outdoor-1.png">
            <source src="/assets/videos/header-video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="container">
          <div className="hero-inner">
            <span className="eyebrow">
              {t('Hero Eyebrow', `CBSE Affiliation No. ${SCHOOL_DETAILS.cbseAffiliationNo} · School Code: ${SCHOOL_DETAILS.schoolCode}`)}
            </span>
            <h1>{t('Welcome to')} {SCHOOL_DETAILS.shortName}</h1>
            <p>
              {t('Hero Description')}
            </p>
            <div className="hero-actions">
              <Link className="btn" to="/admission-process">
                {t('Admissions Open 2025-26')}
              </Link>
              <a
                className="btn btn-outline"
                href={SCHOOL_DETAILS.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                style={{ background: 'rgba(37, 211, 102, 0.2)', borderColor: '#25d366', color: '#ffffff' }}
              >
                <span>💬</span> {t('WhatsApp Enquiry')}
              </a>
              <Link className="btn btn-outline" to="/about-us">
                {t('Visit Our Campus')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Key Highlights of Our School */}
      <section className="section" aria-label="School Highlights">
        <div className="container">
          <div className="section-head center">
            <span className="kicker">{t('Why Parents Trust Us')}</span>
            <h2>{t('What Makes School Life Special Here')}</h2>
            <p>
              {t('Education is more than just textbooks')}
            </p>
          </div>
          <div className="grid highlights">
            <article className="card">
              <img src="/assets/images/classroom/classroom-1.png" alt="Classroom interactive teaching" loading="lazy" />
              <div className="card-body">
                <h3>{t('Caring & Interactive Teaching')}</h3>
                <p>
                  {t('Caring Teaching Desc')}
                </p>
              </div>
            </article>
            <article className="card">
              <img src="/assets/images/activity/activity-11.png" alt="Students in computer lab" loading="lazy" />
              <div className="card-body">
                <h3>{t('Practical Computer Lab')}</h3>
                <p>
                  {t('Computer Lab Desc')}
                </p>
              </div>
            </article>
            <article className="card">
              <img src="/assets/images/sports/sports-1.png" alt="Students participating in sports" loading="lazy" />
              <div className="card-body">
                <h3>{t('Spacious Sports Grounds')}</h3>
                <p>
                  {t('Sports Grounds Desc')}
                </p>
              </div>
            </article>
            <article className="card">
              <img src="/assets/images/outdoor/outdoor-1.png" alt="Aashadhi Ekadashi cultural ceremony" loading="lazy" />
              <div className="card-body">
                <h3>{t('Values & Cultural Heritage')}</h3>
                <p>
                  {t('Values Desc')}
                </p>
              </div>
            </article>
            <article className="card">
              <img src="/assets/images/music/music-1.png" alt="Music and extracurricular activities" loading="lazy" />
              <div className="card-body">
                <h3>{t('Music, Speech & Arts')}</h3>
                <p>
                  {t('Music Arts Desc')}
                </p>
              </div>
            </article>
            <article className="card">
              <img src="/assets/images/activity/activity-1.png" alt="Morning assembly on campus" loading="lazy" />
              <div className="card-body">
                <h3>{t('Safe & Disciplined Campus')}</h3>
                <p>
                  {t('Safe Campus Desc')}
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Verified Institutional Facts */}
      <section className="stats" aria-label="Institutional Facts">
        <div className="container stats-grid">
          <div className="stat">
            <strong className="stat-number">{t('2023')}</strong>
            <span className="stat-label">{t('Year Established')}</span>
          </div>
          <div className="stat">
            <strong className="stat-number">{SCHOOL_DETAILS.cbseAffiliationNo}</strong>
            <span className="stat-label">{t('CBSE Affiliation No.')}</span>
          </div>
          <div className="stat">
            <strong className="stat-number">{SCHOOL_DETAILS.schoolCode}</strong>
            <span className="stat-label">{t('Official School Code')}</span>
          </div>
          <div className="stat">
            <strong className="stat-number">{t('10+ Yrs')}</strong>
            <span className="stat-label">{t('Leadership & Experience')}</span>
          </div>
        </div>
      </section>

      {/* Latest Published Events from Database */}
      <section className="section">
        <div className="container">
          <div className="section-head between">
            <div>
              <span className="kicker">{t('Notice Board')}</span>
              <h2>{t('Latest School News & Activities')}</h2>
            </div>
            <Link to="/news-events" className="btn btn-purple btn-sm">
              {t('View All Notices')}
            </Link>
          </div>

          {events.length > 0 ? (
            <div className="grid events-grid">
              {events.map((ev) => (
                <article key={ev._id} className="card event-card">
                  <div className="card-media">
                    <img
                      src={ev.coverImagePath ? `/${ev.coverImagePath}` : '/assets/images/activity/activity-2.png'}
                      alt={ev.title}
                      loading="lazy"
                    />
                    <span className="card-date">{formatDate(ev.eventDate)}</span>
                  </div>
                  <div className="event-card-body">
                    <h3>{ev.title}</h3>
                    {ev.location && <span className="event-location">📍 {ev.location}</span>}
                    <p>{ev.description ? ev.description.substring(0, 140) + '...' : ''}</p>
                    <div style={{ marginTop: 'auto', paddingTop: '16px' }}>
                      <Link to={`/events/${ev._id}`} className="btn btn-purple btn-sm" style={{ width: '100%' }}>
                        {t('Read Details')}
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div style={{ background: '#faf8fb', border: '1px solid var(--line)', borderRadius: 'var(--radius)', padding: '36px 20px', textAlign: 'center' }}>
              <p style={{ margin: 0, color: 'var(--muted)' }}>
                {loadingEvents ? 'Loading upcoming school events...' : t('No published news or notices at this moment.')}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Admission Call to Action */}
      <section className="section cta-section" style={{ background: 'linear-gradient(135deg, var(--purple-dark), var(--purple))', color: '#ffffff', textAlign: 'center' }}>
        <div className="container">
          <span className="kicker" style={{ color: 'var(--gold)' }}>{t('Step into Quality Learning')}</span>
          <h2 style={{ color: '#ffffff', margin: '8px 0 16px' }}>{t('Admissions Open 2025-26')}</h2>
          <p style={{ maxWidth: '640px', margin: '0 auto 28px', color: 'rgba(255,255,255,0.9)', fontSize: '16px' }}>
            {t('CTA Subtext')}
          </p>
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/admission-process" className="btn btn-gold">
              {t('Start Online Admission Process')}
            </Link>
            <a
              href={SCHOOL_DETAILS.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
              style={{ color: '#ffffff', borderColor: '#ffffff' }}
            >
              💬 WhatsApp: {SCHOOL_DETAILS.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
