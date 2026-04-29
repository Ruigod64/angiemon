/* ══════════════════════════════════════════════════
   AngieMon — animaciones.js
   Canvas particles · Scroll reveal · Parallax
   ══════════════════════════════════════════════════ */

(() => {
  'use strict';

  /* ── 1. Canvas Particle System (Hero) ──────────── */
  function initParticles() {
    const canvas = document.querySelector('.hero__canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    let animId;

    const GOLD = [212, 175, 55];
    const PARTICLE_COUNT = 80;

    function resize() {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }

    class Particle {
      constructor() { this.reset(false); }

      reset(fromBottom = false) {
        /* 30% respawn at random height to keep top populated */
        const randomSpawn = fromBottom && Math.random() < 0.3;
        this.x        = Math.random() * canvas.width;
        this.y        = randomSpawn
          ? Math.random() * canvas.height
          : fromBottom
            ? canvas.height + Math.random() * 40
            : Math.random() * canvas.height;
        this.size     = Math.random() * 1.8 + 0.4;
        this.speedY   = Math.random() * 0.55 + 0.28;
        this.speedX   = (Math.random() - 0.5) * 0.22;
        this.maxAlpha = Math.random() * 0.55 + 0.15;
        this.alpha    = (fromBottom && !randomSpawn) ? 0 : this.maxAlpha * Math.random();
        this.phase    = (fromBottom && !randomSpawn) ? 'fadein' : 'hold';
        this.life     = 0;
        this.maxLife  = Math.random() * 420 + 280;
        this.twinkle  = Math.random() * Math.PI * 2;
        this.twinkleSpeed = Math.random() * 0.03 + 0.01;
      }

      update() {
        this.y     -= this.speedY;
        this.x     += this.speedX;
        this.life  ++;
        this.twinkle += this.twinkleSpeed;

        const twinkleMod = Math.sin(this.twinkle) * 0.12;

        if (this.phase === 'fadein') {
          this.alpha += 0.008;
          if (this.alpha >= this.maxAlpha) this.phase = 'hold';
        } else if (this.phase === 'hold') {
          this.alpha = this.maxAlpha + twinkleMod;
          if (this.life > this.maxLife) this.phase = 'fadeout';
        } else {
          this.alpha -= 0.005;
        }

        if (this.y < -10 || this.alpha <= 0) this.reset(true);
      }

      draw() {
        if (this.alpha <= 0) return;
        ctx.save();
        ctx.globalAlpha = Math.max(0, Math.min(1, this.alpha));

        /* Subtle glow */
        const grd = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.size * 3.5
        );
        grd.addColorStop(0,   `rgba(${GOLD},${this.alpha})`);
        grd.addColorStop(0.4, `rgba(${GOLD},${this.alpha * 0.4})`);
        grd.addColorStop(1,   `rgba(${GOLD},0)`);
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 3.5, 0, Math.PI * 2);
        ctx.fill();

        /* Core dot */
        ctx.fillStyle = `rgba(240, 220, 140, ${this.alpha})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }
    }

    function init() {
      particles = Array.from({ length: PARTICLE_COUNT }, () => new Particle());
    }

    function loop() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => { p.update(); p.draw(); });
      animId = requestAnimationFrame(loop);
    }

    /* Respect prefers-reduced-motion */
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    resize();
    init();
    loop();

    const ro = new ResizeObserver(() => {
      cancelAnimationFrame(animId);
      resize();
      loop();
    });
    ro.observe(canvas.parentElement);
  }

  /* ── 2. Scroll Reveal (Intersection Observer) ──── */
  function initReveal() {
    const els = document.querySelectorAll('.reveal');
    if (!els.length) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      els.forEach(el => el.classList.add('revealed'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px',
    });

    els.forEach(el => observer.observe(el));
  }

  /* ── 3. Hero Image Parallax ─────────────────────── */
  function initParallax() {
    const bgImg = document.querySelector('.hero__bg-img');
    if (!bgImg) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    let ticking = false;

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const limit   = window.innerHeight;
          if (scrollY <= limit) {
            bgImg.style.transform = `translateY(${scrollY * 0.25}px)`;
          }
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  /* ── 4. Hero image loaded state ─────────────────── */
  function initHeroImg() {
    const img = document.querySelector('.hero__bg-img');
    if (!img) return;

    if (img.complete) {
      img.classList.add('loaded');
    } else {
      img.addEventListener('load', () => img.classList.add('loaded'));
    }
  }

  /* ── 5. Ornament rotation pause on hover ────────── */
  function initOrnament() {
    const el = document.querySelector('.ornament-circle');
    if (!el) return;
    el.addEventListener('mouseenter', () => el.style.animationPlayState = 'paused');
    el.addEventListener('mouseleave', () => el.style.animationPlayState = 'running');
  }

  /* ── Init ───────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    initReveal();
    initParallax();
    initHeroImg();
    initOrnament();
  });
})();
