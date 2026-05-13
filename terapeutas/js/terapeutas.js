/* ══════════════════════════════════════════════════
   AngieMon — Terapeutas · GSAP Animations
   ══════════════════════════════════════════════════ */

(function () {
  'use strict';

  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  gsap.registerPlugin(ScrollTrigger);

  /* ── Hero ──────────────────────────────────────── */
  gsap.from(['.tp-hero__title', '.tp-hero__subtitle', '.tp-hero__desc'], {
    scrollTrigger: { trigger: '.tp-hero', start: 'top 80%' },
    opacity: 0,
    y: 40,
    ease: 'power3.out',
    duration: 0.9,
    stagger: 0.14,
  });

  /* ── Intro pillars ─────────────────────────────── */
  gsap.from('.tp-pillar', {
    scrollTrigger: { trigger: '.tp-pillars', start: 'top 80%' },
    opacity: 0,
    y: 45,
    ease: 'power3.out',
    duration: 0.8,
    stagger: 0.14,
  });

  /* ── Cards: solo translateY, sin opacity (visible por CSS) ── */
  document.querySelectorAll('.tp-card').forEach((card, i) => {
    gsap.from(card, {
      scrollTrigger: { trigger: card, start: 'top 90%' },
      y: 45,
      ease: 'power3.out',
      duration: 0.8,
      delay: (i % 3) * 0.08,
    });
  });

  /* ── CTA ───────────────────────────────────────── */
  gsap.from('.tp-cta__inner > *', {
    scrollTrigger: { trigger: '.tp-cta', start: 'top 82%' },
    opacity: 0,
    y: 30,
    ease: 'power2.out',
    duration: 0.8,
    stagger: 0.12,
  });

})();
