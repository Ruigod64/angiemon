/* ══════════════════════════════════════════════════
   AngieMon — Podcast · Secretos del Corazón
   Cards stagger reveal con GSAP + fallback reveal
   ══════════════════════════════════════════════════ */

(() => {
  'use strict';

  function initCardStagger() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    gsap.registerPlugin(ScrollTrigger);

    /* Hero entrance */
    const heroEls = document.querySelectorAll(
      '.podcast-hero__show, .podcast-hero__title, .podcast-hero__desc, .podcast-hero__cta'
    );
    if (heroEls.length) {
      gsap.from(heroEls, {
        y: 28,
        opacity: 0,
        duration: 0.85,
        ease: 'power3.out',
        stagger: 0.14,
        delay: 0.25,
      });
    }

    /* Cards stagger en bloques de 4 */
    const cards = document.querySelectorAll('.ep-card');
    if (!cards.length) return;

    gsap.from(cards, {
      scrollTrigger: {
        trigger: '.podcast-grid',
        start: 'top 82%',
        once: true,
      },
      y: 36,
      opacity: 0,
      duration: 0.65,
      ease: 'power2.out',
      stagger: {
        each: 0.07,
        grid: 'auto',
        from: 'start',
      },
    });
  }

  document.addEventListener('DOMContentLoaded', initCardStagger);
})();
