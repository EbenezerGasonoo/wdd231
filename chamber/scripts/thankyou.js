document.addEventListener('DOMContentLoaded', () => {
  const summary = document.getElementById('submission-details');

  if (!summary) return;

  const params = new URLSearchParams(window.location.search);
  const fields = [
    ['First Name', 'firstName'],
    ['Last Name', 'lastName'],
    ['Email Address', 'email'],
    ['Mobile Phone', 'phone'],
    ['Organization Name', 'orgName'],
    ['Submitted On', 'timestamp']
  ];

  if (params.toString().length === 0) {
    summary.innerHTML = '<p role="alert">No application data was received.</p>';
    return;
  }

  const items = fields
    .map(([label, key]) => {
      const value = params.get(key);
      return value ? `<dt>${label}</dt><dd>${value}</dd>` : '';
    })
    .join('');

  summary.innerHTML = `
    <h3>Your Application Details</h3>
    <dl>${items}</dl>
  `;
});
