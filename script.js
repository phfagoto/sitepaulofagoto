(function () {
  'use strict';

  /* ============================================================
     CONFIGURAÇÕES GERAIS DO SITE (EDITE AQUI)
     ============================================================ */
  var SITE_CONFIG = {
    // 1. FAVICON: Coloque o nome do seu arquivo de ícone aqui.
    favicon: "favicon.ico", 

    // 2. GOOGLE ANALYTICS (ID de métrica):
    googleAnalyticsId: "G-TYPXSYT58D",

    // 3. E-MAIL DE CONTATO:
    email: "adm@paulofagoto.com.br", 

    // 3. MENU DE NAVEGAÇÃO: Adicione novas páginas aqui.
    // Para adicionar uma nova, copie uma linha inteira, cole abaixo e mude o nome e o link.
    // Não esqueça da vírgula no final da linha anterior!
    paginas: [
      { nome: "Início", link: "index.html" }
      // Exemplo de como ficará no futuro:
      // ,{ nome: "Serviços", link: "servicos.html" }
      // ,{ nome: "Sobre", link: "sobre.html" }
    ],

    // 4. REDES SOCIAIS (Rodapé): Adicione seus links aqui.
    // O "icone" pode ser um emoji (como 💬 ou 📸) ou o nome da rede.
    redes: [
      // O WhatsApp foi removido. Quando quiser adicionar Instagram, Facebook, etc, use o exemplo abaixo:
      // { nome: "Instagram", icone: "📸", link: "https://instagram.com/seu-perfil" }
    ]
  };

  /* ============================================================
     INJETAR FAVICON
     ============================================================ */
  if (SITE_CONFIG.favicon) {
    var link = document.createElement('link');
    link.rel = 'icon';
    link.type = 'image/x-icon';
    link.href = SITE_CONFIG.favicon;
    document.head.appendChild(link);
  }

  /* ============================================================
     INJETAR GOOGLE ANALYTICS
     ============================================================ */
  if (SITE_CONFIG.googleAnalyticsId) {
    var gaScript = document.createElement('script');
    gaScript.async = true;
    gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=' + SITE_CONFIG.googleAnalyticsId;
    document.head.appendChild(gaScript);

    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', SITE_CONFIG.googleAnalyticsId);
  }

  /* ============================================================
     INJETAR MENU DE NAVEGAÇÃO
     ============================================================ */
  var header = document.getElementById('global-header');
  if (header) {
    var navHTML = '<nav class="global-nav"><ul>';
    SITE_CONFIG.paginas.forEach(function (pagina) {
      // Descobre em qual página o usuário está para pintar o link de azul
      var isActive = window.location.pathname.endsWith(pagina.link) || 
                     (window.location.pathname === '/' && pagina.link === 'index.html') ||
                     (window.location.pathname === '/index.html' && pagina.link === 'index.html');
      var activeClass = isActive ? 'class="active"' : '';
      
      navHTML += '<li><a href="' + pagina.link + '" ' + activeClass + '>' + pagina.nome + '</a></li>';
    });
    navHTML += '</ul></nav>';
    header.innerHTML = navHTML;
  }

  /* ============================================================
     INJETAR RODAPÉ
     ============================================================ */
  var footer = document.getElementById('global-footer');
  if (footer) {
    var footerHTML = '<div class="footer-content">';
    
    // E-mail
    if (SITE_CONFIG.email) {
      footerHTML += '<p class="footer-email"><a href="mailto:' + SITE_CONFIG.email + '">' + SITE_CONFIG.email + '</a></p>';
    }
    
    // Redes Sociais
    if (SITE_CONFIG.redes && SITE_CONFIG.redes.length > 0) {
      footerHTML += '<div class="footer-social">';
      SITE_CONFIG.redes.forEach(function (rede) {
        footerHTML += '<a href="' + rede.link + '" target="_blank" rel="noopener noreferrer">' + rede.icone + ' ' + rede.nome + '</a>';
      });
      footerHTML += '</div>';
    }
    
    footerHTML += '</div>';
    footer.innerHTML = footerHTML;
  }

  /* ============================================================
     WHATSAPP (COM MODAL PERSONALIZADO)
     ============================================================ */
  var TELEFONE = '5519971540808';
  var MENSAGEM = 'Olá Paulo, vim pelo site e preciso do seu serviço como técnico em informática.';
  var btn = document.getElementById('btnWhatsapp');
  
  if (btn) {
    var whatsappUrl = 'https://wa.me/' + TELEFONE + '?text=' + encodeURIComponent(MENSAGEM);
    btn.href = whatsappUrl;

    var modal = document.getElementById('modalAviso');
    var btnCancelar = document.getElementById('btnCancelar');
    var btnConfirmar = document.getElementById('btnConfirmar');

    btn.addEventListener('click', function (e) {
      e.preventDefault();
      modal.classList.add('active');
      modal.setAttribute('aria-hidden', 'false');
    });

    btnCancelar.addEventListener('click', function () {
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
    });

    btnConfirmar.addEventListener('click', function () {
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
      window.open(whatsappUrl, '_blank');
    });

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
        velocidade = 2000;
      } else if (apagando && charIndex === 0) {
        apagando = false;
        fraseIndex = (fraseIndex + 1) % frases.length;
        velocidade = 500;
      }

      setTimeout(type, velocidade);
    }
    
    setTimeout(type, 1500);
  }
})();