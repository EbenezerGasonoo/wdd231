import { initNavigation, initFooterDates } from './nav.js';

function initPlanForm() {
  const form = document.querySelector('#trip-form');
  const timestamp = document.querySelector('#timestamp');

  if (timestamp) {
    timestamp.value = new Date().toISOString();
  }

  form?.addEventListener('submit', (event) => {
    const email = document.querySelector('#email');
    const visitDate = document.querySelector('#visit-date');

    if (!email?.value || !visitDate?.value) {
      event.preventDefault();
      alert('Please complete all required fields before submitting.');
    }
  });
}

initNavigation();
initFooterDates();
initPlanForm();
