/* ══════════════════════════════════════════════════
   AngieMon — programas.js (autónomo)
   Sin dependencias de JS compartido.
   ══════════════════════════════════════════════════ */

(() => {
  'use strict';

  /* ── Detección de iframe ─────────────────────────
     Google Sites embebe esta página en un iframe.
     En ese contexto el IntersectionObserver no dispara,
     así que saltamos animaciones y mostramos todo directo. */
  let inIframe = false;
  try { inIframe = window.self !== window.top; } catch (_) { inIframe = true; }

  /* ── js-ready: activa opacity:0 en .reveal SOLO
     cuando estamos en browser normal (no iframe).     */
  if (!inIframe) {
    document.documentElement.classList.add('js-ready');
  }

  /* ── 1. Canvas Particles (Hero) ──────────────── */
  function initParticles() {
    const canvas = document.querySelector('.hero__canvas');
    if (!canvas || inIframe) return;

    const ctx  = canvas.getContext('2d');
    const GOLD = [212, 175, 55];
    const N    = 80;
    let particles = [];
    let animId;

    function resize() {
      canvas.width  = canvas.offsetWidth  || 1;
      canvas.height = canvas.offsetHeight || 1;
    }

    class Particle {
      constructor() { this.reset(false); }
      reset(fromBottom = false) {
        const rand = fromBottom && Math.random() < 0.3;
        this.x         = Math.random() * canvas.width;
        this.y         = rand ? Math.random() * canvas.height
                       : fromBottom ? canvas.height + Math.random() * 40
                       : Math.random() * canvas.height;
        this.size      = Math.random() * 1.8 + 0.4;
        this.speedY    = Math.random() * 0.55 + 0.28;
        this.speedX    = (Math.random() - 0.5) * 0.22;
        this.maxAlpha  = Math.random() * 0.55 + 0.15;
        this.alpha     = (fromBottom && !rand) ? 0 : this.maxAlpha * Math.random();
        this.phase     = (fromBottom && !rand) ? 'fadein' : 'hold';
        this.life      = 0;
        this.maxLife   = Math.random() * 420 + 280;
        this.twinkle   = Math.random() * Math.PI * 2;
        this.twinkleSpd = Math.random() * 0.03 + 0.01;
      }
      update() {
        this.y -= this.speedY;
        this.x += this.speedX;
        this.life++;
        this.twinkle += this.twinkleSpd;
        const t = Math.sin(this.twinkle) * 0.12;
        if (this.phase === 'fadein') {
          this.alpha += 0.008;
          if (this.alpha >= this.maxAlpha) this.phase = 'hold';
        } else if (this.phase === 'hold') {
          this.alpha = this.maxAlpha + t;
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
        const g = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 3.5);
        g.addColorStop(0,   `rgba(${GOLD},${this.alpha})`);
        g.addColorStop(0.4, `rgba(${GOLD},${this.alpha * 0.4})`);
        g.addColorStop(1,   `rgba(${GOLD},0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 3.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = `rgba(240,220,140,${this.alpha})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    resize();
    particles = Array.from({ length: N }, () => new Particle());

    function loop() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => { p.update(); p.draw(); });
      animId = requestAnimationFrame(loop);
    }
    loop();

    new ResizeObserver(() => {
      cancelAnimationFrame(animId);
      resize();
      loop();
    }).observe(canvas.parentElement);
  }

  /* ── 2. Scroll Reveal ────────────────────────── */
  function initReveal() {
    const els = document.querySelectorAll('.reveal');
    if (!els.length) return;

    /* En iframe o prefers-reduced: mostrar todo inmediatamente */
    if (inIframe || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      els.forEach(el => el.classList.add('revealed'));
      return;
    }

    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    els.forEach(el => io.observe(el));
  }

  /* ── 3. Smooth scroll ────────────────────────── */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', e => {
        const target = document.getElementById(link.getAttribute('href').slice(1));
        if (!target) return;
        e.preventDefault();
        const offset = parseInt(getComputedStyle(document.documentElement)
          .getPropertyValue('--header-h'), 10) || 72;
        window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' });
      });
    });
  }

  /* ── 4. Footer year ──────────────────────────── */
  function initYear() {
    const el = document.getElementById('year');
    if (el) el.textContent = new Date().getFullYear();
  }

  /* ── 5. Img fallback ─────────────────────────── */
  function initImgFallback() {
    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
      img.addEventListener('error', () => { img.style.display = 'none'; });
    });
  }

  /* ── Init ────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    initReveal();
    initSmoothScroll();
    initYear();
    initImgFallback();
  });

})();
