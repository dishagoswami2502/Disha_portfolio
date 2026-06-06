/* ============================================================
   PORTFOLIO SCRIPT — DISHA GOSWAMI
   ============================================================ */

// ── NAV ──────────────────────────────────────────────────────
const nav = document.getElementById('nav');
const navBurger = document.getElementById('navBurger');
const navMobile = document.getElementById('navMobile');
const navLinks  = document.querySelectorAll('.nav-link');

// Scroll shadow + active link
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
  highlightNavLink();
}, { passive: true });

// Mobile menu
navBurger.addEventListener('click', () => {
  navBurger.classList.toggle('open');
  navMobile.classList.toggle('open');
});

// Close mobile menu on link click
document.querySelectorAll('.nm-link').forEach(link => {
  link.addEventListener('click', () => {
    navBurger.classList.remove('open');
    navMobile.classList.remove('open');
  });
});

// Active nav highlight based on scroll position
function highlightNavLink() {
  const sections = document.querySelectorAll('section[id]');
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 100) current = s.id;
  });
  navLinks.forEach(l => {
    l.classList.toggle('active', l.getAttribute('href') === '#' + current);
  });
}

// ── COUNT-UP ─────────────────────────────────────────────────
function countUp(el) {
  const target = parseInt(el.dataset.count, 10);
  if (isNaN(target)) return;
  const duration = 1600;
  const start = performance.now();
  function tick(now) {
    const p = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 4);
    el.textContent = Math.round(eased * target);
    if (p < 1) requestAnimationFrame(tick);
    else el.textContent = target;
  }
  requestAnimationFrame(tick);
}

const ioCount = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { countUp(e.target); ioCount.unobserve(e.target); }
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-count]').forEach(el => ioCount.observe(el));

// ── SCROLL REVEAL ─────────────────────────────────────────────
const ioReveal = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), e.target.dataset.delay || 0);
      ioReveal.unobserve(e.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

// Auto-apply reveal to key elements
const revealSelectors = [
  '.jcard', '.bento-card', '.proj-row', '.gg-item',
  '.poem', '.course-card', '.ccs-card', '.pgr-card',
  '.about-grid', '.contact-layout', '.passion-layout',
  '.hero-stats', '.trusted-strip'
];
document.querySelectorAll(revealSelectors.join(', ')).forEach((el, i) => {
  el.classList.add('reveal');
  el.dataset.delay = (i % 4) * 80;
  ioReveal.observe(el);
});

// ── GALLERY LIGHTBOX ─────────────────────────────────────────
const lightbox = document.getElementById('lightbox');
const lbImg    = document.getElementById('lbImg');
const lbCap    = document.getElementById('lbCap');
const lbClose  = document.getElementById('lbClose');

document.querySelectorAll('.gg-item').forEach(item => {
  item.addEventListener('click', () => {
    const img = item.querySelector('img');
    const cap = item.querySelector('.gg-overlay span');
    lbImg.src = img.src;
    lbImg.alt = img.alt;
    lbCap.textContent = cap ? cap.textContent : '';
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
});

lbClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
  setTimeout(() => { lbImg.src = ''; }, 300);
}

// ── SMOOTH SCROLL ────────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
});

// ── HERO IMAGE PARALLAX (SUBTLE) ─────────────────────────────
const heroImg = document.getElementById('heroImg');
if (heroImg) {
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    if (scrolled < 800) {
      heroImg.style.transform = `translateY(${scrolled * 0.08}px)`;
    }
  }, { passive: true });
}

console.log('%c✦ Disha Goswami Portfolio', 'color:#7c3aed; font-size:13px; font-weight:800;');
