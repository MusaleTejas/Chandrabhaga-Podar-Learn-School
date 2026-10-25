import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { SCHOOL_DETAILS } from '../utils/constants';
import { useLanguage } from '../context/LanguageContext';

const LoginPortal = () => {
  const { homeLabel, t } = useLanguage();

  return (
    <>
      <section className="page-banner">
        <div className="container">
          <span className="eyebrow">{t('Admin Login')}</span>
          <h1 className="page-title">{t('Admin Login')}</h1>
          <div className="breadcrumbs">
            <Link to="/"><span className="home-text notranslate">{homeLabel}</span></Link> &nbsp; / &nbsp; {t('Admin Login')}
          </div>
        </div>
      </section>

      <main className="section">
        <div className="container">
          <div className="content-layout">
            <div className="prose">
              <span className="kicker">Authorized Portals</span>
              <h2>Access School Systems & Administration</h2>
              <p className="lead">
                Welcome to the centralized portal entrance for {SCHOOL_DETAILS.name}. Please select your authorized gateway below:
              </p>

              <div className="grid grid-2" style={{ margin: '32px 0', gap: '24px' }}>
                {/* Administrator Portal Card */}
                <div className="card" style={{ border: '2px solid var(--purple)', padding: '26px' }}>
                  <div style={{ width: '52px', height: '52px', borderRadius: '12px', background: '#f3e9f7', display: 'grid', placeItems: 'center', fontSize: '24px', marginBottom: '16px' }}>
                    🔐
                  </div>
                  <h3 style={{ margin: '0 0 8px', color: 'var(--purple-dark)', fontSize: '19px' }}>Administrator Portal</h3>
                  <p style={{ fontSize: '14px', color: 'var(--muted)', marginBottom: '18px', lineHeight: 1.6 }}>
                    Direct dashboard access for authorized school management to update news, publish events, review admissions, and manage media.
                  </p>
                  <Link to="/admin/login" className="btn btn-purple btn-sm" style={{ width: '100%' }}>
                    Open Administrator Login →
                  </Link>
                </div>

                {/* Staff & Faculty Portal Card */}
                <div className="card" style={{ padding: '26px' }}>
                  <div style={{ width: '52px', height: '52px', borderRadius: '12px', background: '#e1f5fe', display: 'grid', placeItems: 'center', fontSize: '24px', marginBottom: '16px' }}>
                    👨‍🏫
                  </div>
                  <h3 style={{ margin: '0 0 8px', color: 'var(--ink)', fontSize: '19px' }}>Faculty & Staff Desk</h3>
                  <p style={{ fontSize: '14px', color: 'var(--muted)', marginBottom: '18px', lineHeight: 1.6 }}>
                    Internal faculty attendance, syllabus tracking, and CBSE curriculum workshop schedules.
                  </p>
                  <Link to="/contact-us" className="btn btn-outline-dark btn-sm" style={{ width: '100%' }}>
                    Contact Administration
                  </Link>
                </div>
              </div>

              <h2>Technical Assistance</h2>
              <p>
                If you are an authorized administrator facing difficulties logging in, please contact the campus IT desk directly or email{' '}
                <a href={`mailto:${SCHOOL_DETAILS.email}`} style={{ color: 'var(--purple)', fontWeight: 700 }}>
                  {SCHOOL_DETAILS.email}
                </a>.
              </p>
            </div>

            <Sidebar />
          </div>
        </div>
      </main>
    </>
  );
};

export default LoginPortal;
