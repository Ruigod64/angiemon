/* ══════════════════════════════════════════════════
   AngieMon — programas.js
   Comportamiento exclusivo de /programas
   ══════════════════════════════════════════════════ */

(() => {
  'use strict';

  /* ── Lightbox ─────────────────────────────────── */
  function initLightbox() {
    const lightbox  = document.getElementById('lightbox');
    const lb_img    = document.getElementById('lightboxImg');
    const lb_close  = document.getElementById('lightboxClose');
    const lb_back   = document.getElementById('lightboxBackdrop');
    if (!lightbox) return;

    function open(img) {
      lb_img.src = img.src;
      lb_img.alt = img.alt;
      lightbox.hidden = false;
      document.body.style.overflow = 'hidden';
      lb_close.focus();
    }

    function close() {
      lightbox.hidden = true;
      lb_img.src = '';
      document.body.style.overflow = '';
    }

    document.querySelectorAll('.prog-card__media').forEach(media => {
      media.addEventListener('click', () => {
        const img = media.querySelector('.prog-card__img');
        if (img) open(img);
      });
    });

    lb_close.addEventListener('click', close);
    lb_back.addEventListener('click', close);

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && !lightbox.hidden) close();
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initLightbox();
  });
})();
