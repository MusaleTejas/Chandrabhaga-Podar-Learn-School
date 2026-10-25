import React from 'react';
import { Link } from 'react-router-dom';
import { SCHOOL_DETAILS } from '../utils/constants';
import { useLanguage } from '../context/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="footer">
      <div className="container footer-grid">
        {/* School Identity */}
        <div>
          <Link className="brand" to="/" style={{ marginBottom: '16px' }}>
            <img src="/assets/images/logo.svg" alt={`${SCHOOL_DETAILS.shortName} Crest`} width="56" height="56" />
            <span className="brand-copy">
              <strong style={{ color: '#ffffff' }}>CHANDRABHAGA PODAR<br />LEARN SCHOOL</strong>
              <span style={{ color: 'var(--gold)' }}>Dindrud · Beed</span>
            </span>
          </Link>
          <p style={{ marginTop: '14px', lineHeight: 1.6 }}>
            Affiliated to Central Board of Secondary Education (CBSE Affiliation No. {SCHOOL_DETAILS.cbseAffiliationNo}). Operated under {SCHOOL_DETAILS.trustName}.
          </p>
          <div style={{ marginTop: '16px', display: 'flex', gap: '12px', alignItems: 'center' }}>
            <a
              href={SCHOOL_DETAILS.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--gold)', fontWeight: 600 }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              Facebook
            </a>
            <span style={{ color: 'rgba(255,255,255,0.2)' }}>|</span>
            <a
              href={SCHOOL_DETAILS.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--gold)', fontWeight: 600 }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
              YouTube
            </a>
          </div>
        </div>

        {/* Quick Navigation */}
        <div>
          <h3>{t('About the School')}</h3>
          <Link to="/about-us">{t('About Us')}</Link>
          <Link to="/principal-message">{t("Principal's Message")}</Link>
          <Link to="/chairman-message">{t("Chairman's Message")}</Link>
          <Link to="/mission-vision">{t('Mission & Vision')}</Link>
          <Link to="/our-team">{t('Our Team')}</Link>
          <Link to="/brochure">{t('School Brochure')}</Link>
        </div>

        {/* Admissions & Links */}
        <div>
          <h3>{t('Admissions & Academics')}</h3>
          <Link to="/admission-process">{t('Admission Process')}</Link>
          <Link to="/fee-structure">{t('Fee Structure')}</Link>
          <Link to="/photo-gallery">{t('Photo Gallery')}</Link>
          <Link to="/video-gallery">{t('Video Gallery')}</Link>
          <Link to="/news-events">{t('News & Events')}</Link>
          <Link to="/cbse-disclosure">{t('Mandatory Disclosure')}</Link>
        </div>

        {/* Verified Contact */}
        <div>
          <h3>{t('Contact Us')}</h3>
          <p style={{ marginBottom: '10px' }}>
            {SCHOOL_DETAILS.address}
          </p>
          <a
            href={SCHOOL_DETAILS.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#25d366', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '6px' }}
          >
            <span>💬</span> WhatsApp: {SCHOOL_DETAILS.phone}
          </a>
          <a href={`tel:${SCHOOL_DETAILS.phoneClean}`}>📞 {SCHOOL_DETAILS.phone}</a>
          <a href={`mailto:${SCHOOL_DETAILS.email}`}>✉ {SCHOOL_DETAILS.email}</a>
          <a href={SCHOOL_DETAILS.officialWebsite} target="_blank" rel="noopener noreferrer">🌐 {SCHOOL_DETAILS.officialWebsite}</a>
          <a href={SCHOOL_DETAILS.cbseDirectoryUrl} target="_blank" rel="noopener noreferrer">📋 CBSE Directory Profile</a>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="footer-bottom">
        <div className="container">
          <span>&copy; {new Date().getFullYear()} {SCHOOL_DETAILS.name}. {t('All rights reserved.')}</span>
          <span>CBSE Affiliation No: {SCHOOL_DETAILS.cbseAffiliationNo} · School Code: {SCHOOL_DETAILS.schoolCode}</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
