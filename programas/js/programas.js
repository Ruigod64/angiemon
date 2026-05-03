/* ══════════════════════════════════════════════════
   AngieMon — programas.js
   Comportamiento exclusivo de /programas
   SOLID: Single-responsibility — sólo lógica propia
          de esta página.  Depende de animaciones.js
          para reveal; no duplica su funcionalidad.
   ══════════════════════════════════════════════════ */

(() => {
  'use strict';

  /* ── Stagger de entrada en el grid de programas ── */
  function initGridStagger() {
    const cards = document.querySelectorAll('.prog-grid .programa-card');
    if (!cards.length) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          const card = entry.target;
          const idx  = Array.from(cards).indexOf(card);
          card.style.transitionDelay = `${idx * 80}ms`;
          card.classList.add('revealed');
          observer.unobserve(card);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

    cards.forEach(card => {
      card.classList.add('reveal');
      observer.observe(card);
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initGridStagger();
  });
})();
