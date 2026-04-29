/* ══════════════════════════════════════════════════
   AngieMon — Psicoterapia Image Carousel
   Crossfade · Ken Burns · Autoplay · Touch/Keyboard
   ══════════════════════════════════════════════════ */

(function () {
  'use strict';

  const carousel = document.querySelector('.psi-carousel');
  if (!carousel) return;

  const slides  = Array.from(carousel.querySelectorAll('.psi-carousel__slide'));
  const dots    = Array.from(carousel.querySelectorAll('.psi-carousel__dot'));
  const btnPrev = carousel.querySelector('.psi-carousel__btn--prev');
  const btnNext = carousel.querySelector('.psi-carousel__btn--next');

  let current  = 0;
  let timer    = null;
  const INTERVAL = 4800;
  const reduced  = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── Core: go to slide index ──────────────────── */
  function goTo(idx) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    dots[current].setAttribute('aria-selected', 'false');

    current = ((idx % slides.length) + slides.length) % slides.length;

    slides[current].classList.add('active');
    dots[current].classList.add('active');
    dots[current].setAttribute('aria-selected', 'true');
  }

  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }

  /* ── Timer ────────────────────────────────────── */
  function startTimer() {
    clearInterval(timer);
    if (!reduced) timer = setInterval(next, INTERVAL);
  }

  function stopTimer() { clearInterval(timer); }

  /* ── Controls ─────────────────────────────────── */
  btnNext.addEventListener('click', () => { next(); startTimer(); });
  btnPrev.addEventListener('click', () => { prev(); startTimer(); });

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => { goTo(i); startTimer(); });
  });

  /* ── Keyboard ─────────────────────────────────── */
  carousel.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') { next(); startTimer(); }
    if (e.key === 'ArrowLeft')  { prev(); startTimer(); }
  });

  /* ── Pause on hover ───────────────────────────── */
  carousel.addEventListener('mouseenter', stopTimer);
  carousel.addEventListener('mouseleave', startTimer);

  /* ── Touch swipe ──────────────────────────────── */
  let touchX = 0;
  carousel.addEventListener('touchstart', e => {
    touchX = e.touches[0].clientX;
  }, { passive: true });

  carousel.addEventListener('touchend', e => {
    const diff = touchX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      diff > 0 ? next() : prev();
      startTimer();
    }
  }, { passive: true });

  /* ── Pause when tab hidden ────────────────────── */
  document.addEventListener('visibilitychange', () => {
    document.hidden ? stopTimer() : startTimer();
  });

  /* ── Init ─────────────────────────────────────── */
  startTimer();

})();
