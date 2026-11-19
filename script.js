(function () {
  'use strict';

  /* ============================================================
     WHATSAPP
     ============================================================ */
  var TELEFONE = '5519971540808';
  var MENSAGEM = 'Olá Paulo, vim pelo site e preciso do ser serviço como técnico em informática.';
  var btn = document.getElementById('btnWhatsapp');
  if (btn) {
    btn.href = 'https://wa.me/' + TELEFONE + '?text=' + encodeURIComponent(MENSAGEM);
  }

  /* ============================================================
     SPOTLIGHT SEGUINDO O MOUSE
     ============================================================ */
  var spotlight = document.getElementById('spotlight');
  if (spotlight && window.matchMedia('(pointer: fine)').matches) {
    var mx = 50, my = 40, cx = 50, cy = 40;
    window.addEventListener('pointermove', function (e) {
      mx = (e.clientX / window.innerWidth) * 100;
      my = (e.clientY / window.innerHeight) * 100;
    }, { passive: true });
    (function animate() {
      cx += (mx - cx) * 0.08;
      cy += (my - cy) * 0.08;
      spotlight.style.setProperty('--mx', cx + '%');
      spotlight.style.setProperty('--my', cy + '%');
      requestAnimationFrame(animate);
    })();
  }

  /* ============================================================
     PARTÍCULAS
     ============================================================ */
  var particlesBox = document.getElementById('particles');
  if (particlesBox && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var total = window.innerWidth < 640 ? 12 : 22;
    var frag = document.createDocumentFragment();
    for (var i = 0; i < total; i++) {
      var p = document.createElement('span');
      p.className = 'particle';
      p.style.left = Math.random() * 100 + '%';
      p.style.top = (100 + Math.random() * 20) + '%';
      var dur = 14 + Math.random() * 18;
      p.style.animationDuration = dur + 's';
      p.style.animationDelay = (-Math.random() * dur) + 's';
      var scale = 0.5 + Math.random() * 1.2;
      p.style.transform = 'scale(' + scale + ')';
      frag.appendChild(p);
    }
    particlesBox.appendChild(frag);
  }

  /* ============================================================
     TILT SUTIL NO PAINEL
     ============================================================ */
  var panel = document.querySelector('.panel');
  if (
    panel &&
    window.matchMedia('(pointer: fine)').matches &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ) {
    var rafId = null;
    window.addEventListener('pointermove', function (e) {
      if (rafId) return;
      rafId = requestAnimationFrame(function () {
        var rect = panel.getBoundingClientRect();
        var px = (e.clientX - rect.left) / rect.width - 0.5;
        var py = (e.clientY - rect.top) / rect.height - 0.5;
        var rx = (-py * 3).toFixed(2);
        var ry = (px * 3).toFixed(2);
        panel.style.transform = 'perspective(1200px) rotateX(' + rx + 'deg) rotateY(' + ry + 'deg)';
        rafId = null;
      });
    }, { passive: true });

    document.addEventListener('pointerleave', function () {
      panel.style.transform = '';
    });
  }
})();