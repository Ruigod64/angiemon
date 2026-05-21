/* ══════════════════════════════════════════════════
   AngieMon — Talleres Gratuitos · Clases (Videos)
   Thumbnail façade HD + click-to-play + stagger reveal
   ══════════════════════════════════════════════════ */

(() => {
  'use strict';

  /* ── 1. Click en thumbnail → carga iframe con autoplay ── */
  function initVideoFacades() {
    document.querySelectorAll('.yt-facade').forEach(facade => {
      facade.addEventListener('click', () => {
        const videoId = facade.dataset.videoId;
        if (!videoId) return;

        const iframe = document.createElement('iframe');
        iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
        iframe.title = facade.querySelector('img')?.alt ?? '';
        iframe.setAttribute('frameborder', '0');
        iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
        iframe.setAttribute('allowfullscreen', '');
        iframe.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;border:none;';

        const wrap = facade.parentElement;
        wrap.innerHTML = '';
        wrap.appendChild(iframe);
      });
    });
  }

  /* ── 2. Stagger reveal para cada .taller-clase ────────── */
  function initClasesReveal() {
    const clases = document.querySelectorAll('.taller-clase');
    if (!clases.length) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      clases.forEach(el => el.classList.add('visible'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        const el    = entry.target;
        const index = [...clases].indexOf(el);

        setTimeout(() => el.classList.add('visible'), (index % 3) * 100);
        observer.unobserve(el);
      });
    }, {
      threshold: 0.08,
      rootMargin: '0px 0px -20px 0px',
    });

    clases.forEach(el => observer.observe(el));
  }

  document.addEventListener('DOMContentLoaded', () => {
    initVideoFacades();
    initClasesReveal();
  });
})();
