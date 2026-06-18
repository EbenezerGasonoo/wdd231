import { initNavigation, initFooterDates } from './nav.js';

function displaySubmission() {
  const summary = document.querySelector('#submission-summary');
  if (!summary) return;

  try {
    const params = new URLSearchParams(window.location.search);

    if (params.toString().length === 0) {
      summary.innerHTML = `<p role="alert">No trip plan data was received.</p>`;
      return;
    }

    const interests = params.getAll('interests').join(', ') || 'None selected';
    const fields = [
      ['Full Name', params.get('fullName')],
      ['Email', params.get('email')],
      ['Visit Date', params.get('visitDate')],
      ['Group Size', params.get('groupSize')],
      ['Experience Level', params.get('experience')],
      ['Interests', interests],
      ['Comments', params.get('comments') || 'None'],
      ['Submitted', params.get('timestamp')]
    ];

    summary.innerHTML = `
      <h2>Trip Plan Received</h2>
      <p>Thank you! Here is the information you submitted:</p>
      <dl>
        ${fields
          .map(([label, value]) => `<dt>${label}</dt><dd>${value || '—'}</dd>`)
          .join('')}
      </dl>
    `;
  } catch (error) {
    console.error('Submission display error:', error);
    summary.innerHTML = `<p class="weather-error" role="alert">There was a problem reading your submission.</p>`;
  }
}

initNavigation();
initFooterDates();
displaySubmission();
