document.addEventListener('DOMContentLoaded', () => {
  // === NAVIGATION MENU TOGGLE ===
  const toggle = document.getElementById('menu-toggle');
  const nav = document.getElementById('nav-menu');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', !expanded);
      nav.classList.toggle('open');
    });
  }

  // === TIMESTAMP FOR FORMS ===
  const timestampField = document.getElementById("timestamp");
  if (timestampField) {
    const now = new Date();
    timestampField.value = now.toLocaleString();
  }

  // === LAST MODIFIED FOOTER DATE ===
  const lastModSpan = document.getElementById("lastModified");
  if (lastModSpan) {
    lastModSpan.textContent = document.lastModified;
  }

  // === MEMBER DIRECTORY (GRID/LIST VIEW) ===
  const membersContainer = document.querySelector('#members');
  const gridBtn = document.getElementById('grid-btn');
  const listBtn = document.getElementById('list-btn');

  if (membersContainer && gridBtn && listBtn) {
    async function getMembers() {
      const response = await fetch('data/members.json');
      const data = await response.json();
      displayMembers(data.members);
    }

    function displayMembers(members) {
      membersContainer.innerHTML = '';
      members.forEach(member => {
        const card = document.createElement('div');
        card.classList.add('member-card');

        card.innerHTML = `
          <img src="images/${member.image}" alt="${member.name} Logo">
          <h3>${member.name}</h3>
          <p>${member.address}</p>
          <p>${member.phone}</p>
          <a href="${member.website}" target="_blank">Visit Website</a>
          <p class="level">${member.membership} Member</p>
        `;

        membersContainer.appendChild(card);
      });
    }

    gridBtn.addEventListener('click', () => {
      membersContainer.classList.add('grid-view');
      membersContainer.classList.remove('list-view');
    });

    listBtn.addEventListener('click', () => {
      membersContainer.classList.add('list-view');
      membersContainer.classList.remove('grid-view');
    });

    getMembers();
  }

  // === WEATHER API (CURRENT + 3-DAY FORECAST) ===
  const currentTemp = document.querySelector('#weather-temp');
  const weatherDesc = document.querySelector('#weather-desc');
  const forecast = document.querySelector('#forecast');

  if (currentTemp && weatherDesc && forecast) {
    const apiKey = '3f05813278c93c4afa09969dad0f6fdb';
    const lat = 5.669;
    const lon = -0.017;

    async function getWeather() {
      const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
      const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

      const [weatherRes, forecastRes] = await Promise.all([
        fetch(weatherURL),
        fetch(forecastURL)
      ]);

      const weatherData = await weatherRes.json();
      const forecastData = await forecastRes.json();

      currentTemp.innerHTML = `${weatherData.main.temp.toFixed(1)}°C`;
      weatherDesc.textContent = weatherData.weather[0].description;

      const daily = forecastData.list.filter(item => item.dt_txt.includes('12:00:00'));
      forecast.innerHTML = daily.slice(0, 3).map(item => {
        const day = new Date(item.dt_txt).toLocaleDateString('en-US', { weekday: 'short' });
        return `<div><strong>${day}:</strong> ${item.main.temp.toFixed(1)}°C</div>`;
      }).join('');
    }

    getWeather();
  }

  // === SPOTLIGHT ADS FOR GOLD/SILVER MEMBERS ===
  const spotlightContainer = document.querySelector('.spotlight-grid');

  if (spotlightContainer) {
    fetch('data/members.json')
      .then(res => res.json())
      .then(data => {
        const eligible = data.members.filter(m =>
          m.membership === 'Gold' || m.membership === 'Silver'
        );

        const shuffled = eligible.sort(() => 0.5 - Math.random()).slice(0, 3);

        spotlightContainer.innerHTML = shuffled.map(member => `
          <div class="spotlight">
            <img src="images/${member.image}" alt="${member.name} logo" loading="lazy" onerror="this.src='images/default-logo.png';">
            <h3>${member.name}</h3>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <a href="${member.website}" target="_blank">Visit Website</a>
          </div>
        `).join('');
      })
      .catch(err => console.error('Spotlight load error:', err));
  }

  // === MEET & GREET BANNER (MON–WED ONLY) ===
  const day = new Date().getDay(); // Sunday = 0

  if (day >= 1 && day <= 3) {
    const banner = document.createElement('div');
    banner.id = 'meet-banner';
    banner.innerHTML = `
      <p>📣 Chamber Meet & Greet – Wednesday @ 7:00 PM</p>
      <button id="close-banner">❌</button>
    `;
    document.body.prepend(banner);

    document.getElementById('close-banner').addEventListener('click', () => {
      banner.remove();
    });
  }
});
