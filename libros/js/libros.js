/* ══════════════════════════════════════════════════
   AngieMon · Libros — Animaciones
   GSAP: hero entrance  |  IntersectionObserver: libros
   ══════════════════════════════════════════════════ */

(function () {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobile = window.matchMedia('(max-width: 600px)').matches;

  /* ── Hero con GSAP ──────────────────────────────── */
  if (typeof gsap !== 'undefined' && !prefersReducedMotion) {
    gsap.set(
      '.hero__label, .hero__ornament, .hero__title, .hero__subtitle, .hero__scroll',
      { opacity: 0 }
    );

    gsap.timeline({ delay: 0.25 })
      .to('.hero__label',    { opacity: 1, y: 0, duration: 0.8,  ease: 'power3.out', clearProps: 'all' })
      .to('.hero__ornament', { opacity: 1, scaleX: 1, duration: 0.7, ease: 'power2.inOut', transformOrigin: 'center', clearProps: 'all' }, '-=0.3')
      .to('.hero__title',    { opacity: 1, y: 0, duration: 1.1,  ease: 'power3.out', clearProps: 'all' }, '-=0.4')
      .to('.hero__subtitle', { opacity: 1, y: 0, duration: 0.9,  ease: 'power3.out', clearProps: 'all' }, '-=0.5')
      .to('.hero__scroll',   { opacity: 1, y: 0, duration: 0.75, ease: 'power2.out', clearProps: 'all' }, '-=0.4');

    /* Sin parallax: imagen se muestra completa */
  }

  if (prefersReducedMotion) return;

  /* ── Libros: reveal con IntersectionObserver ────── */
  document.querySelectorAll('.libro-item').forEach(item => {
    const isReverse = item.classList.contains('libro-item--reverse');
    const imgWrap   = item.querySelector('.libro-item__img-wrap');
    const content   = item.querySelector('.libro-item__content');
    if (!imgWrap || !content) return;

    /* Clase de dirección según orientación y plataforma */
    if (isMobile) {
      imgWrap.classList.add('anim-from-bottom');
      Array.from(content.children).forEach((el, i) => {
        el.classList.add('anim-from-bottom');
        el.style.transitionDelay = `${0.12 + i * 0.07}s`;
      });
    } else {
      imgWrap.classList.add(isReverse ? 'anim-from-right' : 'anim-from-left');
      Array.from(content.children).forEach((el, i) => {
        el.classList.add(isReverse ? 'anim-from-left' : 'anim-from-right');
        el.style.transitionDelay = `${0.18 + i * 0.07}s`;
      });
    }
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const item    = entry.target;
      const imgWrap = item.querySelector('.libro-item__img-wrap');
      const content = item.querySelector('.libro-item__content');

      imgWrap?.classList.add('anim-visible');
      Array.from(content?.children ?? []).forEach(el => el.classList.add('anim-visible'));

      /* Limpiar delay tras animación para no afectar hover */
      setTimeout(() => {
        Array.from(content?.children ?? []).forEach(el => el.style.transitionDelay = '');
      }, 1400);

      observer.unobserve(item);
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.libro-item').forEach(item => observer.observe(item));
})();
