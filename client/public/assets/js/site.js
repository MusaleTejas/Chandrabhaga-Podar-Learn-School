/**
 * Chandrabhaga Podar Learn School, Dindrud
 * Public Client-side Interactions & Responsive Navigation
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Navigation Elements
  const menuToggle = document.getElementById('menuToggle') || document.querySelector('.menu-toggle');
  const mainNav = document.getElementById('main-nav') || document.querySelector('#main-nav');
  const navBackdrop = document.getElementById('navBackdrop');
  const navGroups = document.querySelectorAll('.nav-group');

  function isMobileView() {
    return window.innerWidth <= 992;
  }

  function openMobileMenu() {
    if (!mainNav || !menuToggle) return;
    mainNav.classList.add('mobile-open');
    menuToggle.classList.add('is-active');
    menuToggle.setAttribute('aria-expanded', 'true');
    const label = menuToggle.querySelector('.menu-label');
    if (label) label.textContent = 'Close';
    if (navBackdrop) navBackdrop.classList.add('active');
    document.body.classList.add('nav-open');
  }

  function closeMobileMenu() {
    if (!mainNav || !menuToggle) return;
    mainNav.classList.remove('mobile-open');
    menuToggle.classList.remove('is-active');
    menuToggle.setAttribute('aria-expanded', 'false');
    const label = menuToggle.querySelector('.menu-label');
    if (label) label.textContent = 'Menu';
    if (navBackdrop) navBackdrop.classList.remove('active');
    document.body.classList.remove('nav-open');
  }

  function toggleMobileMenu() {
    if (!mainNav) return;
    if (mainNav.classList.contains('mobile-open')) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  }

  if (menuToggle) {
    menuToggle.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      toggleMobileMenu();
    });
  }

  if (navBackdrop) {
    navBackdrop.addEventListener('click', () => {
      closeMobileMenu();
    });
  }

  // 2. Navigation Dropdown Toggles (Desktop & Mobile accessible)
  navGroups.forEach(group => {
    const btn = group.querySelector('button');
    if (!btn) return;

    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();

      const currentlyOpen = group.classList.contains('open');

      // In mobile view, clicking toggles accordion and closes sibling accordions
      if (currentlyOpen) {
        group.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
        btn.blur(); // Remove focus to prevent mobile sticky focus bug
      } else {
        // Close siblings
        navGroups.forEach(other => {
          if (other !== group) {
            other.classList.remove('open');
            const otherBtn = other.querySelector('button');
            if (otherBtn) {
              otherBtn.setAttribute('aria-expanded', 'false');
              otherBtn.blur();
            }
          }
        });

        group.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // Close dropdowns when clicking outside (Desktop)
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-group')) {
      navGroups.forEach(g => {
        // If on mobile, keep current section open unless menu is closed
        if (!isMobileView()) {
          g.classList.remove('open');
          const btn = g.querySelector('button');
          if (btn) btn.setAttribute('aria-expanded', 'false');
        }
      });
    }

    // In mobile view, clicking outside the header & nav closes the mobile menu
    if (isMobileView() && mainNav && mainNav.classList.contains('mobile-open')) {
      if (!e.target.closest('.site-header') && !e.target.closest('.nav-backdrop')) {
        closeMobileMenu();
      }
    }
  });

  // When clicking any link inside the navigation drawer that leads to a page, close drawer
  if (mainNav) {
    const navLinks = mainNav.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (isMobileView()) {
          closeMobileMenu();
        }
      });
    });
  }

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      navGroups.forEach(g => {
        g.classList.remove('open');
        const btn = g.querySelector('button');
        if (btn) {
          btn.setAttribute('aria-expanded', 'false');
          btn.blur();
        }
      });
      closeMobileMenu();
      closeLightbox();
    }
  });

  // Handle window resizing: reset mobile states when resizing to desktop
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      if (!isMobileView() && mainNav && mainNav.classList.contains('mobile-open')) {
        closeMobileMenu();
      }
    }, 150);
  });

  // 3. Hero Video Autoplay Assurance
  const heroVideo = document.querySelector('.hero-video');
  if (heroVideo) {
    heroVideo.muted = true;
    const playPromise = heroVideo.play();
    if (playPromise !== undefined) {
      playPromise.catch(error => {
        // Browser policy prevented autoplay; keep poster active
        console.warn('Hero video autoplay prevented by browser policy:', error);
      });
    }
  }

  // 4. Image Lightbox Modal for Photo Gallery
  const galleryImages = document.querySelectorAll('[data-lightbox="gallery"]');
  let lightbox = document.querySelector('.lightbox-modal');

  if (galleryImages.length > 0 && !lightbox) {
    lightbox = document.createElement('div');
    lightbox.className = 'lightbox-modal';
    lightbox.setAttribute('role', 'dialog');
    lightbox.setAttribute('aria-modal', 'true');
    lightbox.setAttribute('aria-label', 'Image preview');
    lightbox.innerHTML = `
      <div class="lightbox-content">
        <button type="button" class="lightbox-close" aria-label="Close Preview">&times;</button>
        <img src="" alt="Enlarged gallery preview" id="lightbox-img">
      </div>
    `;
    document.body.appendChild(lightbox);

    const closeBtn = lightbox.querySelector('.lightbox-close');
    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  }

  function openLightbox(src, alt) {
    if (!lightbox) return;
    const img = lightbox.querySelector('#lightbox-img');
    if (img) {
      img.src = src;
      img.alt = alt || 'Preview';
    }
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('active');
    // Restore overflow unless mobile navigation is open
    if (!document.body.classList.contains('nav-open')) {
      document.body.style.overflow = '';
    }
  }

  galleryImages.forEach(img => {
    img.addEventListener('click', () => {
      openLightbox(img.src, img.alt);
    });
  });

  // 5. Clean Multilingual Language Switcher (English / मराठी / हिन्दी)
  const langToggleBtn = document.getElementById('langToggleBtn');
  const navLangDropdown = document.querySelector('.nav-lang-dropdown');
  const activeLangText = document.getElementById('activeLangText');
  const langSelectItems = document.querySelectorAll('.lang-select-item');
  const savedLang = localStorage.getItem('cpls_lang') || 'en';

  const langDisplayNames = {
    'en': 'English',
    'mr': 'मराठी',
    'hi': 'हिन्दी'
  };

  function updateActiveLangUI(lang) {
    if (activeLangText) {
      activeLangText.textContent = langDisplayNames[lang] || 'English';
    }
    langSelectItems.forEach(item => {
      const itemLang = item.getAttribute('data-lang');
      if (itemLang === lang) {
        item.classList.add('active');
        item.setAttribute('aria-selected', 'true');
      } else {
        item.classList.remove('active');
        item.setAttribute('aria-selected', 'false');
      }
    });
    sanitizeHomeLabels(lang);
  }

  function sanitizeHomeLabels(lang) {
    const activeLanguage = lang || localStorage.getItem('cpls_lang') || 'en';
    const isIndic = activeLanguage === 'mr' || activeLanguage === 'hi';
    const homeLabel = isIndic ? 'मुखपृष्ठ' : 'Home';

    // 1. Explicit home-text elements
    document.querySelectorAll('.home-text').forEach(el => {
      el.textContent = homeLabel;
    });

    // 2. Intercept any other elements where "Home" was machine-translated into "घर"
    if (isIndic) {
      document.querySelectorAll('a, span, font').forEach(node => {
        const txt = node.textContent.trim();
        if (txt === 'घर' && (node.closest('nav') || node.closest('.breadcrumbs') || node.closest('.nav') || node.getAttribute('href') === 'index.php')) {
          node.textContent = 'मुखपृष्ठ';
        }
      });
    }
  }

  updateActiveLangUI(savedLang);

  // Toggle dropdown on button click
  if (langToggleBtn && navLangDropdown) {
    langToggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = navLangDropdown.classList.toggle('open');
      langToggleBtn.setAttribute('aria-expanded', String(isOpen));
    });
  }

  // Close language dropdown on outside click
  document.addEventListener('click', (e) => {
    if (navLangDropdown && !navLangDropdown.contains(e.target)) {
      navLangDropdown.classList.remove('open');
      if (langToggleBtn) langToggleBtn.setAttribute('aria-expanded', 'false');
    }
  });

  // Function to suppress any Google toolbar banners and reset body top
  function suppressGoogleTranslateBanners() {
    document.body.style.top = '0px';
    const elementsToHide = document.querySelectorAll(
      'body > .skiptranslate, iframe.goog-te-banner-frame, .goog-te-balloon-frame, #goog-gt-tt, #goog-gt-vt, div.skiptranslate'
    );
    elementsToHide.forEach(el => {
      el.style.display = 'none';
      el.style.visibility = 'hidden';
      el.style.height = '0px';
      el.style.opacity = '0';
      el.style.position = 'absolute';
      el.style.left = '-9999px';
    });
  }

  // Active observer to permanently kill Google toolbar insertion & enforce proper terms
  const bannerKillerObserver = new MutationObserver(() => {
    suppressGoogleTranslateBanners();
    sanitizeHomeLabels();
  });
  bannerKillerObserver.observe(document.body, { childList: true, subtree: false });

  function setLanguageCookie(lang) {
    const cookieVal = lang === 'en' ? '/en/en' : `/en/${lang}`;
    document.cookie = `googtrans=${cookieVal}; path=/`;
    document.cookie = `googtrans=${cookieVal}; path=/; domain=${location.hostname}`;
  }

  function applyLanguage(lang) {
    localStorage.setItem('cpls_lang', lang);
    updateActiveLangUI(lang);
    if (navLangDropdown) {
      navLangDropdown.classList.remove('open');
      if (langToggleBtn) langToggleBtn.setAttribute('aria-expanded', 'false');
    }

    setLanguageCookie(lang);

    const combo = document.querySelector('.goog-te-combo');
    if (combo) {
      combo.value = lang;
      combo.dispatchEvent(new Event('change'));
      setTimeout(suppressGoogleTranslateBanners, 100);
      setTimeout(suppressGoogleTranslateBanners, 400);
    } else {
      // If combo not in DOM yet, initialize script and trigger
      loadGoogleTranslateScript(() => {
        setTimeout(() => {
          const c = document.querySelector('.goog-te-combo');
          if (c) {
            c.value = lang;
            c.dispatchEvent(new Event('change'));
          } else {
            location.reload();
          }
          setTimeout(suppressGoogleTranslateBanners, 200);
        }, 300);
      });
    }
  }

  langSelectItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const targetLang = item.getAttribute('data-lang');
      if (targetLang) {
        applyLanguage(targetLang);
      }
    });
  });

  function loadGoogleTranslateScript(callback) {
    if (window.googleTranslateLoaded) {
      if (callback) callback();
      return;
    }
    window.googleTranslateInit = function() {
      new google.translate.TranslateElement({
        pageLanguage: 'en',
        includedLanguages: 'en,mr,hi',
        autoDisplay: false
      }, 'google_translate_element');
      window.googleTranslateLoaded = true;
      suppressGoogleTranslateBanners();
      if (callback) callback();
    };

    const s = document.createElement('script');
    s.type = 'text/javascript';
    s.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateInit';
    document.body.appendChild(s);
  }

  // Load Google Translate script if non-English preference was chosen
  if (savedLang !== 'en') {
    setLanguageCookie(savedLang);
    loadGoogleTranslateScript(() => {
      setTimeout(() => {
        const combo = document.querySelector('.goog-te-combo');
        if (combo) {
          combo.value = savedLang;
          combo.dispatchEvent(new Event('change'));
        }
        setTimeout(suppressGoogleTranslateBanners, 200);
      }, 400);
    });
  } else {
    // Preload on hover over language button
    if (langToggleBtn) {
      langToggleBtn.addEventListener('mouseenter', () => loadGoogleTranslateScript(), { once: true });
      langToggleBtn.addEventListener('touchstart', () => loadGoogleTranslateScript(), { once: true });
    }
  }
});
