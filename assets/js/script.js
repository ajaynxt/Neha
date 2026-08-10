const demoSites = [
  { name: 'Celestique Jewellery', type: 'Luxury Retail', category: 'commerce', url: 'https://jewellery.ajaynxt.com/' },
  { name: 'Rajmahal Lake Palace', type: 'Luxury Hospitality', category: 'hospitality', url: 'https://hotel.ajaynxt.com/' },
  { name: 'Mediora Diagnostics', type: 'Healthcare / Diagnostics', category: 'healthcare', url: 'https://diagnostic.ajaynxt.com/' },
  { name: 'Stonecrest Developers', type: 'Construction', category: 'property', url: 'https://construction.ajaynxt.com/' },
  { name: 'CasaForma Living', type: 'Interiors & Furniture', category: 'interiors', url: 'https://furniture.ajaynxt.com/' },
  { name: 'Solvanta Energy', type: 'Solar Energy', category: 'other', url: 'https://solar.ajaynxt.com/' },
  { name: 'Aurevia Retreat & Spa', type: 'Resort & Wellness', category: 'hospitality', url: 'https://stay.ajaynxt.com/' },
  { name: 'Velora Health Institute', type: 'Multi-speciality Hospital', category: 'healthcare', url: 'https://health.ajaynxt.com/' },
  { name: 'Arclune Estates', type: 'Luxury Real Estate', category: 'property', url: 'https://realty.ajaynxt.com/' },
  { name: 'Velune Skin', type: 'D2C Ecommerce', category: 'commerce', url: 'https://shop.ajaynxt.com/' },
  { name: 'Nexora Academy', type: 'Coaching & Learning', category: 'other', url: 'https://academy.2.ajaynxt.com/' },
  { name: 'Meroza Kitchen', type: 'Food Ordering', category: 'food', url: 'https://food.ajaynxt.com/' },
  { name: 'Aureon Motors', type: 'Automobile', category: 'other', url: 'https://auto.2.ajaynxt.com/' },
  { name: 'Real Estate / Property', type: 'Property Website', category: 'property', url: 'https://estate.ajaynxt.com/' },
  { name: 'Wedding Planner / Photographer', type: 'Wedding Service', category: 'other', url: 'https://wedding.ajaynxt.com/' },
  { name: 'Salon / Spa / Beauty', type: 'Beauty Service', category: 'other', url: 'https://salon.ajaynxt.com/' },
  { name: 'Travel / Homestay', type: 'Travel & Hospitality', category: 'hospitality', url: 'https://travel.ajaynxt.com/' },
  { name: 'Interior Designer / Architect', type: 'Architecture & Interiors', category: 'interiors', url: 'https://interior.ajaynxt.com/' },
  { name: 'Fashion / Product Store', type: 'Retail Ecommerce', category: 'commerce', url: 'https://store.ajaynxt.com/' },
  { name: 'SaaS / Business Software', type: 'Professional / SaaS', category: 'other', url: 'https://saas.ajaynxt.com/' },
  { name: 'Restaurant / Cafe', type: 'Food & Hospitality', category: 'food', url: 'https://restaurant.ajaynxt.com/' },
  { name: 'Fitness / Gym', type: 'Fitness Service', category: 'other', url: 'https://fitness.ajaynxt.com/' },
  { name: 'Clinic / Doctor', type: 'Healthcare / Clinic', category: 'healthcare', url: 'https://clinic.ajaynxt.com/' },
  { name: 'Lawyer / Legal Consultant', type: 'Professional / Legal', category: 'other', url: 'https://legal.ajaynxt.com/' },
  { name: 'Eye Care Website', type: 'Healthcare / Eye Clinic', category: 'healthcare', url: 'https://eye.ajaynxt.com/' }
];

const demoGrid = document.getElementById('demoGrid');
const filters = [...document.querySelectorAll('.filter-chip')];

function renderDemos(filter = 'all') {
  const list = filter === 'all' ? demoSites : demoSites.filter(site => site.category === filter);
  demoGrid.innerHTML = list.map((site) => {
    const index = demoSites.indexOf(site) + 1;
    return `
      <a class="demo-card" href="${site.url}" target="_blank" rel="noopener noreferrer">
        <div class="demo-card-top"><span>${String(index).padStart(2, '0')}</span><span>${site.type}</span></div>
        <div><h3>${site.name}</h3><p>Live demo</p></div>
        <span class="demo-card-arrow" aria-hidden="true">↗</span>
      </a>`;
  }).join('') || '<p class="demo-empty">No demos in this category yet.</p>';
}

filters.forEach(button => {
  button.addEventListener('click', () => {
    filters.forEach(btn => btn.classList.remove('is-active'));
    button.classList.add('is-active');
    renderDemos(button.dataset.filter);
  });
});
renderDemos();

// Scroll-controlled cinematic videos. Boundary-safe on desktop and mobile.
const heroSection = document.querySelector('.hero-scroll');
const heroSticky = heroSection?.querySelector('.hero-sticky');
const heroVideo = document.getElementById('heroVideo');
const heroProgress = document.getElementById('heroProgress');
const heroCopies = [...document.querySelectorAll('[data-hero-copy]')];
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const pairSections = [...document.querySelectorAll('[data-scroll-pair]')].map(section => ({
  section,
  sticky: section.querySelector('.cinematic-sticky'),
  videoA: section.querySelector('.cinematic-video-a'),
  videoB: section.querySelector('.cinematic-video-b'),
  copyA: section.querySelector('[data-pair-copy="a"]'),
  copyB: section.querySelector('[data-pair-copy="b"]'),
  progress: section.querySelector('.cinematic-progress span')
}));
let heroDuration = 19.18;
let ticking = false;

function clamp(value, min = 0, max = 1) {
  return Math.max(min, Math.min(max, value));
}

function smoothstep(edge0, edge1, value) {
  const x = clamp((value - edge0) / Math.max(.0001, edge1 - edge0));
  return x * x * (3 - 2 * x);
}

function primeVideo(video) {
  if (!video) return;
  video.muted = true;
  video.pause();
  const prime = () => {
    try { video.currentTime = Math.min(.04, Math.max(0, video.duration || .04)); } catch (e) {}
  };
  if (video.readyState >= 1) prime();
  else video.addEventListener('loadedmetadata', prime, { once: true });
}

function seekVideo(video, progress) {
  if (!video || video.readyState < 1 || !Number.isFinite(video.duration)) return;
  const target = clamp(progress) * Math.max(.1, video.duration - .06);
  // Frequent keyframes in the optimized MP4s make this seek smooth and predictable.
  if (Math.abs(video.currentTime - target) > .04) {
    try { video.currentTime = target; } catch (e) {}
  }
}

if (heroVideo) {
  heroVideo.addEventListener('loadedmetadata', () => {
    if (Number.isFinite(heroVideo.duration)) heroDuration = heroVideo.duration;
    primeVideo(heroVideo);
    updateScrollExperience();
  });
  primeVideo(heroVideo);
}
pairSections.forEach(pair => {
  primeVideo(pair.videoA);
  primeVideo(pair.videoB);
});

function stickyTravel(section, sticky) {
  // Never use window.innerHeight here. Mobile browser chrome changes that value while
  // scrolling and can make the scrub boundary jump or "break".
  const stickyHeight = sticky?.offsetHeight || document.documentElement.clientHeight;
  return Math.max(1, section.offsetHeight - stickyHeight);
}

function updateHero() {
  if (reducedMotion || !heroSection || !heroSticky || !heroVideo) return;
  const rect = heroSection.getBoundingClientRect();
  const progress = clamp(-rect.top / stickyTravel(heroSection, heroSticky));
  seekVideo(heroVideo, progress);
  if (heroProgress) heroProgress.style.transform = `scaleX(${progress})`;
  const activeIndex = progress < .32 ? 0 : progress < .68 ? 1 : 2;
  heroCopies.forEach((copy, i) => copy.classList.toggle('is-active', i === activeIndex));
}

function updatePairs() {
  if (reducedMotion) return;
  const viewport = document.documentElement.clientHeight;

  pairSections.forEach(pair => {
    const rect = pair.section.getBoundingClientRect();
    if (rect.bottom < -viewport * .35 || rect.top > viewport * 1.35) return;

    const progress = clamp(-rect.top / stickyTravel(pair.section, pair.sticky));

    // A owns the first half and B the second. Small overlap removes the hard seam,
    // while both clips still scrub from their real first to last frames.
    const localA = clamp(progress / .54);
    const localB = clamp((progress - .46) / .54);
    seekVideo(pair.videoA, localA);
    seekVideo(pair.videoB, localB);

    const blend = smoothstep(.44, .56, progress);
    pair.videoA.style.opacity = String(1 - blend);
    pair.videoB.style.opacity = String(blend);
    pair.copyA.classList.toggle('is-active', progress < .5);
    pair.copyB.classList.toggle('is-active', progress >= .5);
    if (pair.progress) pair.progress.style.transform = `scaleX(${progress})`;
  });
}

function updateScrollExperience() {
  updateHero();
  updatePairs();
  const header = document.getElementById('siteHeader');
  if (header) header.classList.toggle('is-scrolled', window.scrollY > 20);
}

function onScroll() {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    updateScrollExperience();
    ticking = false;
  });
}

window.addEventListener('scroll', onScroll, { passive: true });
window.addEventListener('resize', () => requestAnimationFrame(updateScrollExperience), { passive: true });
window.addEventListener('orientationchange', () => setTimeout(updateScrollExperience, 180), { passive: true });
updateScrollExperience();

// Reveal animations
if (!reducedMotion) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -4% 0px' });
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
} else {
  document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));
}

// Video modal
const modal = document.getElementById('videoModal');
const modalVideo = document.getElementById('modalVideo');
const modalTitle = document.getElementById('videoModalTitle');
let lastFocus = null;

function openVideo(card, trigger) {
  lastFocus = trigger;
  const preferred = card.dataset.video;
  const fallback = card.dataset.videoFallback;
  modalTitle.textContent = card.dataset.title || 'Video';
  modalVideo.src = preferred;
  if (fallback) {
    const handleError = () => {
      modalVideo.removeEventListener('error', handleError);
      modalVideo.src = fallback;
      modalVideo.play().catch(() => {});
    };
    modalVideo.addEventListener('error', handleError, { once: true });
  }
  modal.hidden = false;
  document.body.classList.add('modal-open');
  requestAnimationFrame(() => modal.querySelector('.modal-close').focus());
  modalVideo.play().catch(() => {});
}

function closeVideo() {
  modalVideo.pause();
  modalVideo.removeAttribute('src');
  modalVideo.load();
  modal.hidden = true;
  document.body.classList.remove('modal-open');
  if (lastFocus) lastFocus.focus();
}

document.querySelectorAll('.film-card').forEach(card => {
  const button = card.querySelector('.play-button');
  button.addEventListener('click', () => openVideo(card, button));
});
document.querySelectorAll('[data-close-modal]').forEach(el => el.addEventListener('click', closeVideo));
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && !modal.hidden) closeVideo();
});

// Mobile navigation
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('primaryNav');
menuToggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('is-open');
  menuToggle.setAttribute('aria-expanded', 'false');
}));

// Desktop cursor detail
const cursor = document.querySelector('.cursor-dot');
if (window.matchMedia('(pointer:fine)').matches) {
  window.addEventListener('mousemove', e => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
    cursor.style.opacity = '1';
  });
  document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('is-big'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('is-big'));
  });
}

document.getElementById('year').textContent = new Date().getFullYear();
