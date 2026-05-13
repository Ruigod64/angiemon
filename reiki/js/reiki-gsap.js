/* ══════════════════════════════════════════════════
   AngieMon Reiki — GSAP Animations
   Requires: GSAP + ScrollTrigger
   ══════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* prefers-reduced-motion */
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── Scroll progress bar ─────────────────────── */
  const progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress';
  document.body.prepend(progressBar);

  gsap.to(progressBar, {
    width: '100%',
    ease: 'none',
    scrollTrigger: {
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.3,
    },
  });

  /* ── Energy orb en hero ──────────────────────── */
  const heroOrb = document.createElement('div');
  heroOrb.className = 'hero__light-orb';
  const hero = document.querySelector('.hero');
  if (hero) hero.appendChild(heroOrb);

  /* ── Hero parallax ───────────────────────────── */
  if (!prefersReduced) {
    const heroVideo = document.querySelector('.hero__video');
    if (heroVideo) {
      gsap.to(heroVideo, {
        yPercent: 18,
        ease: 'none',
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2,
        },
      });
    }

    /* hero content — fade y parallax leve */
    const heroContent = document.querySelector('.hero__content');
    if (heroContent) {
      gsap.to(heroContent, {
        yPercent: -12,
        opacity: 0.2,
        ease: 'none',
        scrollTrigger: {
          trigger: hero,
          start: 'center top',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }
  }

  /* ── Hero entrada ────────────────────────────── */
  document.body.classList.add('gsap-ready');

  const heroEyebrow = document.querySelector('.hero__eyebrow');
  const heroTitle   = document.querySelector('.hero__title');
  const heroSub     = document.querySelector('.hero__subtitle');
  const heroActions = document.querySelector('.hero__actions');
  const heroScroll  = document.querySelector('.hero__scroll');

  if (!prefersReduced && heroTitle) {
    const tl = gsap.timeline({ delay: 0.2 });
    tl.fromTo(heroEyebrow, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }, 0)
      .fromTo(heroTitle,   { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1.1, ease: 'power3.out' }, 0.2)
      .fromTo(heroSub,     { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1.0, ease: 'power3.out' }, 0.45)
      .fromTo(heroActions, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }, 0.65)
      .fromTo(heroScroll,  { opacity: 0 },        { opacity: 1, duration: 1.2, ease: 'power2.out' }, 1.1);
  }

  /* ── Reveal universal con ScrollTrigger ──────── */
  const revealEls = document.querySelectorAll('.reveal');

  if (!prefersReduced) {
    revealEls.forEach((el) => {
      const delay = el.classList.contains('reveal-delay-1') ? 0.10
                  : el.classList.contains('reveal-delay-2') ? 0.20
                  : el.classList.contains('reveal-delay-3') ? 0.30
                  : el.classList.contains('reveal-delay-4') ? 0.40
                  : 0;

      gsap.fromTo(
        el,
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          delay,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        }
      );
    });
  } else {
    revealEls.forEach((el) => el.classList.add('revealed'));
  }

  /* ── Módulo cards — stagger ──────────────────── */
  const cards = document.querySelectorAll('.modulo-card');
  if (!prefersReduced && cards.length) {
    gsap.fromTo(
      cards,
      { opacity: 0, y: 50, scale: 0.97 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.modulos__grid',
          start: 'top 82%',
          toggleActions: 'play none none none',
        },
      }
    );
  }

  /* ── Incluye items — stagger horizontal ──────── */
  const incluyeItems = document.querySelectorAll('.incluye-item');
  if (!prefersReduced && incluyeItems.length) {
    gsap.fromTo(
      incluyeItems,
      { opacity: 0, x: -24 },
      {
        opacity: 1,
        x: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.incluye__grid',
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    );
  }

  /* ── Lotus SVG animation ─────────────────────── */
  const lotus = document.querySelector('.lotus-ornament svg');
  if (lotus && !prefersReduced) {
    /* Anillo exterior gira lentamente */
    const outerRings = lotus.querySelectorAll('circle:nth-child(-n+2)');
    outerRings.forEach((ring, i) => {
      gsap.to(ring, {
        rotation: i % 2 === 0 ? 360 : -360,
        transformOrigin: '190px 190px',
        duration: 80 + i * 20,
        repeat: -1,
        ease: 'none',
      });
    });

    /* Pétalos — pulso suave */
    const petals = lotus.querySelectorAll('path');
    gsap.to(petals, {
      opacity: '+=0.06',
      duration: 3,
      stagger: { each: 0.3, repeat: -1, yoyo: true },
      ease: 'sine.inOut',
    });

    /* Centro gold — latido */
    const centerDots = lotus.querySelectorAll('circle:nth-last-child(-n+2)');
    gsap.to(centerDots, {
      scale: 1.18,
      transformOrigin: '190px 190px',
      duration: 2.4,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });

    /* Glow inner */
    const innerGlow = document.createElement('div');
    innerGlow.className = 'lotus-inner-glow';
    document.querySelector('.lotus-ornament').appendChild(innerGlow);
  }

  /* ── Floating energy particles ───────────────── */
  if (!prefersReduced) {
    const sections = document.querySelectorAll('.intro, .cierre');
    sections.forEach((section) => {
      const container = document.createElement('div');
      container.className = 'energy-particles';
      section.appendChild(container);

      const count = 7;
      for (let i = 0; i < count; i++) {
        const dot = document.createElement('div');
        dot.className = 'energy-dot';
        const size = Math.random() * 5 + 3;
        const left = Math.random() * 90 + 5;
        const top  = Math.random() * 80 + 10;
        dot.style.cssText = `width:${size}px;height:${size}px;left:${left}%;top:${top}%;opacity:0`;
        container.appendChild(dot);

        gsap.to(dot, {
          y: -(Math.random() * 60 + 30),
          x: (Math.random() - 0.5) * 40,
          opacity: Math.random() * 0.5 + 0.1,
          duration: Math.random() * 6 + 5,
          repeat: -1,
          yoyo: false,
          ease: 'power1.inOut',
          delay: Math.random() * 5,
          onRepeat: function() {
            gsap.set(dot, { y: 0, opacity: 0 });
          },
        });
      }
    });
  }

  /* ── Módulo imagen — parallax suave ──────────── */
  if (!prefersReduced) {
    document.querySelectorAll('.modulo-img').forEach((section) => {
      gsap.to(section, {
        backgroundPositionY: '60%',
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        },
      });
    });
  }

  /* ── Badges — spring entry ───────────────────── */
  const badges = document.querySelectorAll('.badge');
  if (!prefersReduced && badges.length) {
    gsap.fromTo(
      badges,
      { opacity: 0, scale: 0.8, y: 10 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.55,
        stagger: 0.1,
        ease: 'back.out(1.8)',
        scrollTrigger: {
          trigger: '.angelica__badges',
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      }
    );
  }

  /* ── Cierre quote — reveal dramático ────────── */
  const cierreQuote = document.querySelector('.cierre__quote');
  if (!prefersReduced && cierreQuote) {
    gsap.fromTo(
      cierreQuote,
      { opacity: 0, scale: 0.97, y: 30 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cierreQuote,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );
  }

  /* ── Nav scroll ──────────────────────────────── */
  const header = document.querySelector('.site-header');
  if (header) {
    ScrollTrigger.create({
      start: 40,
      onEnter: () => header.classList.add('site-header--scrolled'),
      onLeaveBack: () => header.classList.remove('site-header--scrolled'),
    });
    /* Remove JS listener duplicate */
    window.removeEventListener('scroll', null);
  }

})();
