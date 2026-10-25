import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { useLanguage } from '../context/LanguageContext';

const VideoGallery = () => {
  const { homeLabel, t } = useLanguage();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await api.get('/gallery/videos');
        if (res.data.success) {
          setVideos(res.data.videos || []);
        }
      } catch (err) {
        console.warn('Failed to load gallery videos:', err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  return (
    <>
      <section className="page-banner">
        <div className="container">
          <span className="eyebrow">Video Showcase</span>
          <h1 className="page-title">{t('Video Gallery')}</h1>
          <div className="breadcrumbs">
            <Link to="/"><span className="home-text notranslate">{homeLabel}</span></Link> &nbsp; / &nbsp; {t('Video Gallery')}
          </div>
        </div>
      </section>

      <main className="section">
        <div className="container">
          <div className="section-head center">
            <span className="kicker">Campus Action</span>
            <h2>Watch Chandrabhaga School in Motion</h2>
            <p>
              Experience our lively athletics meets, extracurricular yoga and music training, cricket pitches, and daily school activities.
            </p>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px', color: 'var(--muted)' }}>
              Loading video gallery...
            </div>
          ) : videos.length > 0 ? (
            <div className="grid grid-2" style={{ gap: '28px' }}>
              {videos.map((vid, idx) => {
                const videoSrc = vid.path.startsWith('http') || vid.path.startsWith('/')
                  ? vid.path
                  : `/${vid.path}`;
                const posterSrc = vid.poster.startsWith('http') || vid.poster.startsWith('/')
                  ? vid.poster
                  : `/${vid.poster}`;

                return (
                  <article key={idx} className="card" style={{ overflow: 'hidden' }}>
                    <div style={{ background: '#000', position: 'relative' }}>
                      <video
                        controls
                        playsInline
                        preload="metadata"
                        poster={posterSrc}
                        style={{ width: '100%', height: '260px', objectFit: 'cover', display: 'block' }}
                      >
                        <source src={videoSrc} type="video/mp4" />
                        Your browser does not support HTML5 video.
                      </video>
                    </div>
                    <div className="card-body">
                      <h3 style={{ margin: '0 0 8px', color: 'var(--purple-dark)', fontSize: '18px' }}>
                        {vid.title}
                      </h3>
                      <p style={{ margin: 0, fontSize: '14px', color: 'var(--muted)', lineHeight: 1.6 }}>
                        {vid.description}
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '40px', background: '#faf8fb', borderRadius: 'var(--radius)', border: '1px solid var(--line)' }}>
              <p style={{ margin: 0, color: 'var(--muted)' }}>No videos currently uploaded.</p>
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default VideoGallery;
