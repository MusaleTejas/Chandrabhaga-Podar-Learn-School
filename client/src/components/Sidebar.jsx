import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SCHOOL_DETAILS } from '../utils/constants';
import { useLanguage } from '../context/LanguageContext';

const Sidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const { t } = useLanguage();

  return (
    <aside className="side-panel">
      <h3>{t('About School')}</h3>
      <Link to="/about-us" className={currentPath === '/about-us' ? 'active' : ''}>{t('About Us')} →</Link>
      <Link to="/principal-message" className={currentPath === '/principal-message' ? 'active' : ''}>{t("Principal's Message")} →</Link>
      <Link to="/mission-vision" className={currentPath === '/mission-vision' ? 'active' : ''}>{t('Mission & Vision')} →</Link>
      <Link to="/admission-process" className={currentPath === '/admission-process' ? 'active' : ''}>{t('Admission Process')} →</Link>
      <Link to="/photo-gallery" className={currentPath === '/photo-gallery' ? 'active' : ''}>{t('Photo Gallery')} →</Link>
      <Link to="/video-gallery" className={currentPath === '/video-gallery' ? 'active' : ''}>{t('Video Gallery')} →</Link>
      <Link to="/news-events" className={currentPath === '/news-events' ? 'active' : ''}>{t('News & Events')} →</Link>
      <Link to="/cbse-disclosure" className={currentPath === '/cbse-disclosure' ? 'active' : ''}>{t('CBSE Mandatory Disclosure')} →</Link>
      <Link to="/contact-us" className={currentPath === '/contact-us' ? 'active' : ''}>{t('Contact Us')} →</Link>

      <div className="side-box">
        <h3>{t('Contact Us')}</h3>
        <p className="small-note" style={{ marginBottom: '12px' }}>{SCHOOL_DETAILS.address}</p>
        <a
          href={SCHOOL_DETAILS.whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontWeight: 700, color: '#25d366', display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          💬 WhatsApp: {SCHOOL_DETAILS.phone}
        </a>
        <a href={`tel:${SCHOOL_DETAILS.phoneClean}`} style={{ fontWeight: 700, color: 'var(--purple)' }}>
          📞 {SCHOOL_DETAILS.phone}
        </a>
        <a href={`mailto:${SCHOOL_DETAILS.email}`} style={{ color: 'var(--blue)' }}>
          ✉ {SCHOOL_DETAILS.email}
        </a>
      </div>
    </aside>
  );
};

export default Sidebar;
