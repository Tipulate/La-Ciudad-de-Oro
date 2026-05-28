// ===== THE GOLDEN CITY — JAVASCRIPT PRINCIPAL =====

document.addEventListener('DOMContentLoaded', () => {

  // ─── NAVEGACIÓN ENTRE PÁGINAS ───────────────────────────────────────────

  const navItems = document.querySelectorAll('.nav-item');
  const pages = {
    inicio: document.getElementById('page-inicio'),
    juegos: document.getElementById('page-juegos'),
    promociones: document.getElementById('page-promociones'),
    vip: document.getElementById('page-vip'),
    soporte: document.getElementById('page-soporte'),
  };

  function showPage(name) {
    Object.values(pages).forEach(p => { if (p) p.classList.remove('active'); });
    navItems.forEach(n => n.classList.remove('active'));
    if (pages[name]) pages[name].classList.add('active');
    const activeNav = document.querySelector(`.nav-item[data-page="${name}"]`);
    if (activeNav) activeNav.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const target = item.dataset.page;
      if (target) showPage(target);
    });
  });

  // Logo lleva a inicio
  document.querySelector('.logo')?.addEventListener('click', () => showPage('inicio'));

  // Mostrar inicio por defecto
  showPage('inicio');

  // ─── MODAL AUTENTICACIÓN ─────────────────────────────────────────────────

  const modalOverlay = document.getElementById('modal-auth');
  const headerBtn = document.getElementById('header-auth-btn');
  const modalClose = document.querySelector('.modal-close');
  const modalTabs = document.querySelectorAll('.modal-tab');
  const modalForms = document.querySelectorAll('.modal-form');

  function openModal(tab = 'login') {
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    switchTab(tab);
  }

  function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  function switchTab(name) {
    modalTabs.forEach(t => t.classList.toggle('active', t.dataset.tab === name));
    modalForms.forEach(f => f.classList.toggle('active', f.id === `form-${name}`));
  }

  headerBtn?.addEventListener('click', () => openModal('login'));
  modalClose?.addEventListener('click', closeModal);
  modalOverlay?.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  modalTabs.forEach(tab => {
    tab.addEventListener('click', () => switchTab(tab.dataset.tab));
  });

  // Links entre formularios
  document.getElementById('link-register')?.addEventListener('click', () => switchTab('register'));
  document.getElementById('link-login')?.addEventListener('click', () => switchTab('login'));

  // Submit forms (visual only)
  document.getElementById('btn-login')?.addEventListener('click', (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    if (!email) { showToast('Por favor ingresa tu correo electrónico', 'warn'); return; }
    showToast('¡Bienvenido a The Golden City!', 'success');
    closeModal();
  });

  document.getElementById('btn-register')?.addEventListener('click', (e) => {
    e.preventDefault();
    const email = document.getElementById('reg-email').value;
    const pass = document.getElementById('reg-pass').value;
    if (!email || !pass) { showToast('Por favor completa todos los campos', 'warn'); return; }
    showToast('¡Cuenta creada exitosamente! Bienvenido.', 'success');
    closeModal();
  });

  // Botón CTA del hero
  document.getElementById('hero-cta-btn')?.addEventListener('click', () => openModal('register'));

  // ─── CATEGORÍAS DE JUEGOS ────────────────────────────────────────────────

  const catBtns = document.querySelectorAll('.juegos-cat-btn');
  const fullGameCards = document.querySelectorAll('.full-game-card');

  catBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      catBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.cat;
      fullGameCards.forEach(card => {
        const show = cat === 'todos' || card.dataset.cat === cat;
        card.style.display = show ? 'block' : 'none';
      });
    });
  });

  // Categorías sidebar inicio
  const sidebarCats = document.querySelectorAll('.sidebar-category');
  const initGameCards = document.querySelectorAll('.game-card');

  sidebarCats.forEach(btn => {
    btn.addEventListener('click', () => {
      sidebarCats.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.cat;
      initGameCards.forEach(card => {
        const show = cat === 'todos' || card.dataset.cat === cat;
        card.style.display = show ? 'block' : 'none';
      });
    });
  });

  // ─── BOTONES "JUGAR" ─────────────────────────────────────────────────────

  document.querySelectorAll('.game-play-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      showToast('Inicia sesión para jugar este juego', 'info');
    });
  });

  // ─── BOTONES PROMO / VIP ──────────────────────────────────────────────────

  document.querySelectorAll('.promo-btn, .vip-claim-btn').forEach(btn => {
    btn.addEventListener('click', () => openModal('register'));
  });

  // ─── TOAST NOTIFICATIONS ──────────────────────────────────────────────────

  function showToast(msg, type = 'info') {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();

    const colors = { success: '#C9A84C', warn: '#C41E3A', info: '#4a90e2' };
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = msg;
    toast.style.cssText = `
      position: fixed;
      bottom: 30px;
      left: 50%;
      transform: translateX(-50%);
      background: #1a0a00;
      border: 1px solid ${colors[type] || colors.info};
      color: ${colors[type] || colors.info};
      font-family: 'Rajdhani', sans-serif;
      font-size: 15px;
      font-weight: 600;
      padding: 12px 28px;
      border-radius: 5px;
      z-index: 9999;
      box-shadow: 0 4px 20px rgba(0,0,0,0.6);
      animation: fadeInUp 0.3s ease;
    `;

    const style = document.createElement('style');
    style.textContent = '@keyframes fadeInUp { from { opacity: 0; transform: translateX(-50%) translateY(10px); } to { opacity: 1; transform: translateX(-50%) translateY(0); } }';
    document.head.appendChild(style);

    document.body.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.3s';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  // ─── GAME CARDS HOVER GLOW ────────────────────────────────────────────────

  document.querySelectorAll('.game-card, .full-game-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.boxShadow = '0 0 20px rgba(201,168,76,0.3)';
    });
    card.addEventListener('mouseleave', function() {
      this.style.boxShadow = '';
    });
  });

  // ─── HERO PARALLAX SUTIL ─────────────────────────────────────────────────

  const heroBg = document.querySelector('.hero-bg img');
  if (heroBg) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      heroBg.style.transform = `translateY(${scrolled * 0.25}px)`;
    }, { passive: true });
  }

});
