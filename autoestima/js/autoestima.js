gsap.registerPlugin(ScrollTrigger);

const noMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let inIframe = false;
try { inIframe = window.self !== window.top; } catch (_) { inIframe = true; }

if (noMotion || inIframe) {
  document.querySelectorAll('.gs-up,.gs-fade,.gs-left,.gs-right,.gs-scale,.modulo-card').forEach(el => {
    el.style.opacity = '1';
    el.style.transform = 'none';
  });
  ['hero-eyebrow','hero-title','hero-sub','hero-actions','wa-btn'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.opacity = '1';
  });
} else {

  // Hero entrance
  gsap.timeline({ delay: 0.1 })
    .to('#hero-eyebrow', { opacity: 1, duration: 0.7, ease: 'power2.out' })
    .to('#hero-title',   { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }, '-=0.3')
    .to('#hero-sub',     { opacity: 1, duration: 0.7, ease: 'power2.out' }, '-=0.4')
    .to('#hero-actions', { opacity: 1, duration: 0.6, ease: 'power2.out' }, '-=0.3')
    .to('#wa-btn',       { opacity: 1, duration: 0.5 }, '-=0.2');

  // gs-up
  gsap.utils.toArray('.gs-up').forEach((el, i) => {
    gsap.to(el, {
      opacity: 1, y: 0, duration: 0.85, ease: 'power3.out',
      delay: (i % 4) * 0.07,
      scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
    });
  });

  // gs-fade
  gsap.utils.toArray('.gs-fade').forEach(el => {
    gsap.to(el, {
      opacity: 1, duration: 0.9, ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
    });
  });

  // gs-left
  gsap.utils.toArray('.gs-left').forEach(el => {
    gsap.to(el, {
      opacity: 1, x: 0, duration: 0.9, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
    });
  });

  // gs-right — stagger por índice
  gsap.utils.toArray('.gs-right').forEach((el, i) => {
    gsap.to(el, {
      opacity: 1, x: 0, duration: 0.8, ease: 'power3.out',
      delay: i * 0.06,
      scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
    });
  });

  // gs-scale — materiales cards
  gsap.utils.toArray('.gs-scale').forEach((el, i) => {
    gsap.to(el, {
      opacity: 1, scale: 1, duration: 0.7, ease: 'back.out(1.5)',
      delay: (i % 3) * 0.1,
      scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
    });
  });

  // Módulos — batch stagger
  ScrollTrigger.batch('.modulo-card', {
    start: 'top 88%',
    onEnter: batch => gsap.to(batch, {
      opacity: 1, y: 0, duration: 0.85, ease: 'power3.out', stagger: 0.13,
    }),
  });

  // Node dot micro-interaction
  document.querySelectorAll('.modulo-card').forEach(card => {
    const dot = card.querySelector('.node-dot');
    if (!dot) return;
    card.addEventListener('mouseenter', () => gsap.to(dot, { scale: 1.2, duration: 0.22, ease: 'power2.out' }));
    card.addEventListener('mouseleave', () => gsap.to(dot, { scale: 1,   duration: 0.22, ease: 'power2.inOut' }));
  });

}
