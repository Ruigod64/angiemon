/* ══════════════════════════════════════════════════
   AngieMon · Canciones — Audio Player
   Play / pause con un solo audio activo a la vez
   ══════════════════════════════════════════════════ */

(function () {
  'use strict';

  let activeAudio = null;
  let activeBtn   = null;

  function setIcon(btn, playing) {
    const svg = btn.querySelector('svg');
    svg.setAttribute('fill', 'currentColor');
    svg.removeAttribute('stroke');
    svg.removeAttribute('stroke-width');
    svg.removeAttribute('stroke-linecap');
    svg.removeAttribute('stroke-linejoin');
    svg.innerHTML = playing
      ? '<rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>'
      : '<polygon points="5,3 19,12 5,21"/>';
  }

  document.querySelectorAll('.cancion-card__cta[data-audio]').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();

      /* Mismo botón → toggle */
      if (activeBtn === this) {
        if (activeAudio.paused) {
          activeAudio.play();
          setIcon(this, true);
        } else {
          activeAudio.pause();
          setIcon(this, false);
        }
        return;
      }

      /* Botón diferente → detener el actual */
      if (activeAudio) {
        activeAudio.pause();
        setIcon(activeBtn, false);
      }

      activeAudio = new Audio(this.dataset.audio);
      activeBtn   = this;
      activeAudio.play();
      setIcon(this, true);

      activeAudio.addEventListener('ended', function () {
        setIcon(activeBtn, false);
        activeAudio = null;
        activeBtn   = null;
      });
    });
  });
})();
