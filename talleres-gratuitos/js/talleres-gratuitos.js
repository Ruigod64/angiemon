/* ══════════════════════════════════════════════════
   AngieMon — Talleres Gratuitos · Página principal
   Animación del hero · Inicialización general
   ══════════════════════════════════════════════════ */

(() => {
  'use strict';

  /* ── Animación de entrada del hero ──────────────── */
  function initHeroEntrance() {
    const items = document.querySelectorAll('.talleres-hero .section-label, .talleres-hero h1');
    if (!items.length) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    items.forEach((el, i) => {
      el.style.opacity    = '0';
      el.style.transform  = 'translateY(22px)';
      el.style.transition = `opacity 0.75s ease ${i * 0.15}s, transform 0.75s ease ${i * 0.15}s`;

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          el.style.opacity   = '1';
          el.style.transform = 'translateY(0)';
        });
      });
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initHeroEntrance();
  });
})();
