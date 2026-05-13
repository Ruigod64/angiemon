/* ══════════════════════════════════════════════════
   AngieMon — tp-cards-desktop.js
   Activa animación slide-in en las cards
   horizontales del grid de terapeutas (PC ≥ 860px).
   Agrega .card-revealed vía IntersectionObserver.
   Sin dependencia de GSAP.
   ══════════════════════════════════════════════════ */

(() => {
  'use strict';

  const BREAKPOINT = 860;

  function initSlideCards() {
    if (window.innerWidth < BREAKPOINT) return;

    const cards = document.querySelectorAll('.tp-card');
    if (!cards.length) return;

    /* Sin animación si el usuario la desactiva */
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      cards.forEach(c => c.classList.add('card-revealed'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('card-revealed');
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    cards.forEach(card => observer.observe(card));
  }

  document.addEventListener('DOMContentLoaded', initSlideCards);
})();
