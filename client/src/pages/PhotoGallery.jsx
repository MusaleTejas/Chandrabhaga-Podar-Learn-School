import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import LightboxModal from '../components/LightboxModal';
import { useLanguage } from '../context/LanguageContext';

const PhotoGallery = () => {
  const { homeLabel, t } = useLanguage();
  const [photos, setPhotos] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxSrc, setLightboxSrc] = useState('');
  const [lightboxAlt, setLightboxAlt] = useState('');

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const res = await api.get('/gallery/photos');
        if (res.data.success) {
          setPhotos(res.data.photos || []);
        }
      } catch (err) {
        console.warn('Failed to load gallery photos:', err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, []);

  const openLightbox = (src, alt) => {
    setLightboxSrc(src);
    setLightboxAlt(alt);
    setLightboxOpen(true);
  };

  const filteredPhotos = activeCategory === 'all'
    ? photos
    : photos.filter((p) => p.cat === activeCategory);

  const categories = [
    { id: 'all', key: 'All Photographs', label: t('All Photographs') },
    { id: 'classroom', key: 'Classrooms & Teaching', label: t('Classrooms & Teaching') },
    { id: 'activity', key: 'Student Activities', label: t('Student Activities') },
    { id: 'sports', key: 'Sports & Athletics', label: t('Sports & Athletics') },
    { id: 'music', key: 'Music & Arts', label: t('Music & Arts') },
    { id: 'outdoor', key: 'Campus & Ceremonies', label: t('Campus & Ceremonies') },
    { id: 'events', key: 'Uploaded Events', label: t('Uploaded Events') }
  ];

  return (
    <>
      <section className="page-banner">
        <div className="container">
          <span className="eyebrow">Visual Heritage</span>
          <h1 className="page-title">{t('Photo Gallery')}</h1>
          <div className="breadcrumbs">
            <Link to="/"><span className="home-text notranslate">{homeLabel}</span></Link> &nbsp; / &nbsp; {t('Photo Gallery')}
          </div>
        </div>
      </section>

      <main className="section">
        <div className="container">
          <div className="section-head center">
            <span className="kicker">Campus Moments</span>
            <h2>Life at Chandrabhaga Podar Learn School</h2>
            <p>
              Explore authentic photographs capturing student learning in classrooms, athletic sports meets, cultural ceremonies, and co-curricular programs.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '32px' }}>
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                className={`filter-btn ${activeCategory === cat.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Photos Grid */}
          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px', color: 'var(--muted)' }}>
              Loading photo gallery...
            </div>
          ) : filteredPhotos.length > 0 ? (
            <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
              {filteredPhotos.map((photo, idx) => {
                const src = photo.path.startsWith('http') || photo.path.startsWith('/')
                  ? photo.path
                  : `/${photo.path}`;

                return (
                  <article
                    key={idx}
                    className="card"
                    style={{ overflow: 'hidden', cursor: 'pointer', transition: 'transform 0.2s ease, box-shadow 0.2s ease' }}
                    onClick={() => openLightbox(src, photo.title)}
                  >
                    <div style={{ height: '220px', overflow: 'hidden', background: '#ece6f0' }}>
                      <img
                        src={src}
                        alt={photo.title}
                        loading="lazy"
                        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s ease' }}
                      />
                    </div>
                    <div style={{ padding: '14px 16px' }}>
                      <span className="badge badge-secondary" style={{ fontSize: '11px', textTransform: 'uppercase', marginBottom: '6px' }}>
                        {photo.cat}
                      </span>
                      <h4 style={{ margin: 0, fontSize: '14.5px', color: 'var(--purple-dark)' }}>
                        {photo.title}
                      </h4>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '40px', background: '#faf8fb', borderRadius: 'var(--radius)', border: '1px solid var(--line)' }}>
              <p style={{ margin: 0, color: 'var(--muted)' }}>No photographs found in this category.</p>
            </div>
          )}
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

export default PhotoGallery;
