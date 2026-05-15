(function () {
  'use strict';

  /* ════════════════════════════════════════
     ESTRELLAS — Canvas
  ════════════════════════════════════════ */
  var canvas = document.getElementById('starsCanvas');
  if (canvas) {
    var ctx = canvas.getContext('2d');
    var stars = [];
    var W, H;

    function resizeCanvas() {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }

    function buildStars(n) {
      stars = [];
      for (var i = 0; i < n; i++) {
        stars.push({
          x:     Math.random() * W,
          y:     Math.random() * H,
          r:     Math.random() * 1.4 + 0.2,
          base:  Math.random() * 0.65 + 0.1,
          speed: Math.random() * 0.004 + 0.001,
          phase: Math.random() * Math.PI * 2,
        });
      }
    }

    function drawFrame(t) {
      ctx.clearRect(0, 0, W, H);
      for (var i = 0; i < stars.length; i++) {
        var s = stars[i];
        var a = s.base * (0.45 + 0.55 * Math.sin(s.phase + t * s.speed * 60));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,255,255,' + a + ')';
        ctx.fill();
      }
      requestAnimationFrame(drawFrame);
    }

    resizeCanvas();
    buildStars(220);
    requestAnimationFrame(drawFrame);

    var resizeTimer;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        resizeCanvas();
        buildStars(220);
      }, 200);
    });
  }

  /* ════════════════════════════════════════
     LIGHTBOX — independiente de GSAP
  ════════════════════════════════════════ */
  var lightbox         = document.getElementById('lightbox');
  var lightboxImg      = document.getElementById('lightboxImg');
  var lightboxClose    = document.getElementById('lightboxClose');
  var lightboxBackdrop = document.getElementById('lightboxBackdrop');

  if (lightbox && lightboxImg && lightboxClose && lightboxBackdrop) {
    function openLightbox(src, alt) {
      lightboxImg.src = src;
      lightboxImg.alt = alt || '';
      lightbox.classList.add('is-open');
      document.body.style.overflow = 'hidden';
      lightboxClose.focus();
    }

    function closeLightbox() {
      lightbox.classList.remove('is-open');
      document.body.style.overflow = '';
    }

    document.querySelectorAll('.mod-card__img-wrap, .class-card__img-wrap').forEach(function (wrap) {
      var img = wrap.querySelector('img');
      if (!img) return;
      wrap.addEventListener('click', function () {
        openLightbox(img.src, img.alt);
      });
    });

    lightboxClose.addEventListener('click', closeLightbox);
    lightboxBackdrop.addEventListener('click', closeLightbox);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeLightbox();
    });
  }

  /* ════════════════════════════════════════
     GSAP + ScrollTrigger
  ════════════════════════════════════════ */
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    /* Hacer visible todo si GSAP no carga */
    document.querySelectorAll('.js-reveal, .js-stagger > *').forEach(function (el) {
      el.style.visibility = 'visible';
    });
    return;
  }

  gsap.registerPlugin(ScrollTrigger);
  gsap.defaults({ ease: 'power3.out' });

  /* ── Elementos del hero ──────────────── */
  var heroEls = [
    '.hero__eyebrow',
    '.hero__title-italic',
    '.hero__title-gold',
    '.hero__subtitle',
    '.hero__pillars',
    '.hero .cta-btn',
    '.hero__meta',
    '.hero__scroll',
  ];

  gsap.set(heroEls, { autoAlpha: 0, y: 28 });

  gsap.timeline({ delay: 0.25 })
    .to('.hero__eyebrow',      { autoAlpha: 1, y: 0, duration: 0.75 })
    .to('.hero__title-italic', { autoAlpha: 1, y: 0, duration: 0.85 }, '-=0.4')
    .to('.hero__title-gold',   { autoAlpha: 1, y: 0, duration: 0.9  }, '-=0.55')
    .to('.hero__subtitle',     { autoAlpha: 1, y: 0, duration: 0.7  }, '-=0.45')
    .to('.hero__pillars',      { autoAlpha: 1, y: 0, duration: 0.6  }, '-=0.35')
    .to('.hero .cta-btn',      { autoAlpha: 1, y: 0, duration: 0.7  }, '-=0.3')
    .to('.hero__meta',         { autoAlpha: 1, y: 0, duration: 0.5  }, '-=0.2')
    .to('.hero__scroll',       { autoAlpha: 1, y: 0, duration: 0.5  }, '-=0.1');

  /* ── Parallax en imagen del hero ─────── */
  gsap.to('.hero__image', {
    yPercent: 22,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 1.5,
    },
  });

  /* ── js-reveal — elementos únicos ────── */
  document.querySelectorAll('.js-reveal').forEach(function (el) {
    gsap.to(el, {
      autoAlpha: 1,
      y: 0,
      duration: 0.9,
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        toggleActions: 'play none none none',
      },
    });
  });

  /* ── js-stagger — hijos con retardo ──── */
  document.querySelectorAll('.js-stagger').forEach(function (container) {
    var kids = Array.from(container.children);
    gsap.to(kids, {
      autoAlpha: 1,
      y: 0,
      duration: 0.78,
      stagger: 0.14,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: container,
        start: 'top 86%',
        toggleActions: 'play none none none',
      },
    });
  });

  /* ── Módulos — entrada con escala ─────── */
  gsap.from('.mod-card', {
    autoAlpha: 0,
    y: 55,
    scale: 0.97,
    duration: 0.9,
    stagger: 0.18,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.modules-grid',
      start: 'top 82%',
    },
  });

  /* ── Clases — cascada ─────────────────── */
  gsap.from('.class-card', {
    autoAlpha: 0,
    y: 42,
    duration: 0.65,
    stagger: { each: 0.07, from: 'start' },
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.classes-grid',
      start: 'top 86%',
    },
  });

  /* ── Bloque final ─────────────────────── */
  gsap.from('.final-block', {
    autoAlpha: 0,
    y: 65,
    scale: 0.975,
    duration: 1.1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.section--final',
      start: 'top 76%',
    },
  });

  /* ── Divisores dorados ───────────────── */
  gsap.from('.gold-divider', {
    scaleX: 0,
    autoAlpha: 0,
    duration: 0.9,
    stagger: 0.2,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.section__header',
      start: 'top 88%',
    },
  });

  /* ── Pilares — perspectiva ───────────── */
  gsap.from('.pillar', {
    autoAlpha: 0,
    y: 35,
    rotationX: 8,
    duration: 0.8,
    stagger: 0.16,
    ease: 'power2.out',
    transformOrigin: 'center top',
    scrollTrigger: {
      trigger: '.pillars-row',
      start: 'top 84%',
    },
  });

  /* ── Stats finales — contador animado ── */
  document.querySelectorAll('.final-stat__n').forEach(function (el) {
    var raw = el.textContent.trim();
    if (raw === '∞' || isNaN(parseInt(raw))) return;
    var target = parseInt(raw);
    var obj = { val: 0 };
    gsap.to(obj, {
      val: target,
      duration: 1.4,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        toggleActions: 'play none none none',
      },
      onUpdate: function () {
        el.textContent = Math.round(obj.val);
      },
    });
  });

})();
