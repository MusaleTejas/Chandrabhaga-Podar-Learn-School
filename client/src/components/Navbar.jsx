import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SCHOOL_DETAILS } from '../utils/constants';
import { useLanguage } from '../context/LanguageContext';

const Navbar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const { lang, langName, switchLanguage, homeLabel, t } = useLanguage();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState(null);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  // Close menus on page navigation
  useEffect(() => {
    setMobileOpen(false);
    setOpenGroup(null);
    setLangDropdownOpen(false);
    if (document.body) {
      document.body.classList.remove('nav-open');
    }
  }, [currentPath]);

  // Handle window resizing: reset mobile states on desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 992) {
        setMobileOpen(false);
        setOpenGroup(null);
        if (document.body) {
          document.body.classList.remove('nav-open');
        }
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Synchronize body scroll lock when mobile drawer opens
  useEffect(() => {
    if (document.body) {
      if (mobileOpen) {
        document.body.classList.add('nav-open');
      } else {
        document.body.classList.remove('nav-open');
      }
    }
  }, [mobileOpen]);

  // Click outside listener
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.nav-lang-dropdown')) {
        setLangDropdownOpen(false);
      }
      if (!e.target.closest('.nav-group')) {
        setOpenGroup(null);
      }
      if (mobileOpen && !e.target.closest('.site-header') && !e.target.closest('#navBackdrop')) {
        setMobileOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [mobileOpen]);

  const isAboutActive = ['/about-us', '/principal-message', '/chairman-message', '/mission-vision', '/school-song', '/our-team', '/brochure'].includes(currentPath);
  const isAdmissionActive = ['/admission-process', '/fee-structure'].includes(currentPath);
  const isGalleryActive = ['/photo-gallery', '/video-gallery'].includes(currentPath);
  const isNoticeActive = ['/news-events', '/time-table', '/current-vacancies'].includes(currentPath) || currentPath.startsWith('/events/');

  const toggleGroup = (groupName) => {
    setOpenGroup((prev) => (prev === groupName ? null : groupName));
  };

  const closeMobile = () => {
    setMobileOpen(false);
    setOpenGroup(null);
  };

  return (
    <>
      <header className="site-header">
        <div className="container header-row">
          <Link className="brand" to="/" aria-label={`${SCHOOL_DETAILS.name} Home`} onClick={closeMobile}>
            <img src="/assets/images/logo.svg" alt={`${SCHOOL_DETAILS.shortName} Logo`} width="64" height="64" />
            <span className="brand-copy">
              <strong>CHANDRABHAGA PODAR<br />LEARN SCHOOL</strong>
              <span>Dindrud · Majalgaon · Beed</span>
            </span>
          </Link>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {/* Quick Header Language Switcher Button for Mobile */}
            <button
              type="button"
              className="mobile-header-lang-btn"
              onClick={() => {
                const nextLang = lang === 'en' ? 'mr' : lang === 'mr' ? 'hi' : 'en';
                switchLanguage(nextLang);
              }}
              title="Change Language"
              aria-label="Change Language"
            >
              <span>🌐</span> {lang === 'en' ? 'EN' : lang === 'mr' ? 'मराठी' : 'हिन्दी'}
            </button>

            {/* Mobile Hamburger Toggle Button */}
            <button
              className={`menu-toggle ${mobileOpen ? 'is-active' : ''}`}
              id="menuToggle"
              aria-expanded={mobileOpen ? 'true' : 'false'}
              aria-controls="main-nav"
              aria-label="Toggle navigation"
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <span className="hamburger-box" aria-hidden="true">
                <span className="hamburger-bar"></span>
                <span className="hamburger-bar"></span>
                <span className="hamburger-bar"></span>
              </span>
              <span className="menu-label">{mobileOpen ? t('Close') : t('Menu')}</span>
            </button>
          </div>

          <nav className={`nav ${mobileOpen ? 'mobile-open' : ''} notranslate`} id="main-nav" aria-label="Main navigation">
            <Link to="/" className={currentPath === '/' ? 'active' : ''} onClick={closeMobile}>
              <span className="home-text notranslate">{homeLabel}</span>
            </Link>

            {/* About School Group */}
            <div className={`nav-group ${openGroup === 'about' ? 'open' : ''}`}>
              <button
                type="button"
                className={isAboutActive ? 'active' : ''}
                aria-expanded={openGroup === 'about' ? 'true' : 'false'}
                onClick={() => toggleGroup('about')}
              >
                <span>{t('About School')}</span> <span className="nav-arrow" aria-hidden="true">▼</span>
              </button>
              <div className="dropdown">
                <Link to="/about-us" className={currentPath === '/about-us' ? 'active' : ''} onClick={closeMobile}>{t('About Us')}</Link>
                <Link to="/principal-message" className={currentPath === '/principal-message' ? 'active' : ''} onClick={closeMobile}>{t("Principal's Message")}</Link>
                <Link to="/chairman-message" className={currentPath === '/chairman-message' ? 'active' : ''} onClick={closeMobile}>{t("Chairman's Message")}</Link>
                <Link to="/mission-vision" className={currentPath === '/mission-vision' ? 'active' : ''} onClick={closeMobile}>{t('Mission & Vision')}</Link>
                <Link to="/school-song" className={currentPath === '/school-song' ? 'active' : ''} onClick={closeMobile}>{t('School Song')}</Link>
                <Link to="/our-team" className={currentPath === '/our-team' ? 'active' : ''} onClick={closeMobile}>{t('Our Team')}</Link>
                <Link to="/brochure" className={currentPath === '/brochure' ? 'active' : ''} onClick={closeMobile}>{t('School Brochure')}</Link>
              </div>
            </div>

            {/* Admission Group */}
            <div className={`nav-group ${openGroup === 'admission' ? 'open' : ''}`}>
              <button
                type="button"
                className={isAdmissionActive ? 'active' : ''}
                aria-expanded={openGroup === 'admission' ? 'true' : 'false'}
                onClick={() => toggleGroup('admission')}
              >
                <span>{t('Admission')}</span> <span className="nav-arrow" aria-hidden="true">▼</span>
              </button>
              <div className="dropdown">
                <Link to="/admission-process" className={currentPath === '/admission-process' ? 'active' : ''} onClick={closeMobile}>{t('Admission Process')}</Link>
                <Link to="/fee-structure" className={currentPath === '/fee-structure' ? 'active' : ''} onClick={closeMobile}>{t('Fee Structure')}</Link>
              </div>
            </div>

            {/* Gallery Group */}
            <div className={`nav-group ${openGroup === 'gallery' ? 'open' : ''}`}>
              <button
                type="button"
                className={isGalleryActive ? 'active' : ''}
                aria-expanded={openGroup === 'gallery' ? 'true' : 'false'}
                onClick={() => toggleGroup('gallery')}
              >
                <span>{t('Gallery')}</span> <span className="nav-arrow" aria-hidden="true">▼</span>
              </button>
              <div className="dropdown">
                <Link to="/photo-gallery" className={currentPath === '/photo-gallery' ? 'active' : ''} onClick={closeMobile}>{t('Photo Gallery')}</Link>
                <Link to="/video-gallery" className={currentPath === '/video-gallery' ? 'active' : ''} onClick={closeMobile}>{t('Video Gallery')}</Link>
              </div>
            </div>

            {/* Notice Board Group */}
            <div className={`nav-group ${openGroup === 'notice' ? 'open' : ''}`}>
              <button
                type="button"
                className={isNoticeActive ? 'active' : ''}
                aria-expanded={openGroup === 'notice' ? 'true' : 'false'}
                onClick={() => toggleGroup('notice')}
              >
                <span>{t('Notice Board')}</span> <span className="nav-arrow" aria-hidden="true">▼</span>
              </button>
              <div className="dropdown">
                <Link to="/news-events" className={currentPath === '/news-events' ? 'active' : ''} onClick={closeMobile}>{t('News & Events')}</Link>
                <Link to="/time-table" className={currentPath === '/time-table' ? 'active' : ''} onClick={closeMobile}>{t('Time-Table')}</Link>
                <Link to="/current-vacancies" className={currentPath === '/current-vacancies' ? 'active' : ''} onClick={closeMobile}>{t('Current Vacancies')}</Link>
              </div>
            </div>

            {/* Contact Us */}
            <Link to="/contact-us" className={currentPath === '/contact-us' ? 'active' : ''} onClick={closeMobile}>{t('Contact Us')}</Link>

            {/* Desktop Language Button & Dropdown */}
            <div className={`nav-lang-dropdown ${langDropdownOpen ? 'open' : ''}`}>
              <button
                type="button"
                className="lang-toggle-btn"
                id="langToggleBtn"
                aria-haspopup="true"
                aria-expanded={langDropdownOpen ? 'true' : 'false'}
                aria-label="Select Language"
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              >
                <span className="lang-globe-icon">🌐</span>
                <span className="lang-current-label" id="activeLangText">{langName}</span>
                <span className="lang-arrow">▾</span>
              </button>
              <div className="lang-dropdown-panel" id="langDropdownPanel">
                <button
                  type="button"
                  className={`lang-select-item ${lang === 'en' ? 'active' : ''}`}
                  onClick={() => { switchLanguage('en'); setLangDropdownOpen(false); }}
                >
                  <span className="lang-name">English</span>
                  {lang === 'en' && <span className="lang-check">✓</span>}
                </button>
                <button
                  type="button"
                  className={`lang-select-item ${lang === 'mr' ? 'active' : ''}`}
                  onClick={() => { switchLanguage('mr'); setLangDropdownOpen(false); }}
                >
                  <span className="lang-name">मराठी (Marathi)</span>
                  {lang === 'mr' && <span className="lang-check">✓</span>}
                </button>
                <button
                  type="button"
                  className={`lang-select-item ${lang === 'hi' ? 'active' : ''}`}
                  onClick={() => { switchLanguage('hi'); setLangDropdownOpen(false); }}
                >
                  <span className="lang-name">हिन्दी (Hindi)</span>
                  {lang === 'hi' && <span className="lang-check">✓</span>}
                </button>
              </div>
            </div>

            {/* Mobile Drawer Actions */}
            <div className="nav-mobile-footer">
              <div className="mobile-lang-box">
                <span className="mobile-lang-title">🌐 {t('Select Language')}:</span>
                <div className="mobile-lang-btns">
                  <button
                    type="button"
                    className={`lang-select-item ${lang === 'en' ? 'active' : ''}`}
                    onClick={() => { switchLanguage('en'); setMobileOpen(false); }}
                  >
                    English
                  </button>
                  <button
                    type="button"
                    className={`lang-select-item ${lang === 'mr' ? 'active' : ''}`}
                    onClick={() => { switchLanguage('mr'); setMobileOpen(false); }}
                  >
                    मराठी
                  </button>
                  <button
                    type="button"
                    className={`lang-select-item ${lang === 'hi' ? 'active' : ''}`}
                    onClick={() => { switchLanguage('hi'); setMobileOpen(false); }}
                  >
                    हिन्दी
                  </button>
                </div>
              </div>

              <a
                href={SCHOOL_DETAILS.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mobile-whatsapp-btn"
                onClick={closeMobile}
              >
                <span>💬</span> WhatsApp: {SCHOOL_DETAILS.phone}
              </a>

              <a href={`tel:${SCHOOL_DETAILS.phoneClean}`} className="mobile-cta-btn" onClick={closeMobile}>
                <span>📞</span> Call: {SCHOOL_DETAILS.phone}
              </a>

              <div className="mobile-quick-links">
                <Link to="/cbse-disclosure" onClick={closeMobile}>📋 {t('CBSE Mandatory Disclosure')}</Link>
                <Link to="/admin/login" onClick={closeMobile}>🔐 {t('Admin Login')} ↗</Link>
              </div>
              <div className="mobile-campus-note">
                📍 {SCHOOL_DETAILS.address}
              </div>
            </div>
          </nav>
        </div>
      </header>

      {/* Backdrop Overlay for Mobile Navigation */}
      <div
        className={`nav-backdrop ${mobileOpen ? 'active' : ''}`}
        id="navBackdrop"
        aria-hidden="true"
        onClick={closeMobile}
      ></div>
    </>
  );
};

export default Navbar;
