import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { SCHOOL_DETAILS } from '../utils/constants';
import { useLanguage } from '../context/LanguageContext';

const PrincipalMessage = () => {
  const { homeLabel, t } = useLanguage();

  return (
    <>
      <section className="page-banner">
        <div className="container">
          <span className="eyebrow">{t('About School')}</span>
          <h1 className="page-title">{t("Principal's Message")}</h1>
          <div className="breadcrumbs">
            <Link to="/"><span className="home-text notranslate">{homeLabel}</span></Link> &nbsp; / &nbsp; <Link to="/about-us">{t('About School')}</Link> &nbsp; / &nbsp; {t("Principal's Message")}
          </div>
        </div>
      </section>

      <main className="section">
        <div className="container">
          <div className="content-layout">
            <div className="prose">
              <div className="about-grid" style={{ alignItems: 'flex-start', marginBottom: '32px' }}>
                <div className="about-photo">
                  <img src="/assets/images/classroom/classroom-6.png" alt={`${SCHOOL_DETAILS.principalName}, Principal`} style={{ height: '380px' }} />
                </div>
                <div>
                  <span className="kicker">Message from the Principal</span>
                  <h2 style={{ marginBottom: '6px' }}>{SCHOOL_DETAILS.principalName}</h2>
                  <p style={{ color: 'var(--purple)', fontWeight: 700, marginBottom: '12px' }}>
                    Principal · {SCHOOL_DETAILS.principalQualification}
                  </p>
                  <div style={{ background: '#fbf8fc', padding: '16px', borderLeft: '3px solid var(--purple)', marginBottom: '18px', borderRadius: '0 6px 6px 0' }}>
                    <span style={{ fontSize: '13.5px', color: 'var(--muted)', display: 'block' }}>Professional Background:</span>
                    <strong style={{ color: 'var(--ink)' }}>{SCHOOL_DETAILS.principalExperience}</strong>
                  </div>
                  <p>
                    "Education is not merely the transmission of information; it is the ignition of innate curiosity and the cultivation of sound character in every young learner."
                  </p>
                </div>
              </div>

              <h2>Dear Parents, Students, and Well-Wishers,</h2>
              <p className="lead">
                It is a true honour to welcome you to {SCHOOL_DETAILS.name}. When parents entrust their child to our school, they place their highest hopes and dreams in our hands—and we take that responsibility to heart every single morning as the school gates open.
              </p>
              <p>
                Children growing up in Dindrud, Majalgaon, and across Beed district have immense curiosity, grit, and potential. What they deserve is modern learning: teachers who explain every concept patiently, science labs and computer keyboards they can touch with their own hands, and encouragement to speak English confidently while remaining proud of their Marathi roots and cultural heritage.
              </p>
              <p>
                We do not believe in rote memorization or exam stress alone. A healthy childhood needs space to run on the sports ground, time to sing and act on stage, and mentors who teach honesty, kindness, and hard work. With 10+ years devoted to teaching and school administration, my focus is always on the individual progress of every single boy and girl in our care.
              </p>
              <p>
                I warmly invite every parent to visit our campus, observe our classrooms, speak directly with our teachers, and experience the warm, disciplined environment we have built here in Dindrud.
              </p>

              <div style={{ marginTop: '28px', padding: '20px', background: '#faf8fb', borderRadius: 'var(--radius)', borderLeft: '4px solid var(--purple)' }}>
                <strong>Mr. Nilesh Papalal Nindane</strong><br />
                <span style={{ color: 'var(--muted)', fontSize: '14px' }}>Principal, Chandrabhaga Podar Learn School, Dindrud</span>
              </div>
            </div>

            <Sidebar />
          </div>
        </div>
      </main>
    </>
  );
};

export default PrincipalMessage;
