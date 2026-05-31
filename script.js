// =========================================
// CUSTOM CURSOR
// =========================================
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursorFollower');

let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top = mouseY + 'px';
});

function animateFollower() {
  followerX += (mouseX - followerX) * 0.12;
  followerY += (mouseY - followerY) * 0.12;
  follower.style.left = followerX + 'px';
  follower.style.top = followerY + 'px';
  requestAnimationFrame(animateFollower);
}
animateFollower();

// =========================================
// NAVBAR SCROLL
// =========================================
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});

// =========================================
// HAMBURGER MENU
// =========================================
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const spans = hamburger.querySelectorAll('span');
  if (navLinks.classList.contains('open')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  }
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  });
});

// =========================================
// TYPED TEXT ANIMATION
// =========================================
const phrases = [
  'Robotics Program Manager',
  'Industry 4.0 Specialist',
  'Embedded Systems Engineer',
  'Technical Leadership Expert',
  'PLC & Automation Expert',
  'Innovation Architect'
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typedEl = document.getElementById('typed');

function type() {
  const current = phrases[phraseIndex];
  if (isDeleting) {
    typedEl.textContent = current.slice(0, charIndex--);
  } else {
    typedEl.textContent = current.slice(0, charIndex++);
  }

  let speed = isDeleting ? 50 : 90;

  if (!isDeleting && charIndex === current.length + 1) {
    speed = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    speed = 400;
  }

  setTimeout(type, speed);
}
type();

// =========================================
// PARTICLE SYSTEM
// =========================================
const particleContainer = document.getElementById('particles');
const PARTICLE_COUNT = 30;

function createParticle() {
  const p = document.createElement('div');
  p.classList.add('particle');
  const size = Math.random() * 3 + 1;
  const left = Math.random() * 100;
  const duration = Math.random() * 15 + 10;
  const delay = Math.random() * 15;
  p.style.cssText = `
    width: ${size}px; height: ${size}px;
    left: ${left}%;
    animation-duration: ${duration}s;
    animation-delay: -${delay}s;
    opacity: ${Math.random() * 0.6 + 0.2};
  `;
  particleContainer.appendChild(p);
}

for (let i = 0; i < PARTICLE_COUNT; i++) createParticle();

// =========================================
// COUNT-UP ANIMATION (HERO STATS)
// =========================================
function animateCount(el) {
  const target = parseInt(el.dataset.count);
  const duration = 1500;
  const start = performance.now();

  function update(time) {
    const elapsed = time - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target);
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = target;
  }
  requestAnimationFrame(update);
}

// =========================================
// INTERSECTION OBSERVER — FADE IN + COUNT
// =========================================
const fadeEls = document.querySelectorAll('.timeline-item, .skill-card, .project-card, .gallery-item, .cert-card, .edu-item, .contact-item');

const ioFade = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
      ioFade.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

fadeEls.forEach(el => {
  el.style.opacity = '0';
  ioFade.observe(el);
});

// Stats counter trigger
const statNumbers = document.querySelectorAll('.stat-number');
const ioStats = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCount(entry.target);
      ioStats.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

statNumbers.forEach(el => ioStats.observe(el));

// =========================================
// ACTIVE NAV LINK ON SCROLL
// =========================================
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

const ioNav = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navItems.forEach(a => a.style.color = '');
      const activeLink = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (activeLink) activeLink.style.color = 'var(--accent)';
    }
  });
}, { threshold: 0.4 });

sections.forEach(section => ioNav.observe(section));

// =========================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// =========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// =========================================
// GALLERY LIGHTBOX
// =========================================
const galleryItems = document.querySelectorAll('.gallery-item');

galleryItems.forEach(item => {
  item.addEventListener('click', () => {
    const img = item.querySelector('img');
    const label = item.querySelector('.gallery-overlay span');

    const lightbox = document.createElement('div');
    lightbox.style.cssText = `
      position: fixed; inset: 0; background: rgba(5,8,17,0.95);
      backdrop-filter: blur(20px); z-index: 9999;
      display: flex; align-items: center; justify-content: center;
      cursor: zoom-out; padding: 24px;
      animation: fadeIn 0.3s ease;
    `;

    const imgEl = document.createElement('img');
    imgEl.src = img.src;
    imgEl.alt = img.alt;
    imgEl.style.cssText = `
      max-width: 90vw; max-height: 88vh; object-fit: contain;
      border-radius: 16px; box-shadow: 0 8px 60px rgba(0,0,0,0.6);
      animation: zoomIn 0.3s ease;
    `;

    const caption = document.createElement('div');
    caption.textContent = label ? label.textContent : '';
    caption.style.cssText = `
      position: absolute; bottom: 32px; left: 50%; transform: translateX(-50%);
      color: rgba(255,255,255,0.8); font-family: 'Outfit', sans-serif;
      font-size: 0.9rem; font-weight: 600; letter-spacing: 0.04em;
      background: rgba(5,8,17,0.7); padding: 8px 20px; border-radius: 999px;
    `;

    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '✕';
    closeBtn.style.cssText = `
      position: absolute; top: 24px; right: 28px;
      background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2);
      color: white; width: 40px; height: 40px; border-radius: 50%;
      font-size: 1rem; cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      transition: background 0.2s;
    `;
    closeBtn.onmouseenter = () => closeBtn.style.background = 'rgba(167,139,250,0.3)';
    closeBtn.onmouseleave = () => closeBtn.style.background = 'rgba(255,255,255,0.1)';

    lightbox.appendChild(imgEl);
    lightbox.appendChild(caption);
    lightbox.appendChild(closeBtn);
    document.body.appendChild(lightbox);
    document.body.style.overflow = 'hidden';

    const close = () => {
      lightbox.style.animation = 'fadeOut 0.2s ease forwards';
      setTimeout(() => {
        document.body.removeChild(lightbox);
        document.body.style.overflow = '';
      }, 200);
    };

    lightbox.addEventListener('click', e => { if (e.target === lightbox) close(); });
    closeBtn.addEventListener('click', close);
    document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); }, { once: true });
  });
});

// Inject lightbox animations
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  @keyframes fadeOut { from { opacity: 1; } to { opacity: 0; } }
  @keyframes zoomIn { from { transform: scale(0.85); opacity: 0; } to { transform: scale(1); opacity: 1; } }
`;
document.head.appendChild(style);

// =========================================
// STAGGERED TIMELINE ANIMATIONS
// =========================================
const timelineItems = document.querySelectorAll('.timeline-item');
const ioTimeline = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      entry.target.style.animationDelay = `${i * 0.1}s`;
      ioTimeline.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

timelineItems.forEach(item => ioTimeline.observe(item));

// =========================================
// PARALLAX ORBS ON MOUSE MOVE
// =========================================
document.addEventListener('mousemove', e => {
  const x = (e.clientX / window.innerWidth - 0.5) * 30;
  const y = (e.clientY / window.innerHeight - 0.5) * 30;
  document.querySelectorAll('.orb').forEach((orb, i) => {
    const depth = (i + 1) * 0.3;
    orb.style.transform = `translate(${x * depth}px, ${y * depth}px)`;
  });
});

console.log('%c✨ Portfolio by Disha | Robotics & Automation Leader', 'color: #a78bfa; font-size: 16px; font-weight: bold;');
