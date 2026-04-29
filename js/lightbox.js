/* ══════════════════════════════════════════════════
   AngieMon — Lightbox para cards de programas
   ══════════════════════════════════════════════════ */

(function () {
  'use strict';

  const lb        = document.getElementById('lightbox');
  if (!lb) return;

  const backdrop  = lb.querySelector('.lightbox__backdrop');
  const closeBtn  = lb.querySelector('.lightbox__close');
  const img       = lb.querySelector('.lightbox__img');
  const caption   = lb.querySelector('.lightbox__caption');

  /* ── Open ─────────────────────────────────────── */
  function open(trigger) {
    const cardImg   = trigger.querySelector('img');
    img.src         = cardImg.src;
    img.alt         = cardImg.alt;
    caption.textContent = trigger.closest('.programa-card')
      ?.querySelector('.programa-card__title')?.textContent ?? '';

    lb.setAttribute('aria-hidden', 'false');
    lb.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }

  /* ── Close ────────────────────────────────────── */
  function close() {
    lb.classList.remove('is-open');
    lb.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    img.src = '';
  }

  /* ── Triggers ─────────────────────────────────── */
  document.querySelectorAll('.lb-trigger').forEach(el => {
    el.addEventListener('click', () => open(el));
  });

  closeBtn.addEventListener('click', close);
  backdrop.addEventListener('click', close);

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && lb.classList.contains('is-open')) close();
  });

})();
