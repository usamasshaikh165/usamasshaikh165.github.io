document.getElementById('year').textContent = new Date().getFullYear();

// Scroll-reveal, powered by the AOS library (https://michalsnik.github.io/aos/)
// instead of a hand-rolled IntersectionObserver.
AOS.init({ duration: 600, once: true, offset: 80 });

// Count-up stats in the hero, triggered once when scrolled into view.
const statObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = parseInt(el.dataset.count, 10);
    const suffix = el.dataset.suffix || '';
    const duration = 900;
    const start = performance.now();
    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target) + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
    statObserver.unobserve(el);
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-num').forEach((el) => statObserver.observe(el));

// Animate skill bars from 0 to their target width once visible.
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    el.style.width = el.dataset.level + '%';
    skillObserver.unobserve(el);
  });
}, { threshold: 0.3 });

document.querySelectorAll('.skill-bar-fill').forEach((el) => skillObserver.observe(el));

// Mobile nav toggle.
const navToggle = document.querySelector('.nav-toggle');
const navMobileMenu = document.querySelector('.nav-mobile-menu');

navToggle.addEventListener('click', () => {
  const isOpen = navMobileMenu.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
});

navMobileMenu.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navMobileMenu.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// Light/dark theme toggle, persisted in localStorage.
const themeToggle = document.querySelector('.theme-toggle');

themeToggle.addEventListener('click', () => {
  const isLight = document.documentElement.getAttribute('data-theme') === 'light';
  if (isLight) {
    document.documentElement.removeAttribute('data-theme');
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
  }
  try {
    localStorage.setItem('theme', isLight ? 'dark' : 'light');
  } catch (e) {}
});

// FAQ accordion.
document.querySelectorAll('.faq-item').forEach((item) => {
  const question = item.querySelector('.faq-question');
  question.addEventListener('click', () => {
    const isOpen = item.classList.contains('is-open');
    document.querySelectorAll('.faq-item').forEach((i) => i.classList.remove('is-open'));
    if (!isOpen) item.classList.add('is-open');
  });
});
