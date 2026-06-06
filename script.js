// ==========================================
// TAB SWITCHING
// ==========================================
function switchTab(tab) {
  const panels = document.querySelectorAll('.tab-panel');
  const stabs = document.querySelectorAll('.stab');
  const tnls = document.querySelectorAll('.tnl');
  const aboutSidebar = document.getElementById('about-sidebar');

  panels.forEach(p => p.classList.remove('active'));
  stabs.forEach(s => s.classList.remove('stab-active'));
  tnls.forEach(l => l.classList.remove('active'));

  document.getElementById(tab + '-tab').classList.add('active');
  document.getElementById('stab-' + tab).classList.add('stab-active');

  const tnlBtn = document.getElementById('tab-' + tab + '-btn');
  if (tnlBtn) tnlBtn.classList.add('active');

  if (tab === 'about') {
    aboutSidebar.classList.add('visible');
  } else {
    aboutSidebar.classList.remove('visible');
  }

  // Scroll to top of main content
  document.getElementById('main-content').scrollTo({ top: 0, behavior: 'smooth' });
}

// Wire up nav links
document.getElementById('tab-about-btn').addEventListener('click', (e) => {
  e.preventDefault(); switchTab('about');
});
document.getElementById('tab-portfolio-btn').addEventListener('click', (e) => {
  e.preventDefault(); switchTab('portfolio');
});

// ==========================================
// HAMBURGER (MOBILE SIDEBAR TOGGLE)
// ==========================================
const hamburger = document.getElementById('hamburger');
const sidebar = document.getElementById('sidebar');

hamburger.addEventListener('click', () => {
  sidebar.classList.toggle('open');
});

// Close sidebar on outside click
document.addEventListener('click', (e) => {
  if (window.innerWidth <= 768 && sidebar.classList.contains('open')) {
    if (!sidebar.contains(e.target) && !hamburger.contains(e.target)) {
      sidebar.classList.remove('open');
    }
  }
});

// ==========================================
// COUNT-UP ANIMATION (HERO STATS)
// ==========================================
function countUp(el) {
  const target = parseInt(el.dataset.count, 10);
  const duration = 1200;
  const start = performance.now();
  function tick(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target);
    if (progress < 1) requestAnimationFrame(tick);
    else el.textContent = target;
  }
  requestAnimationFrame(tick);
}

const ioStats = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      countUp(entry.target);
      ioStats.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.phs-num[data-count]').forEach(el => ioStats.observe(el));

// ==========================================
// SKILL BAR ANIMATION
// ==========================================
const skillBars = document.querySelectorAll('.csr-fill');
const ioBars = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const targetWidth = entry.target.style.width;
      entry.target.style.width = '0%';
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          entry.target.style.width = targetWidth;
        });
      });
      ioBars.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });
skillBars.forEach(bar => ioBars.observe(bar));

// ==========================================
// SCROLL-TRIGGERED FADE IN
// ==========================================
const fadeTargets = document.querySelectorAll(
  '.proj-card, .poem-card, .creation-card, .lwd-card, .pillar-card, .exp-card, .gal-item'
);

const ioFade = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.transition = 'opacity 0.55s ease, transform 0.55s ease';
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      ioFade.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

fadeTargets.forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(18px)';
  el.style.transitionDelay = (i % 4 * 0.08) + 's';
  ioFade.observe(el);
});

// ==========================================
// GALLERY LIGHTBOX
// ==========================================
const lightbox = document.getElementById('lightbox');
const lbImg    = document.getElementById('lbImg');
const lbCap    = document.getElementById('lbCaption');
const lbClose  = document.getElementById('lbClose');

document.querySelectorAll('.gal-item').forEach(item => {
  item.addEventListener('click', () => {
    const img = item.querySelector('img');
    const cap = item.querySelector('.gal-caption');
    lbImg.src = img.src;
    lbImg.alt = img.alt;
    lbCap.textContent = cap ? cap.textContent : '';
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
});

lbClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
  setTimeout(() => { lbImg.src = ''; }, 300);
}

// ==========================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ==========================================
// POEM CARD — EXPAND ON CLICK (MOBILE)
// ==========================================
document.querySelectorAll('.poem-card').forEach(card => {
  card.addEventListener('click', () => {
    card.classList.toggle('poem-expanded');
  });
});

// ==========================================
// ACTIVE SECTION HIGHLIGHT IN NAV
// ==========================================
const portfolioSections = document.querySelectorAll('.content-section[id]');
const ioSection = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Could highlight sidebar later
    }
  });
}, { threshold: 0.3 });

portfolioSections.forEach(s => ioSection.observe(s));

// ==========================================
// TOPNAV SHADOW ON SCROLL
// ==========================================
window.addEventListener('scroll', () => {
  const topnav = document.getElementById('topnav');
  if (window.scrollY > 8) {
    topnav.style.boxShadow = '0 2px 12px rgba(0,0,0,0.08)';
  } else {
    topnav.style.boxShadow = 'none';
  }
});

// ==========================================
// INIT
// ==========================================
// Start on portfolio tab by default
switchTab('portfolio');

console.log('%c📐 Disha Goswami — Portfolio', 'color: #7c3aed; font-size: 14px; font-weight: bold;');
