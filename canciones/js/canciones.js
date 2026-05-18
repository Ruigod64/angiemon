/* ══════════════════════════════════════════════════
   AngieMon · Canciones — Animaciones
   IntersectionObserver para cards y encabezado
   ══════════════════════════════════════════════════ */

(function () {
  'use strict';

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  /* Añadir clase inicial a elementos que se revelarán */
  document.querySelectorAll('.canciones-intro > *, .cancion-card').forEach((el, i) => {
    el.classList.add('anim-from-bottom');
    el.style.transitionDelay = `${i * 0.08}s`;
  });

  /* IntersectionObserver */
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('anim-visible');
      setTimeout(() => { entry.target.style.transitionDelay = ''; }, 1000);
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.canciones-intro > *, .cancion-card').forEach(el => {
    observer.observe(el);
  });
})();
