// Shared behaviour across all pages: mobile nav toggle + active link + footer year.
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', nav.classList.contains('open'));
    });
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));
  }

  // Mark active nav link based on current path
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.main-nav a[data-page]').forEach(a => {
    if (a.dataset.page === path) a.classList.add('active');
  });

  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});

// Small helper used by portfolio.js / insights.js
async function loadJSON(path) {
  try {
    const res = await fetch(path);
    if (!res.ok) throw new Error('Failed to load ' + path);
    return await res.json();
  } catch (err) {
    console.error(err);
    return [];
  }
}
