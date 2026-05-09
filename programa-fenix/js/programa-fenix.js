/* ══════════════════════════════════════════════════
   Membresía Fénix — GSAP Animations
   ══════════════════════════════════════════════════ */

gsap.registerPlugin(ScrollTrigger);

const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ── Hero entrance ──────────────────────────────── */
(function initHero() {
  if (prefersReduced) return;

  const tl = gsap.timeline({ delay: 0.2 });

  tl.from('.hero__eyebrow', {
    y: 18, opacity: 0, duration: 0.6, ease: 'power2.out'
  })
  .from('.hero__title', {
    y: 36, opacity: 0, duration: 0.8, ease: 'power2.out'
  }, '-=0.35')
  .from('.hero__orn', {
    opacity: 0, duration: 0.5, ease: 'power2.out'
  }, '-=0.4')
  .from('.hero__meta', {
    y: 16, opacity: 0, duration: 0.5, ease: 'power2.out'
  }, '-=0.35')
  .from('.hero__guide', {
    y: 14, opacity: 0, duration: 0.5, ease: 'power2.out'
  }, '-=0.3')
  .from('.hero__cta', {
    y: 16, opacity: 0, scale: 0.96, duration: 0.55, ease: 'back.out(1.8)'
  }, '-=0.25')
  .from('.hero__scroll', {
    opacity: 0, duration: 0.5
  }, '-=0.1');
})();

/* ── Hero parallax ──────────────────────────────── */
(function initParallax() {
  if (prefersReduced) return;

  gsap.to('.hero__bg', {
    yPercent: 18,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 1.2
    }
  });
})();

/* ── ScrollTrigger section reveals ─────────────── */
(function initScrollReveals() {
  if (prefersReduced) return;

  /* Single elements */
  gsap.utils.toArray([
    '.sec-label', '.sec-heading', '.sec-sub',
    '.quees__quote', '.solucion__closing',
    '.cta-final__ornament', '.cta-final__heading',
    '.cta-final__sub', '.cta-final__btn', '.cta-final__note',
    '.objetivo__text', '.problema__text',
    '.valores__text'
  ]).forEach(el => {
    gsap.from(el, {
      y: 28, opacity: 0, duration: 0.7, ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 88%', once: true }
    });
  });

  /* Grid children stagger */
  [
    '.metas__grid', '.ofrece__grid', '.solucion__list',
    '.paraquien__grid', '.proceso__steps', '.recibes__grid',
    '.valores__grid'
  ].forEach(sel => {
    const el = document.querySelector(sel);
    if (!el) return;
    gsap.from(el.children, {
      y: 32, opacity: 0, duration: 0.65, ease: 'power2.out',
      stagger: 0.08,
      scrollTrigger: { trigger: el, start: 'top 86%', once: true }
    });
  });

  /* quees body paragraphs */
  const queesBody = document.querySelector('.quees__body');
  if (queesBody) {
    gsap.from(queesBody.querySelectorAll('p'), {
      y: 20, opacity: 0, duration: 0.6, ease: 'power2.out', stagger: 0.12,
      scrollTrigger: { trigger: queesBody, start: 'top 88%', once: true }
    });
  }

  /* Module accordion items */
  const moduleItems = document.querySelectorAll('.module-item');
  if (moduleItems.length) {
    gsap.from(moduleItems, {
      y: 24, opacity: 0, duration: 0.6, ease: 'power2.out', stagger: 0.06,
      scrollTrigger: { trigger: '.modules-accordion', start: 'top 88%', once: true }
    });
  }

  /* FAQ items */
  const faqItems = document.querySelectorAll('.faq-item');
  if (faqItems.length) {
    gsap.from(faqItems, {
      y: 20, opacity: 0, duration: 0.55, ease: 'power2.out', stagger: 0.07,
      scrollTrigger: { trigger: '.faq-accordion', start: 'top 88%', once: true }
    });
  }
})();

/* ── Module accordion ───────────────────────────── */
(function initModuleAccordion() {
  document.querySelectorAll('.module-header').forEach(header => {
    header.addEventListener('click', () => {
      const item   = header.closest('.module-item');
      const body   = item.querySelector('.module-body');
      const isOpen = item.classList.contains('is-open');

      /* Close all others */
      document.querySelectorAll('.module-item.is-open').forEach(openItem => {
        if (openItem === item) return;
        const openBody = openItem.querySelector('.module-body');
        openItem.classList.remove('is-open');
        gsap.to(openBody, { height: 0, duration: 0.35, ease: 'power2.inOut' });
      });

      if (isOpen) {
        item.classList.remove('is-open');
        gsap.to(body, { height: 0, duration: 0.35, ease: 'power2.inOut' });
      } else {
        item.classList.add('is-open');
        gsap.set(body, { height: 'auto' });
        const h = body.offsetHeight;
        gsap.fromTo(body, { height: 0 }, { height: h, duration: 0.45, ease: 'power2.out' });

        /* Scroll into view gently */
        setTimeout(() => {
          const rect = item.getBoundingClientRect();
          if (rect.top < 80) {
            window.scrollBy({ top: rect.top - 100, behavior: 'smooth' });
          }
        }, 460);
      }
    });
  });
})();

/* ── FAQ accordion ──────────────────────────────── */
(function initFaqAccordion() {
  document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
      const item   = question.closest('.faq-item');
      const answer = item.querySelector('.faq-answer');
      const isOpen = item.classList.contains('is-open');

      document.querySelectorAll('.faq-item.is-open').forEach(openItem => {
        if (openItem === item) return;
        openItem.classList.remove('is-open');
        gsap.to(openItem.querySelector('.faq-answer'), {
          height: 0, duration: 0.3, ease: 'power2.inOut'
        });
      });

      if (isOpen) {
        item.classList.remove('is-open');
        gsap.to(answer, { height: 0, duration: 0.3, ease: 'power2.inOut' });
      } else {
        item.classList.add('is-open');
        gsap.set(answer, { height: 'auto' });
        const h = answer.offsetHeight;
        gsap.fromTo(answer, { height: 0 }, { height: h, duration: 0.38, ease: 'power2.out' });
      }
    });
  });
})();

/* ── Ember particles ────────────────────────────── */
(function initParticles() {
  const canvas = document.getElementById('fenix-canvas');
  if (!canvas || prefersReduced) return;

  const ctx  = canvas.getContext('2d');
  let W, H, sparks = [], raf;

  const COLORS = [
    'rgba(255,170,0,', 'rgba(255,100,0,',
    'rgba(255, 60,0,', 'rgba(255,220,0,',
    'rgba(232, 68,0,',
  ];

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  function Spark() { this.reset(); }
  Spark.prototype.reset = function () {
    this.x      = Math.random() * W;
    this.y      = H + Math.random() * 40;
    this.size   = Math.random() * 2.2 + 0.5;
    this.speed  = Math.random() * 0.65 + 0.25;
    this.drift  = (Math.random() - 0.5) * 0.45;
    this.alpha  = Math.random() * 0.5 + 0.12;
    this.fade   = Math.random() * 0.004 + 0.002;
    this.color  = COLORS[Math.floor(Math.random() * COLORS.length)];
    this.wobble = Math.random() * Math.PI * 2;
    this.wSpeed = Math.random() * 0.035 + 0.008;
  };
  Spark.prototype.update = function () {
    this.wobble += this.wSpeed;
    this.x += this.drift + Math.sin(this.wobble) * 0.28;
    this.y -= this.speed;
    this.alpha -= this.fade;
    if (this.alpha <= 0 || this.y < -10) this.reset();
  };
  Spark.prototype.draw = function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color + this.alpha + ')';
    ctx.fill();
  };

  function init() {
    const count = Math.min(Math.floor(W * H / 9500), 75);
    sparks = Array.from({ length: count }, () => {
      const s = new Spark();
      s.y = Math.random() * H;
      s.alpha = Math.random() * 0.35;
      return s;
    });
  }

  function loop() {
    ctx.clearRect(0, 0, W, H);
    sparks.forEach(s => { s.update(); s.draw(); });
    raf = requestAnimationFrame(loop);
  }

  const hero = document.querySelector('.hero');
  if (hero && 'IntersectionObserver' in window) {
    new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        if (!raf) raf = requestAnimationFrame(loop);
      } else {
        cancelAnimationFrame(raf);
        raf = null;
      }
    }).observe(hero);
  } else {
    loop();
  }

  resize();
  init();
  window.addEventListener('resize', () => { resize(); init(); });
})();
