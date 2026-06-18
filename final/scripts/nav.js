export function initNavigation() {
  const toggle = document.querySelector('#menu-toggle');
  const nav = document.querySelector('#nav-menu');

  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    nav.classList.toggle('open');
  });
}

export function initFooterDates() {
  const year = document.querySelector('#year');
  const lastModified = document.querySelector('#lastModified');

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  if (lastModified) {
    lastModified.textContent = `Last Updated: ${document.lastModified}`;
  }
}
