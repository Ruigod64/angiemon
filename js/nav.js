/* ══════════════════════════════════════════════════
   AngieMon — nav.js
   Header scroll state · Mobile nav toggle
   ══════════════════════════════════════════════════ */

(() => {
  'use strict';

  /* ── 1. Header scroll state ──────────────────── */
  function initHeader() {
    const header = document.querySelector('.site-header');
    if (!header) return;

    function update() {
      header.classList.toggle('site-header--scrolled', window.scrollY > 40);
    }

    update();
    window.addEventListener('scroll', update, { passive: true });
  }

  /* ── 2. Mobile nav toggle ────────────────────── */
  function initMobileNav() {
    const toggle    = document.querySelector('.nav__toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    if (!toggle || !mobileNav) return;

    function open() {
      toggle.setAttribute('aria-expanded', 'true');
      toggle.setAttribute('aria-label', 'Cerrar menú de navegación');
      mobileNav.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }

    function close() {
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Abrir menú de navegación');
      mobileNav.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    toggle.addEventListener('click', () => {
      toggle.getAttribute('aria-expanded') === 'true' ? close() : open();
    });

    /* Close on link click */
    mobileNav.querySelectorAll('.mobile-nav__link').forEach(link => {
      link.addEventListener('click', close);
    });

    /* Close on Escape */
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        close();
        toggle.focus();
      }
    });

    /* Close on resize to desktop */
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 768 && toggle.getAttribute('aria-expanded') === 'true') {
        close();
      }
    }, { passive: true });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initHeader();
    initMobileNav();
  });
})();
