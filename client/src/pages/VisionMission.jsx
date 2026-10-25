import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { SCHOOL_DETAILS } from '../utils/constants';
import { useLanguage } from '../context/LanguageContext';

const VisionMission = () => {
  const { homeLabel, t } = useLanguage();

  return (
    <>
      <section className="page-banner">
        <div className="container">
          <span className="eyebrow">{t('About School')}</span>
          <h1 className="page-title">{t('Mission & Vision')}</h1>
          <div className="breadcrumbs">
            <Link to="/"><span className="home-text notranslate">{homeLabel}</span></Link> &nbsp; / &nbsp; <Link to="/about-us">{t('About School')}</Link> &nbsp; / &nbsp; {t('Mission & Vision')}
          </div>
        </div>
      </section>

      <main className="section">
        <div className="container">
          <div className="content-layout">
            <div className="prose">
              <span className="kicker">Guiding Principles</span>
              <h2>Inspiring Excellence, Cultivating Character</h2>
              <p className="lead">
                At {SCHOOL_DETAILS.name}, our mission and vision represent our shared educational roadmap, shaping every classroom interaction, academic program, and extracurricular endeavor.
              </p>

              <div className="grid" style={{ gridTemplateColumns: '1fr', gap: '20px', margin: '32px 0' }}>
                <div className="facility" style={{ borderLeftColor: 'var(--purple)', padding: '28px' }}>
                  <span style={{ fontSize: '13px' }}>OUR MISSION</span>
                  <strong style={{ fontSize: '20px', margin: '6px 0 10px', color: 'var(--purple-dark)' }}>
                    To develop and equip children for the challenges of the 21st century.
                  </strong>
                  <p>
                    To provide holistic, experiential, and learner-centered education that empowers students with conceptual clarity, technological capabilities, critical inquiry, and sound ethical convictions.
                  </p>
                </div>

                <div className="facility" style={{ borderLeftColor: 'var(--blue)', padding: '28px' }}>
                  <span style={{ fontSize: '13px', color: 'var(--blue)' }}>OUR VISION</span>
                  <strong style={{ fontSize: '20px', margin: '6px 0 10px', color: 'var(--blue-dark)' }}>
                    To raise the standards of educational possibilities and outcomes for students, parents, and society.
                  </strong>
                  <p>
                    To be a benchmark of inclusive school education in Beed district, creating compassionate scholars and principled leaders who contribute positively to local and global communities.
                  </p>
                </div>

                <div className="facility" style={{ borderLeftColor: 'var(--gold)', padding: '28px' }}>
                  <span style={{ fontSize: '13px', color: '#a47614' }}>OUR CORE VALUES</span>
                  <strong style={{ fontSize: '20px', margin: '6px 0 10px', color: '#2e1d3a' }}>
                    Innovative · Open · Committed · Compassionate
                  </strong>
                  <p>
                    We believe in continuous pedagogical innovation, open communication with parents, unwavering commitment to child welfare, and deep empathy for all learners.
                  </p>
                </div>
              </div>

              <h2>Translating Values into Everyday Actions</h2>
              <p>
                Our core values are actively practiced through daily morning assemblies, peer collaboration projects, student councils, and environmental tree plantation drives across our campus.
              </p>
            </div>

            <Sidebar />
          </div>
        </div>
      </main>
    </>
  );
};

export default VisionMission;
