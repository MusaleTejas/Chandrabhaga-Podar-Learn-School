import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { SCHOOL_DETAILS } from '../utils/constants';
import { useLanguage } from '../context/LanguageContext';

const ChairmanMessage = () => {
  const { homeLabel, t } = useLanguage();

  return (
    <>
      <section className="page-banner">
        <div className="container">
          <span className="eyebrow">{t('About School')}</span>
          <h1 className="page-title">{t("Chairman's Message")}</h1>
          <div className="breadcrumbs">
            <Link to="/"><span className="home-text notranslate">{homeLabel}</span></Link> &nbsp; / &nbsp; <Link to="/about-us">{t('About School')}</Link> &nbsp; / &nbsp; {t("Chairman's Message")}
          </div>
        </div>
      </section>

      <main className="section">
        <div className="container">
          <div className="content-layout">
            <div className="prose">
              <span className="kicker">{SCHOOL_DETAILS.trustName}</span>
              <h2>A Dream for Every Family in Our Region</h2>
              <p className="lead">
                When we established {SCHOOL_DETAILS.name} through {SCHOOL_DETAILS.trustName}, our heartfelt goal was simple: no parent in Dindrud, Majalgaon, or neighbouring villages should have to send their young child away to distant cities just to get a good English-medium CBSE education.
              </p>
              <p>
                We believe with all our hearts that a child born in rural Maharashtra has every bit as much intelligence and promise as a child in Mumbai or Pune. By building modern classrooms, a dedicated computer lab, and expansive sports grounds right here on Belura Road, we bring equal opportunities directly to our doorsteps.
              </p>

              <div style={{ background: '#faf7fc', borderLeft: '4px solid var(--purple)', padding: '22px', borderRadius: '0 var(--radius-sm) var(--radius-sm) 0', margin: '26px 0' }}>
                <p style={{ fontSize: '16px', fontWeight: 500, color: '#281534', margin: 0, fontStyle: 'italic' }}>
                  "Our greatest joy is seeing a child from our rural community stand up confidently, speak English fluently, respect their parents and teachers, and dream of becoming an officer, doctor, engineer, or honest entrepreneur."
                </p>
              </div>

              <h2>Key Institutional Pillars</h2>
              <div className="grid highlights" style={{ margin: '24px 0' }}>
                <div className="facility">
                  <span>PILLAR 1</span>
                  <strong>Educational Equity</strong>
                  <p>Ensuring quality CBSE education is accessible and affordable to families across the Majalgaon and Beed region.</p>
                </div>
                <div className="facility">
                  <span>PILLAR 2</span>
                  <strong>Modern Infrastructure</strong>
                  <p>Continuous investment in modern digital facilities, science and IT laboratories, and spacious sports grounds.</p>
                </div>
                <div className="facility">
                  <span>PILLAR 3</span>
                  <strong>Holistic Mentorship</strong>
                  <p>Recruiting and supporting committed educators who treat teaching as a noble service to society.</p>
                </div>
              </div>

              <h2>Message to Parents</h2>
              <p>
                We consider every parent our partner in this educational mission. Together, let us give our children the roots of strong character and the wings of modern knowledge.
              </p>

              <div style={{ marginTop: '28px', padding: '20px', background: '#faf8fb', borderRadius: 'var(--radius)', borderLeft: '4px solid var(--purple)' }}>
                <strong>Board of Trustees</strong><br />
                <span style={{ color: 'var(--muted)', fontSize: '14px' }}>{SCHOOL_DETAILS.trustName}</span>
              </div>
            </div>

            <Sidebar />
          </div>
        </div>
      </main>
    </>
  );
};

export default ChairmanMessage;
