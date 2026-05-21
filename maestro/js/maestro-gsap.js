/* AngieMon — Maestro · GSAP Animations */
(() => {
  'use strict';
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  gsap.registerPlugin(ScrollTrigger);

  // Hero entrance (immediate, no scroll trigger)
  const heroItems = document.querySelectorAll('.maestro-hero__label, .maestro-hero__title, .maestro-hero__subtitle');
  if (heroItems.length) {
    gsap.from(heroItems, {
      y: 30, opacity: 0, duration: 0.85, ease: 'power3.out', stagger: 0.15, delay: 0.2
    });
  }

  // Book cards stagger on scroll
  const cards = document.querySelectorAll('.maestro-card');
  if (cards.length) {
    gsap.from(cards, {
      scrollTrigger: { trigger: '.maestro-cards', start: 'top 80%', once: true },
      y: 45, opacity: 0, duration: 0.75, ease: 'power2.out', stagger: 0.14
    });
  }

  // Collection section
  const colImg = document.querySelector('.maestro-coleccion__img');
  const colBody = document.querySelector('.maestro-coleccion__body');
  if (colImg && colBody) {
    const tl = gsap.timeline({ scrollTrigger: { trigger: '.maestro-coleccion', start: 'top 78%', once: true } });
    tl.from(colImg, { x: -50, opacity: 0, duration: 0.95, ease: 'power3.out' })
      .from(colBody.children, { x: 35, opacity: 0, duration: 0.7, ease: 'power2.out', stagger: 0.1 }, '-=0.6');
  }
})();
