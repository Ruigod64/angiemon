/* ══════════════════════════════════════════════════
   AngieMon — main.js
   Smooth scroll · Footer year · Image fallback
   Nav → ver js/nav.js
   ══════════════════════════════════════════════════ */

(() => {
  'use strict';

  /* ── Smooth scroll para enlaces de ancla ─────── */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', e => {
        const id = link.getAttribute('href').slice(1);
        const target = document.getElementById(id);
        if (!target) return;

        e.preventDefault();
        const headerH = parseInt(
          getComputedStyle(document.documentElement).getPropertyValue('--header-h'),
          10
        ) || 72;

        const top = target.getBoundingClientRect().top + window.scrollY - headerH;
        window.scrollTo({ top, behavior: 'smooth' });
      });
    });
  }

  /* ── Año dinámico en footer ──────────────────── */
  function initYear() {
    const el = document.getElementById('year');
    if (el) el.textContent = new Date().getFullYear();
  }

  /* ── Fallback para imágenes rotas ────────────── */
  function initImgFallback() {
    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
      img.addEventListener('error', () => {
        img.style.display = 'none';
      });
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initSmoothScroll();
    initYear();
    initImgFallback();
  });
})();
