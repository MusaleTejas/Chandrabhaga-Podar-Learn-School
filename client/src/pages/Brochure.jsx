import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { SCHOOL_DETAILS } from '../utils/constants';
import { useLanguage } from '../context/LanguageContext';

const Brochure = () => {
  const { homeLabel, t } = useLanguage();

  return (
    <>
      <section className="page-banner">
        <div className="container">
          <span className="eyebrow">{t('About School')}</span>
          <h1 className="page-title">{t('School Brochure')}</h1>
          <div className="breadcrumbs">
            <Link to="/"><span className="home-text notranslate">{homeLabel}</span></Link> &nbsp; / &nbsp; <Link to="/about-us">{t('About School')}</Link> &nbsp; / &nbsp; {t('School Brochure')}
          </div>
        </div>
      </section>

      <main className="section">
        <div className="container">
          <div className="content-layout">
            <div className="prose">
              <span className="kicker">Official Publication</span>
              <h2>School Prospectus & Academic Guide</h2>
              <p className="lead">
                The {SCHOOL_DETAILS.shortName} prospectus provides parents with comprehensive details regarding our CBSE curriculum, classroom facilities, sports development programs, and admission guidelines.
              </p>

              <div style={{ background: '#faf7fc', border: '1px solid var(--line)', borderRadius: 'var(--radius)', padding: '32px', margin: '30px 0', display: 'flex', gap: '24px', alignItems: 'center', flexWrap: 'wrap' }}>
                <div style={{ width: '72px', height: '72px', background: 'var(--purple)', color: '#fff', borderRadius: '14px', display: 'grid', placeItems: 'center', fontSize: '32px', flexShrink: 0 }}>
                  📄
                </div>
                <div style={{ flexGrow: 1, minWidth: '240px' }}>
                  <h3 style={{ margin: '0 0 6px', fontSize: '19px', color: 'var(--purple-dark)' }}>{SCHOOL_DETAILS.name} Information Package</h3>
                  <p style={{ margin: '0 0 12px', fontSize: '14px', color: 'var(--muted)' }}>
                    Includes school overview, curriculum highlights, code of conduct, and admission documentation requirements.
                  </p>
                  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    <Link to="/admission-process" className="btn btn-purple btn-sm">Explore Admission Guide →</Link>
                    <Link to="/contact-us" className="btn btn-sm" style={{ background: 'var(--gold)', borderColor: 'var(--gold)', color: '#20132b' }}>Request Printed Copy ↗</Link>
                  </div>
                </div>
              </div>

              <h2>Key Highlights Inside the Brochure</h2>
              <div className="grid highlights" style={{ margin: '24px 0' }}>
                <div className="facility">
                  <span>SECTION 1</span>
                  <strong>Curricular Framework</strong>
                  <p>Details of CBSE subject syllabus, evaluation methodology, and continuous assessment.</p>
                </div>
                <div className="facility">
                  <span>SECTION 2</span>
                  <strong>Campus Infrastructure</strong>
                  <p>Information on our computer laboratory, outdoor sporting grounds, and transport safety.</p>
                </div>
                <div className="facility">
                  <span>SECTION 3</span>
                  <strong>Code of Conduct & Values</strong>
                  <p>School discipline policies, attendance expectations, and student safety regulations.</p>
                </div>
              </div>

              <h2>How to Obtain a Physical Copy</h2>
              <p>
                Parents visiting our administrative office on Belura Road, Dindrud may collect a complimentary printed prospectus directly from our front desk counselor during official campus hours (9:00 AM to 4:30 PM).
              </p>
            </div>

            <Sidebar />
          </div>
        </div>
      </main>
    </>
  );
};

export default Brochure;
