import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { SCHOOL_DETAILS } from '../utils/constants';
import { useLanguage } from '../context/LanguageContext';

const SchoolSong = () => {
  const { homeLabel, t } = useLanguage();

  return (
    <>
      <section className="page-banner">
        <div className="container">
          <span className="eyebrow">{t('About School')}</span>
          <h1 className="page-title">{t('School Song')}</h1>
          <div className="breadcrumbs">
            <Link to="/"><span className="home-text notranslate">{homeLabel}</span></Link> &nbsp; / &nbsp; <Link to="/about-us">{t('About School')}</Link> &nbsp; / &nbsp; {t('School Song')}
          </div>
        </div>
      </section>

      <main className="section">
        <div className="container">
          <div className="content-layout">
            <div className="prose">
              <span className="kicker">Harmony & Identity</span>
              <h2>A Heritage of Song, Discipline & Cultural Expression</h2>
              <p className="lead">
                Music and morning assembly songs form an integral part of daily campus life at {SCHOOL_DETAILS.name}. Our students gather each morning to sing in unison, strengthening school unity, patriotism, and reverence.
              </p>

              <div style={{ background: '#faf7fb', border: '1px solid var(--line)', borderRadius: 'var(--radius)', padding: '28px', margin: '28px 0', boxShadow: 'var(--shadow-sm)' }}>
                <h3 style={{ marginTop: 0, color: 'var(--purple-dark)' }}>Watch: Extracurriculars, Music & Yoga Showcase</h3>
                <p style={{ color: 'var(--muted)', fontSize: '14px', marginBottom: '16px' }}>
                  Authentic school video showcasing music, yoga, and extracurricular training at Chandrabhaga Podar Learn School, Dindrud.
                </p>
                <video controls playsInline preload="metadata" style={{ width: '100%', borderRadius: '8px', background: '#000' }}>
                  <source src="/assets/videos/extracurriculars-showcase.mp4" type="video/mp4" />
                  Your browser does not support video playback.
                </video>
              </div>

              <h2>Cultural & Musical Traditions</h2>
              <p>
                At {SCHOOL_DETAILS.shortName}, our music and cultural initiatives encourage students to learn vocal discipline, rhythmic coordination, and traditional instruments. Special presentations are rehearsed and performed during national holidays like Independence Day, Republic Day, and traditional observances including Aashadhi Ekadashi.
              </p>

              <div className="grid grid-responsive-2" style={{ margin: '26px 0' }}>
                <img src="/assets/images/music/music-1.png" alt="Student music session" style={{ borderRadius: 'var(--radius-sm)', height: '220px', width: '100%', objectFit: 'cover' }} />
                <img src="/assets/images/outdoor/outdoor-1.png" alt="Aashadhi Ekadashi celebrations" style={{ borderRadius: 'var(--radius-sm)', height: '220px', width: '100%', objectFit: 'cover' }} />
              </div>

              <div className="empty-state" style={{ textAlign: 'left', marginTop: '28px' }}>
                <strong style={{ color: 'var(--purple-dark)' }}>Official Audio Recording Notice:</strong>
                <p style={{ margin: 0, color: '#5a5063' }}>
                  The studio audio master of the official school anthem will be updated here once officially published by the school administration. In the meantime, students perform the national anthem and morning assembly prayers daily during campus gatherings.
                </p>
              </div>
            </div>

            <Sidebar />
          </div>
        </div>
      </main>
    </>
  );
};

export default SchoolSong;
