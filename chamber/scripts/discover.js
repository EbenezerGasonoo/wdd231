import attractions from '../data/attractions.mjs';

const VISIT_KEY = 'temaChamberDiscoverVisit';
const cardsContainer = document.querySelector('#attractions');
const visitMessage = document.querySelector('#visit-message');

function displayVisitMessage() {
  if (!visitMessage) return;

  const now = Date.now();
  const lastVisit = localStorage.getItem(VISIT_KEY);

  if (!lastVisit) {
    visitMessage.textContent = 'Welcome! Let us know if you have any questions.';
  } else {
    const days = Math.floor((now - Number(lastVisit)) / (1000 * 60 * 60 * 24));

    if (days < 1) {
      visitMessage.textContent = 'Back so soon! Awesome!';
    } else if (days === 1) {
      visitMessage.textContent = 'You last visited 1 day ago.';
    } else {
      visitMessage.textContent = `You last visited ${days} days ago.`;
    }
  }

  localStorage.setItem(VISIT_KEY, String(now));
}

function createAttractionCard(item, index) {
  const card = document.createElement('article');
  card.className = 'attraction-card';
  card.style.gridArea = `card${index + 1}`;

  const title = document.createElement('h2');
  title.textContent = item.name;

  const figure = document.createElement('figure');
  const image = document.createElement('img');
  image.src = `images/${item.image}`;
  image.alt = item.name;
  image.width = 300;
  image.height = 200;
  image.loading = 'lazy';
  image.decoding = 'async';
  figure.appendChild(image);

  const address = document.createElement('address');
  address.textContent = item.address;

  const description = document.createElement('p');
  description.textContent = item.description;

  const learnMore = document.createElement('button');
  learnMore.type = 'button';
  learnMore.className = 'learn-more';
  learnMore.textContent = 'Learn More';
  learnMore.setAttribute('aria-label', `Learn more about ${item.name}`);
  learnMore.addEventListener('click', () => {
    window.open(item.link, '_blank', 'noopener,noreferrer');
  });

  card.append(title, figure, address, description, learnMore);
  return card;
}

function renderAttractions() {
  if (!cardsContainer) return;

  attractions.forEach((item, index) => {
    cardsContainer.appendChild(createAttractionCard(item, index));
  });
}

displayVisitMessage();
renderAttractions();
