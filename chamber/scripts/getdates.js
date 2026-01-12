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

  // === CURRENT YEAR & LAST MODIFIED FOOTER ===
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

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
      try {
        const response = await fetch('data/members.json');
        if (!response.ok) {
          throw new Error(`Directory request failed: ${response.status}`);
        }

        const data = await response.json();
        if (!data || !Array.isArray(data.members)) {
          throw new Error('Directory data is not formatted correctly.');
        }

        displayMembers(data.members);
      } catch (error) {
        console.error('Member directory error:', error);
        membersContainer.innerHTML = `
          <p class="directory-error" role="alert">
            We’re having trouble loading the member directory. Please refresh the page or try again shortly.
          </p>
        `;
      }
    }

    function displayMembers(members) {
      membersContainer.innerHTML = '';
      membersContainer.setAttribute('role', 'list');

      const sortedMembers = [...members].sort((a, b) =>
        a.name.localeCompare(b.name, undefined, { sensitivity: 'base' })
      );

      sortedMembers.forEach(member => {
        const {
          name,
          address,
          phone,
          website,
          image,
          membership,
          industry
        } = member;

        const memberLevel = membership || 'Member';

        const card = document.createElement('article');
        card.classList.add('member-card');
        card.setAttribute('role', 'listitem');
        card.dataset.membership = memberLevel.toLowerCase();

        const logo = document.createElement('img');
        const imagePath = image && image.startsWith('http')
          ? image
          : `images/${image}`;
        logo.src = imagePath;
        logo.alt = `${name} logo`;
        logo.width = 120;
        logo.height = 120;
        logo.loading = 'lazy';
        logo.decoding = 'async';
        logo.referrerPolicy = 'no-referrer';
        logo.onerror = () => {
          logo.remove();
        };

        const memberName = document.createElement('h3');
        memberName.textContent = name;

        const addressLine = document.createElement('p');
        addressLine.classList.add('address');
        addressLine.textContent = address;

        const phoneLine = document.createElement('p');
        phoneLine.classList.add('phone');
        phoneLine.textContent = phone;

        const websiteLink = document.createElement('a');
        websiteLink.classList.add('website-link');
        const safeWebsite = website && website.startsWith('http')
          ? website
          : `https://${website}`;
        websiteLink.href = safeWebsite;
        websiteLink.target = '_blank';
        websiteLink.rel = 'noopener';
        websiteLink.textContent = 'Visit Website';
        websiteLink.setAttribute('aria-label', `Visit ${name} website`);

        const level = document.createElement('p');
        level.classList.add('level');
        level.textContent = `${memberLevel} Member`;

        card.append(logo, memberName);

        if (industry) {
          const industryLine = document.createElement('p');
          industryLine.classList.add('industry');
          industryLine.textContent = industry;
          card.append(industryLine);
        }

        card.append(addressLine, phoneLine, websiteLink, level);

        membersContainer.appendChild(card);
      });
    }

    const setView = view => {
      const isGrid = view === 'grid';

      membersContainer.classList.toggle('grid-view', isGrid);
      membersContainer.classList.toggle('list-view', !isGrid);
      membersContainer.dataset.view = view;

      gridBtn.classList.toggle('active', isGrid);
      listBtn.classList.toggle('active', !isGrid);

      gridBtn.setAttribute('aria-pressed', String(isGrid));
      listBtn.setAttribute('aria-pressed', String(!isGrid));
    };

    gridBtn.addEventListener('click', () => setView('grid'));
    listBtn.addEventListener('click', () => setView('list'));

    setView('grid');
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
