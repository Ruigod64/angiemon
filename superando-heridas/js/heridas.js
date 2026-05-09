/* ══════════════════════════════════════════════════
   Supera las 5 Heridas — Scripts
   ══════════════════════════════════════════════════ */

// Stars
(function () {
  var container = document.getElementById('stars');
  for (var i = 0; i < 160; i++) {
    var star = document.createElement('div');
    star.className = 'star';
    var size = Math.random() * 2.2 + 0.4;
    star.style.cssText =
      'width:' + size + 'px;' +
      'height:' + size + 'px;' +
      'top:' + (Math.random() * 100) + '%;' +
      'left:' + (Math.random() * 100) + '%;' +
      '--d:' + (Math.random() * 3 + 2) + 's;' +
      '--dl:' + (Math.random() * 5) + 's;';
    container.appendChild(star);
  }
})();

// Scroll reveal
var rvEls = document.querySelectorAll('.rv');
var observer = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('on');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

rvEls.forEach(function (el) { observer.observe(el); });

// FAQ
var faqs = [
  [
    '¿Este curso es terapia?',
    'Este curso es un proceso terapéutico de acompañamiento emocional y desarrollo personal. Ofrece herramientas profundas de psicoterapia y prácticas conscientes para trabajar las heridas emocionales desde la raíz.'
  ],
  [
    '¿Qué son las 5 heridas emocionales?',
    'Son heridas que se forman principalmente en la infancia (rechazo, abandono, humillación, traición e injusticia) y que influyen en la forma en que hoy piensas, sientes, te relacionas y tomas decisiones, muchas veces de manera inconsciente. Este curso te ayuda a identificarlas, comprenderlas y comenzar a sanarlas.'
  ],
  [
    '¿Necesito haber hecho terapia antes?',
    'No es necesario. El curso está diseñado para personas que desean comprender su mundo emocional, tanto si ya han trabajado su historia como si este es su primer proceso consciente de sanación.'
  ],
  [
    '¿Este curso puede remover emociones difíciles?',
    'Sí, es posible que durante el proceso surjan emociones. Por eso el curso está diseñado desde el cuidado, la contención y el respeto por el ritmo personal, con ejercicios guiados y recursos para sostenerte emocionalmente. Nunca se busca revivir el dolor, sino comprenderlo e integrarlo.'
  ],
  [
    '¿Cómo está estructurado el curso?',
    'El curso incluye una clase terapéutica central en video, un eBook de acompañamiento, una guía terapéutica de 15 días, meditaciones y ejercicios de integración. Todo está pensado para que avances a tu ritmo y con claridad.'
  ],
  [
    '¿Cuánto tiempo debo dedicarle?',
    'El curso se adapta a ti. Puedes avanzar poco a poco, sin presión ni exigencia. No se trata de hacer mucho, sino de hacerlo con conciencia.'
  ],
  [
    '¿Qué herramientas se utilizan en el curso?',
    'El enfoque es integrativo y terapéutico, combinando psicoterapia, enfoque holístico, Programación Neurolingüística (PNL), conciencia emocional y corporal, y principios de la física cuántica aplicados a la observación y responsabilidad personal. Todo se presenta de forma clara, ética y comprensible.'
  ],
  [
    '¿Tendré acompañamiento durante el proceso?',
    'El curso incluye un grupo de apoyo donde podrás compartir dudas, reflexiones y sentirte acompañada/o durante el proceso, siempre desde el respeto y la contención. Siempre responderemos tus preguntas.'
  ],
  [
    '¿Este curso es solo para mujeres?',
    'No. El curso está abierto a cualquier persona que desee sanar sus heridas emocionales y dejar de repetir patrones que generan dolor.'
  ],
  [
    '¿Cuánto tiempo tengo acceso al curso?',
    'Tendrás acceso al contenido de forma continua, para que puedas revisarlo las veces que necesites y avanzar a tu propio ritmo.'
  ],
  [
    '¿Este curso garantiza resultados?',
    'La sanación es un proceso personal. El curso está garantizado si estás dispuesta/o a trabajar en tu historia. El curso te brinda herramientas, guía y acompañamiento, pero los resultados dependen de tu disposición, constancia y compromiso contigo.'
  ]
];

var faqList = document.getElementById('faq-list');

faqs.forEach(function (faq, i) {
  var item = document.createElement('div');
  item.className = 'faq-item rv';
  item.setAttribute('role', 'listitem');
  item.innerHTML =
    '<button class="faq-q" aria-expanded="false" aria-controls="faq-body-' + i + '">'
    + '<span>' + faq[0] + '</span>'
    + '<svg class="faq-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>'
    + '</button>'
    + '<div class="faq-body" id="faq-body-' + i + '" role="region">'
    + '<div class="faq-a">' + faq[1] + '</div>'
    + '</div>';
  faqList.appendChild(item);
  observer.observe(item);
});

faqList.addEventListener('click', function (e) {
  var btn = e.target.closest('.faq-q');
  if (!btn) return;
  var item = btn.closest('.faq-item');
  var isOpen = item.classList.contains('open');

  document.querySelectorAll('.faq-item.open').forEach(function (el) {
    el.classList.remove('open');
    el.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
  });

  if (!isOpen) {
    item.classList.add('open');
    btn.setAttribute('aria-expanded', 'true');
  }
});

// Responsive 2-col grids in lib section (inline style fallback)
(function () {
  var grids = document.querySelectorAll('[style*="grid-template-columns:1fr 1fr"]');
  function checkGrids() {
    grids.forEach(function (g) {
      g.style.gridTemplateColumns = window.innerWidth < 640 ? '1fr' : '1fr 1fr';
    });
  }
  checkGrids();
  window.addEventListener('resize', checkGrids, { passive: true });
})();
