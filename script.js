(function () {
  'use strict';

  /* ============================================================
     WHATSAPP (COM MODAL PERSONALIZADO)
     ============================================================ */
  var TELEFONE = '5519971540808';
  var MENSAGEM = 'Olá Paulo, vim pelo site e preciso do seu serviço como técnico em informática.';
  var btn = document.getElementById('btnWhatsapp');
  
  if (btn) {
    var whatsappUrl = 'https://wa.me/' + TELEFONE + '?text=' + encodeURIComponent(MENSAGEM);
    btn.href = whatsappUrl;

    // Elementos do Modal
    var modal = document.getElementById('modalAviso');
    var btnCancelar = document.getElementById('btnCancelar');
    var btnConfirmar = document.getElementById('btnConfirmar');

    // Abre o modal ao clicar no botão do WhatsApp
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      modal.classList.add('active');
      modal.setAttribute('aria-hidden', 'false');
    });

    // Fecha o modal ao clicar em "Cancelar"
    btnCancelar.addEventListener('click', function () {
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
    });

    // Abre o WhatsApp e fecha o modal ao clicar em "Confirmar"
    btnConfirmar.addEventListener('click', function () {
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
      window.open(whatsappUrl, '_blank');
    });

    // Fecha o modal se o usuário clicar fora da caixinha
    modal.addEventListener('click', function (e) {
      if (e.target === modal) {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
      }
    });
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

  /* ============================================================
     EFEITO DE TEXTO DIGITANDO
     ============================================================ */
  var typingText = document.getElementById('typing-text');
  if (typingText && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var frases = [
	  "Visita Técnica em Valinhos e Vinhedo/SP.",
      "Formatação de Notebook e PC a domicílio.",
      "Formatação para o Windows 10 e 11.",
      "Instalação de programas e impressoras.",
      "Desenvolvimento de Sites e Suporte Remoto."
    ];
    var fraseIndex = 0;
    var charIndex = 0;
    var apagando = false;
    var velocidade = 80;

    function type() {
      var fraseAtual = frases[fraseIndex];
      
      if (apagando) {
        typingText.textContent = fraseAtual.substring(0, charIndex - 1);
        charIndex--;
        velocidade = 40;
      } else {
        typingText.textContent = fraseAtual.substring(0, charIndex + 1);
        charIndex++;
        velocidade = 100;
      }

      if (!apagando && charIndex === fraseAtual.length) {
        apagando = true;
        velocidade = 2000; // Pausa no final da frase
      } else if (apagando && charIndex === 0) {
        apagando = false;
        fraseIndex = (fraseIndex + 1) % frases.length;
        velocidade = 500; // Pausa antes de começar a próxima
      }

      setTimeout(type, velocidade);
    }
    
    // Inicia o efeito após um pequeno atraso para sincronizar com a animação CSS
    setTimeout(type, 1500);
  }
})();