/* ══════════════════════════════════════════════════
   AngieMon — Talleres Gratuitos · Features GSAP
   Card entra desde la izquierda · Texto desde la derecha
   Depende de: gsap@3.12.5, ScrollTrigger
   ══════════════════════════════════════════════════ */

(() => {
  'use strict';

  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  gsap.registerPlugin(ScrollTrigger);

  document.querySelectorAll('.taller-feature').forEach(article => {
    const card    = article.querySelector('.taller-feature__card');
    const num     = article.querySelector('.taller-feature__num');
    const label   = article.querySelector('.taller-feature__body .section-label');
    const title   = article.querySelector('.taller-feature__title');
    const desc    = article.querySelector('.taller-feature__desc');
    const cta     = article.querySelector('.taller-feature__cta');

    const textEls = [num, label, title, desc, cta].filter(Boolean);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: article,
        start: 'top 80%',
        once: true,
      },
    });

    // Card entra desde la izquierda con fade
    tl.from(card, {
      x: -55,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
    })

    // Texto entra desde la derecha en cascada
    .from(textEls, {
      x: 35,
      opacity: 0,
      duration: 0.7,
      ease: 'power2.out',
      stagger: 0.1,
    }, '-=0.65');
  });

})();
