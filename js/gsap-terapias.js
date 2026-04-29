/* ══════════════════════════════════════════════════
   AngieMon — GSAP Animations: Terapias Online
   ══════════════════════════════════════════════════ */

(function () {
  'use strict';

  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  gsap.registerPlugin(ScrollTrigger);

  if (!document.querySelector('.tol')) return;

  /* ── 1. Header: label → heading → intro ─────── */
  gsap.from(['.tol .section-label', '.tol__heading', '.tol__intro'], {
    scrollTrigger: { trigger: '.tol__header', start: 'top 82%' },
    opacity: 0,
    y: 40,
    ease: 'power3.out',
    duration: 0.9,
    stagger: 0.14,
  });

  /* ── 2. Divider + subtítulo ──────────────────── */
  gsap.from(['.tol__rule', '.tol__sub'], {
    scrollTrigger: { trigger: '.tol__rule', start: 'top 88%' },
    opacity: 0,
    scaleX: 0.5,
    ease: 'power2.out',
    duration: 0.7,
    stagger: 0.1,
    transformOrigin: 'center',
  });

  /* ── 3. Service cards: stagger ───────────────── */
  gsap.from('.tol-card--anim', {
    scrollTrigger: { trigger: '.tol__servicios', start: 'top 80%' },
    opacity: 0,
    y: 55,
    scale: 0.97,
    ease: 'power3.out',
    duration: 0.85,
    stagger: 0.13,
  });

  /* ── 4. "¿Por qué?" heading ──────────────────── */
  gsap.from('.tol__razones-heading', {
    scrollTrigger: { trigger: '.tol__razones', start: 'top 82%' },
    opacity: 0,
    y: 35,
    ease: 'power2.out',
    duration: 0.8,
  });

  /* ── 5. Reasons: alternate left/right ────────── */
  document.querySelectorAll('.tol-razon--anim').forEach((el, i) => {
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: 'top 88%' },
      opacity: 0,
      x: i % 2 === 0 ? -30 : 30,
      ease: 'power3.out',
      duration: 0.75,
    });
  });

  /* ── 6. Quote ────────────────────────────────── */
  gsap.from('.tol-quote--anim', {
    scrollTrigger: { trigger: '.tol__quote', start: 'top 84%' },
    opacity: 0,
    y: 30,
    scale: 0.97,
    ease: 'power2.out',
    duration: 1,
    transformOrigin: 'center',
  });

  /* ── 7. CTA ──────────────────────────────────── */
  gsap.from('.tol__cta', {
    scrollTrigger: { trigger: '.tol__cta', start: 'top 88%' },
    opacity: 0,
    y: 35,
    ease: 'power2.out',
    duration: 0.85,
  });

  /* ── 8. Glow parallax ───────────────────────── */
  gsap.to('.tol__glow', {
    scrollTrigger: {
      trigger: '.tol',
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1.5,
    },
    y: 120,
    ease: 'none',
  });

})();
