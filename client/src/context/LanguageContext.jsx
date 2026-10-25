import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../utils/translations';

const LanguageContext = createContext(null);

export const LanguageProvider = ({ children }) => {
  // Always default to English ('en') on fresh visit.
  // The user can explicitly change the language during their session.
  const [lang, setLang] = useState(() => {
    const sessionLang = sessionStorage.getItem('cpls_lang');
    if (sessionLang && ['en', 'mr', 'hi'].includes(sessionLang)) {
      return sessionLang;
    }
    return 'en';
  });

  const langDisplayNames = {
    en: 'English',
    mr: 'मराठी',
    hi: 'हिन्दी'
  };

  // Instant dictionary translation helper with fallback
  const t = (key, fallback = null) => {
    if (!key) return '';
    if (translations[key] && translations[key][lang]) {
      return translations[key][lang];
    }
    return fallback !== null ? fallback : key;
  };

  // Safe Google Translate cookie setter
  const setLanguageCookie = (targetLang) => {
    if (targetLang === 'en') {
      document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      const host = window.location.hostname;
      if (host && host !== 'localhost' && !host.match(/^127\.|^192\.|^10\./)) {
        document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${host};`;
      }
    } else {
      const cookieVal = `/en/${targetLang}`;
      document.cookie = `googtrans=${cookieVal}; path=/;`;
      const host = window.location.hostname;
      if (host && host !== 'localhost' && !host.match(/^127\.|^192\.|^10\./)) {
        document.cookie = `googtrans=${cookieVal}; path=/; domain=.${host};`;
      }
    }
  };

  // Function to suppress any intrusive Google translate toolbar bars and reset body position
  const suppressGoogleToolbars = () => {
    if (document.body) {
      document.body.style.top = '0px';
    }
    const toHide = document.querySelectorAll(
      'body > .skiptranslate, iframe.goog-te-banner-frame, .goog-te-balloon-frame, #goog-gt-tt, #goog-gt-vt, div.skiptranslate'
    );
    toHide.forEach((el) => {
      el.style.display = 'none';
      el.style.visibility = 'hidden';
      el.style.height = '0px';
      el.style.opacity = '0';
      el.style.position = 'absolute';
      el.style.left = '-9999px';
      el.style.pointerEvents = 'none';
    });
  };

  // Enforce proper Terminology: "Home" must always be "मुखपृष्ठ", NEVER "घर"; "Admission" must NEVER be "Entry"
  const sanitizeIndicTerms = (targetLang) => {
    const isIndic = targetLang === 'mr' || targetLang === 'hi';
    const homeText = isIndic ? 'मुखपृष्ठ' : 'Home';
    const admissionText = isIndic ? 'प्रवेश' : 'Admission';

    document.querySelectorAll('.home-text').forEach((el) => {
      if (el.textContent !== homeText) {
        el.textContent = homeText;
      }
    });

    // Enforce proper terminology on all navigation, links, and buttons
    document.querySelectorAll('a, span, button, font, strong').forEach((node) => {
      const txt = node.textContent?.trim();
      // Ensure "Entry" is always corrected to "Admission" / "प्रवेश"
      if ((txt === 'Entry' || txt === 'entry' || txt === 'Entries' || txt === 'entries') &&
          (node.closest('nav') || node.closest('.breadcrumbs') || node.closest('.header-row') || node.closest('.dropdown'))) {
        node.textContent = admissionText;
      }
      if (isIndic && txt === 'घर' && (node.closest('nav') || node.closest('.breadcrumbs') || node.closest('.nav') || node.getAttribute('href') === '/')) {
        node.textContent = 'मुखपृष्ठ';
      }
    });
  };

  // Trigger Google Translate engine if present in page
  const triggerGoogleTranslate = (targetLang) => {
    setLanguageCookie(targetLang);

    const combo = document.querySelector('.goog-te-combo');
    if (combo) {
      if (combo.value !== targetLang) {
        combo.value = targetLang;
        combo.dispatchEvent(new Event('change'));
      }
      setTimeout(suppressGoogleToolbars, 100);
      setTimeout(suppressGoogleToolbars, 350);
      setTimeout(() => sanitizeIndicTerms(targetLang), 400);
    } else {
      let attempts = 0;
      const interval = setInterval(() => {
        attempts++;
        const c = document.querySelector('.goog-te-combo');
        if (c) {
          clearInterval(interval);
          if (c.value !== targetLang) {
            c.value = targetLang;
            c.dispatchEvent(new Event('change'));
          }
          setTimeout(suppressGoogleToolbars, 150);
          setTimeout(() => sanitizeIndicTerms(targetLang), 350);
        } else if (attempts > 12) {
          clearInterval(interval);
        }
      }, 250);
    }
  };

  // Clear any legacy test cookies on initial mount if starting in English
  useEffect(() => {
    if (lang === 'en') {
      localStorage.removeItem('cpls_lang');
      document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      const host = window.location.hostname;
      if (host && host !== 'localhost' && !host.match(/^127\.|^192\.|^10\./)) {
        document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${host};`;
      }
    }
  }, []);

  useEffect(() => {
    triggerGoogleTranslate(lang);
    sanitizeIndicTerms(lang);

    const observer = new MutationObserver(() => {
      suppressGoogleToolbars();
    });

    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [lang]);

  const switchLanguage = (newLang) => {
    if (['en', 'mr', 'hi'].includes(newLang)) {
      setLang(newLang);
      sessionStorage.setItem('cpls_lang', newLang);
      triggerGoogleTranslate(newLang);
    }
  };

  return (
    <LanguageContext.Provider
      value={{
        lang,
        langName: langDisplayNames[lang] || 'English',
        switchLanguage,
        t,
        isIndic: lang === 'mr' || lang === 'hi',
        homeLabel: lang === 'mr' || lang === 'hi' ? 'मुखपृष्ठ' : 'Home'
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
