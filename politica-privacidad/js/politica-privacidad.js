/* ══════════════════════════════════════════════════
   Política de Privacidad — JS
   Nav scroll · TOC activo · Reveal
   ══════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── Sticky header on scroll ── */
  const header = document.getElementById('site-header');
  if (header) {
    const onScroll = () =>
      header.classList.toggle('site-header--scrolled', window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ── Mobile nav ── */
  const toggle  = document.getElementById('nav-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  if (toggle && mobileNav) {
    toggle.addEventListener('click', () => {
      const isOpen = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!isOpen));
      mobileNav.setAttribute('aria-hidden',  String(isOpen));
      document.body.style.overflow = isOpen ? '' : 'hidden';
    });

    mobileNav.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => {
        toggle.setAttribute('aria-expanded', 'false');
        mobileNav.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      })
    );
  }

  /* ── Reveal on scroll ── */
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    const ro = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('revealed');
          ro.unobserve(e.target);
        }
      }),
      { threshold: 0.12 }
    );
    reveals.forEach(el => ro.observe(el));
  }

  /* ── TOC active link on scroll ── */
  const tocLinks  = document.querySelectorAll('.pp-toc__link');
  const sections  = document.querySelectorAll('.pp-section[id]');

  if (tocLinks.length && sections.length) {
    const setActive = id => {
      tocLinks.forEach(link => {
        const isActive = link.getAttribute('href') === '#' + id;
        link.classList.toggle('active', isActive);
      });
    };

    const io = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      {
        rootMargin: '-30% 0px -60% 0px',
        threshold: 0,
      }
    );

    sections.forEach(s => io.observe(s));

    /* smooth scroll on TOC click */
    tocLinks.forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  }
})();
