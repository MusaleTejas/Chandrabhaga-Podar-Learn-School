import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { SCHOOL_DETAILS } from '../utils/constants';
import { useLanguage } from '../context/LanguageContext';

const OurTeam = () => {
  const { homeLabel, t } = useLanguage();

  return (
    <>
      <section className="page-banner">
        <div className="container">
          <span className="eyebrow">{t('About School')}</span>
          <h1 className="page-title">{t('Our Team')}</h1>
          <div className="breadcrumbs">
            <Link to="/"><span className="home-text notranslate">{homeLabel}</span></Link> &nbsp; / &nbsp; <Link to="/about-us">{t('About School')}</Link> &nbsp; / &nbsp; {t('Our Team')}
          </div>
        </div>
      </section>

      <main className="section">
        <div className="container">
          <div className="content-layout">
            <div className="prose">
              <span className="kicker">Dedicated Educators</span>
              <h2>Committed to Inspiring and Guiding Every Student</h2>
              <p className="lead">
                The faculty and staff at {SCHOOL_DETAILS.name} are guided by passion for teaching and a deep dedication to student welfare.
              </p>

              <h2 style={{ marginTop: '32px' }}>School Administration</h2>
              <div className="grid grid-responsive-2" style={{ marginTop: '20px' }}>
                {/* Principal Card */}
                <article className="card" style={{ display: 'flex', flexDirection: 'column' }}>
                  <img src="/assets/images/classroom/classroom-6.png" alt={SCHOOL_DETAILS.principalName} style={{ height: '250px', objectFit: 'cover' }} />
                  <div className="card-body">
                    <span className="kicker">Principal & Headmaster</span>
                    <h3 style={{ margin: '4px 0 8px' }}>{SCHOOL_DETAILS.principalName}</h3>
                    <p style={{ fontWeight: 700, color: 'var(--purple)', marginBottom: '6px' }}>{SCHOOL_DETAILS.principalQualification}</p>
                    <p style={{ fontSize: '13.5px' }}>{SCHOOL_DETAILS.principalExperience}</p>
                    <div style={{ marginTop: '14px', paddingTop: '10px', borderTop: '1px solid var(--line)', fontSize: '13px', color: 'var(--muted)' }}>
                      Oversees overall school administration, CBSE compliance, curriculum execution, and student guidance.
                    </div>
                  </div>
                </article>

                {/* Trust Governance Card */}
                <article className="card" style={{ display: 'flex', flexDirection: 'column' }}>
                  <div style={{ height: '250px', background: 'linear-gradient(135deg, var(--purple-dark), var(--purple))', display: 'grid', placeItems: 'center', color: '#fff', padding: '24px', textAlign: 'center' }}>
                    <div>
                      <div style={{ width: '68px', height: '68px', borderRadius: '50%', background: 'rgba(255,255,255,0.15)', display: 'grid', placeItems: 'center', margin: '0 auto 14px', fontSize: '28px' }}>
                        🏛
                      </div>
                      <strong style={{ fontSize: '18px', display: 'block', fontFamily: "'Manrope', sans-serif" }}>Managing Trust</strong>
                      <span style={{ fontSize: '13px', color: 'var(--gold)', display: 'block', marginTop: '4px' }}>{SCHOOL_DETAILS.trustName}</span>
                    </div>
                  </div>
                  <div className="card-body">
                    <span className="kicker">Governing Council</span>
                    <h3 style={{ margin: '4px 0 8px' }}>Board of Trustees</h3>
                    <p style={{ fontWeight: 700, color: 'var(--purple)', marginBottom: '6px' }}>Visionary Patronage</p>
                    <p style={{ fontSize: '13.5px' }}>Institutional policy, infrastructure expansion, and community engagement in Majalgaon and Beed district.</p>
                    <div style={{ marginTop: '14px', paddingTop: '10px', borderTop: '1px solid var(--line)', fontSize: '13px', color: 'var(--muted)' }}>
                      Registered educational trust committed to non-profit social education service.
                    </div>
                  </div>
                </article>
              </div>

              <h2 style={{ marginTop: '40px' }}>Teaching Faculty Philosophy</h2>
              <p>
                Our educators undergo continuous CBSE training, pedagogy workshops, and child safety certifications. With a balanced teacher-student ratio, every child receives personal attention, encouragement, and academic remediation when needed.
              </p>
            </div>

            <Sidebar />
          </div>
        </div>
      </main>
    </>
  );
};

export default OurTeam;
