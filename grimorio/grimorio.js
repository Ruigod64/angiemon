/* ── STARS ── */
(function () {
    const canvas = document.getElementById('stars-canvas');
    const ctx    = canvas.getContext('2d');
    let stars    = [];

    function resize() {
        canvas.width  = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function makeStars(n) {
        stars = [];
        for (let i = 0; i < n; i++) {
            stars.push({
                x:    Math.random() * canvas.width,
                y:    Math.random() * canvas.height,
                r:    Math.random() * 1.4 + 0.15,
                a:    Math.random() * 0.75 + 0.1,
                tw:   Math.random() * Math.PI * 2,
                ts:   Math.random() * 0.018 + 0.004,
                gold: Math.random() < 0.12
            });
        }
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (const s of stars) {
            s.tw += s.ts;
            const a = s.a * (0.55 + 0.45 * Math.sin(s.tw));
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
            ctx.fillStyle = s.gold
                ? `rgba(201,168,76,${(a * 0.65).toFixed(3)})`
                : `rgba(255,255,255,${a.toFixed(3)})`;
            ctx.fill();
        }
        requestAnimationFrame(draw);
    }

    resize();
    makeStars(300);
    draw();
    window.addEventListener('resize', () => { resize(); makeStars(300); });
})();


/* ── GSAP ANIMATIONS ──
   GSAP sets initial hidden state itself via gsap.set().
   If GSAP is unavailable (CDN fail / reduced-motion), content stays fully visible.
── */
document.addEventListener('DOMContentLoaded', () => {
    if (typeof gsap === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    gsap.registerPlugin(ScrollTrigger);

    /* helper: animate a group on scroll */
    function reveal(targets, vars, trigger) {
        const els = typeof targets === 'string' ? document.querySelectorAll(targets) : targets;
        if (!els || (els.length !== undefined && !els.length)) return;
        gsap.set(els, { opacity: 0, ...vars.from });
        gsap.to(els, {
            opacity: 1,
            ...vars.to,
            scrollTrigger: {
                trigger: trigger || (els[0] || els),
                start: 'top 85%',
                toggleActions: 'play none none none'
            }
        });
    }

    function revealStagger(targets, fromVars, toVars, trigger, stagger) {
        const els = document.querySelectorAll(targets);
        if (!els.length) return;
        gsap.set(els, { opacity: 0, ...fromVars });
        gsap.to(els, {
            opacity: 1,
            ...toVars,
            stagger: stagger || 0.08,
            scrollTrigger: {
                trigger: trigger || els[0],
                start: 'top 85%',
                toggleActions: 'play none none none'
            }
        });
    }

    /* ── HERO entrance (no scroll trigger — plays on load) ── */
    const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    gsap.set(['.hero-eyebrow', '.hero-title', '.hero-subtitle', '.moon-row-hero', '.hero-desc', '#hero .btn-cta'],
        { opacity: 0, y: 30 });

    heroTl
        .to('.hero-eyebrow',  { opacity: 1, y: 0, duration: .7, delay: .4 })
        .to('.hero-title',    { opacity: 1, y: 0, duration: 1.1, scale: 1, ease: 'power3.out' }, '-=.3')
        .to('.hero-subtitle', { opacity: 1, y: 0, duration: .7 }, '-=.5')
        .to('.moon-row-hero', { opacity: 1, y: 0, duration: .5 }, '-=.4')
        .to('.hero-desc',     { opacity: 1, y: 0, duration: .6 }, '-=.4')
        .to('#hero .btn-cta', { opacity: 1, y: 0, duration: .6, ease: 'back.out(1.4)' }, '-=.3');

    /* initial scale for hero title */
    gsap.set('.hero-title', { scale: .92 });

    /* ── Section labels ── */
    document.querySelectorAll('.section-label').forEach(el => {
        gsap.set(el, { opacity: 0, x: -20 });
        gsap.to(el, {
            opacity: 1, x: 0, duration: .6, ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' }
        });
    });

    /* ── Section titles ── */
    document.querySelectorAll('.section-title').forEach(el => {
        gsap.set(el, { opacity: 0, y: 28, scale: .96 });
        gsap.to(el, {
            opacity: 1, y: 0, scale: 1, duration: .8, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 86%', toggleActions: 'play none none none' }
        });
    });

    /* ── Dividers ── */
    document.querySelectorAll('.divider').forEach(el => {
        gsap.set(el, { opacity: 0, scaleX: 0 });
        gsap.to(el, {
            opacity: 1, scaleX: 1, duration: .7, ease: 'power2.inOut', transformOrigin: 'center',
            scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none none' }
        });
    });

    /* ── Intro paragraphs ── */
    const introParagraphs = document.querySelectorAll('.intro-text p');
    if (introParagraphs.length) {
        gsap.set(introParagraphs, { opacity: 0, y: 18 });
        gsap.to(introParagraphs, {
            opacity: 1, y: 0, duration: .65, stagger: .12, ease: 'power2.out',
            scrollTrigger: { trigger: '.intro-text', start: 'top 82%', toggleActions: 'play none none none' }
        });
    }

    /* ── Discover cards ── */
    const cards = document.querySelectorAll('.discover-card');
    if (cards.length) {
        gsap.set(cards, { opacity: 0, y: 45 });
        gsap.to(cards, {
            opacity: 1, y: 0, duration: .6, stagger: .07, ease: 'power3.out',
            scrollTrigger: { trigger: '.discover-grid', start: 'top 82%', toggleActions: 'play none none none' }
        });
    }

    /* ── CTA banners ── */
    document.querySelectorAll('.cta-banner').forEach(el => {
        gsap.set(el, { opacity: 0, y: 28, scale: .97 });
        gsap.to(el, {
            opacity: 1, y: 0, scale: 1, duration: .75, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' }
        });
    });

    /* ── Unique box slide from left ── */
    const uniqueBox = document.querySelector('.unique-box');
    if (uniqueBox) {
        gsap.set(uniqueBox, { opacity: 0, x: -50 });
        gsap.to(uniqueBox, {
            opacity: 1, x: 0, duration: .8, ease: 'power3.out',
            scrollTrigger: { trigger: uniqueBox, start: 'top 82%', toggleActions: 'play none none none' }
        });
    }

    /* ── Pricing box ── */
    const pricingBox = document.querySelector('.pricing-box');
    if (pricingBox) {
        gsap.set(pricingBox, { opacity: 0, scale: .93 });
        gsap.set(['.price-old', '.price-now', '.price-label', '.price-note', '.pages-badge'], { opacity: 0, y: 12 });
        gsap.set('.pricing-box .btn-cta', { opacity: 0, scale: .95 });

        const priceTl = gsap.timeline({
            scrollTrigger: { trigger: pricingBox, start: 'top 80%', toggleActions: 'play none none none' }
        });
        priceTl
            .to(pricingBox,               { opacity: 1, scale: 1, duration: .8, ease: 'back.out(1.4)' })
            .to('.pages-badge',           { opacity: 1, y: 0, duration: .4, ease: 'back.out(2)' }, '-=.3')
            .to('.price-old',             { opacity: 1, y: 0, duration: .4 }, '-=.2')
            .to('.price-now',             { opacity: 1, y: 0, scale: 1, duration: .6, ease: 'back.out(1.6)' }, '-=.2')
            .to('.price-label',           { opacity: 1, y: 0, duration: .4 }, '-=.2')
            .to('.price-note',            { opacity: 1, y: 0, duration: .4 }, '-=.2')
            .to('.pricing-box .btn-cta',  { opacity: 1, scale: 1, duration: .5, ease: 'back.out(1.4)' }, '-=.1');
    }

    /* ── Signal text ── */
    const signalPs = document.querySelectorAll('.signal-text p');
    if (signalPs.length) {
        gsap.set(signalPs, { opacity: 0, y: 16 });
        gsap.to(signalPs, {
            opacity: 1, y: 0, duration: .55, stagger: .1, ease: 'power2.out',
            scrollTrigger: { trigger: '.signal-text', start: 'top 82%', toggleActions: 'play none none none' }
        });
    }

    /* ── Portal section ── */
    const portalSection = document.querySelector('.portal-section');
    if (portalSection) {
        gsap.set('.portal-title', { opacity: 0, y: 40, scale: .9 });
        gsap.set('.portal-sub',   { opacity: 0, y: 20 });
        gsap.set('.portal-body p',{ opacity: 0, y: 12 });

        const portalTl = gsap.timeline({
            scrollTrigger: { trigger: portalSection, start: 'top 75%', toggleActions: 'play none none none' }
        });
        portalTl
            .to('.portal-title', { opacity: 1, y: 0, scale: 1, duration: .9, ease: 'power3.out' })
            .to('.portal-sub',   { opacity: 1, y: 0, duration: .6 }, '-=.4')
            .to('.portal-body p',{ opacity: 1, y: 0, duration: .5, stagger: .1 }, '-=.3');
    }

    /* ── Moon journey steps ── */
    const moonSteps = document.querySelectorAll('.moon-step');
    if (moonSteps.length) {
        gsap.set(moonSteps, { opacity: 0, x: -35 });
        gsap.to(moonSteps, {
            opacity: 1, x: 0, duration: .55, stagger: .1, ease: 'power3.out',
            scrollTrigger: { trigger: '.moon-journey', start: 'top 82%', toggleActions: 'play none none none' }
        });
    }

    /* ── Operative list ── */
    const opItems = document.querySelectorAll('.op-list li');
    if (opItems.length) {
        gsap.set(opItems, { opacity: 0, y: 22 });
        gsap.to(opItems, {
            opacity: 1, y: 0, duration: .5, stagger: .07, ease: 'power2.out',
            scrollTrigger: { trigger: '.op-list', start: 'top 82%', toggleActions: 'play none none none' }
        });
    }

    /* ── For-who list ── */
    const forwhoItems = document.querySelectorAll('.forwho-list li');
    if (forwhoItems.length) {
        gsap.set(forwhoItems, { opacity: 0, x: 30 });
        gsap.to(forwhoItems, {
            opacity: 1, x: 0, duration: .55, stagger: .1, ease: 'power3.out',
            scrollTrigger: { trigger: '.forwho-list', start: 'top 82%', toggleActions: 'play none none none' }
        });
    }

    /* ── Declaration box ── */
    const declBox = document.querySelector('.declaration-box');
    if (declBox) {
        gsap.set(declBox, { opacity: 0, scale: .95 });
        gsap.set('.declaration-text p', { opacity: 0, y: 14 });

        const declTl = gsap.timeline({
            scrollTrigger: { trigger: declBox, start: 'top 80%', toggleActions: 'play none none none' }
        });
        declTl
            .to(declBox,               { opacity: 1, scale: 1, duration: .75, ease: 'power3.out' })
            .to('.declaration-text p', { opacity: 1, y: 0, duration: .5, stagger: .12 }, '-=.3');
    }

    /* ── Big quotes ── */
    document.querySelectorAll('.big-quote').forEach(bq => {
        const ps = bq.querySelectorAll('p');
        if (!ps.length) return;
        gsap.set(ps, { opacity: 0, y: 12 });
        gsap.to(ps, {
            opacity: 1, y: 0, duration: .5, stagger: .1, ease: 'power2.out',
            scrollTrigger: { trigger: bq, start: 'top 84%', toggleActions: 'play none none none' }
        });
    });

    /* ── Final text ── */
    const finalPs = document.querySelectorAll('.final-text p');
    if (finalPs.length) {
        gsap.set(finalPs, { opacity: 0, y: 16 });
        gsap.to(finalPs, {
            opacity: 1, y: 0, duration: .55, stagger: .1, ease: 'power2.out',
            scrollTrigger: { trigger: '.final-text', start: 'top 82%', toggleActions: 'play none none none' }
        });
    }

    /* ── Moon rows ── */
    document.querySelectorAll('.moon-row').forEach(row => {
        const spans = Array.from(row.children);
        if (!spans.length) return;
        gsap.set(spans, { opacity: 0, scale: .5 });
        gsap.to(spans, {
            opacity: 1, scale: 1, duration: .4, stagger: .06, ease: 'back.out(2)',
            scrollTrigger: { trigger: row, start: 'top 88%', toggleActions: 'play none none none' }
        });
    });

    /* ── Pages badge ── */
    const badge = document.querySelector('.pages-badge');
    if (badge && !document.querySelector('.pricing-box')) {
        gsap.set(badge, { opacity: 0, scale: .7 });
        gsap.to(badge, {
            opacity: 1, scale: 1, duration: .5, ease: 'back.out(2)',
            scrollTrigger: { trigger: badge, start: 'top 85%', toggleActions: 'play none none none' }
        });
    }
});
