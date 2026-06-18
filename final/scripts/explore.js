import { initNavigation, initFooterDates } from './nav.js';
import { fetchPlaces, buildPlaceCard } from './places.js';
import { toggleFavorite, updateFavoritesCount } from './storage.js';
import { initModal, openModal } from './modal.js';

let allPlaces = [];
let activeCategory = 'all';

function renderPlaces(places) {
  const grid = document.querySelector('#places-grid');
  if (!grid) return;

  if (places.length === 0) {
    grid.innerHTML = `<p role="status">No places match your search.</p>`;
    return;
  }

  grid.innerHTML = places.map((place) => buildPlaceCard(place)).join('');
}

function getFilteredPlaces() {
  const searchValue = document.querySelector('#search-input')?.value.trim().toLowerCase() || '';

  return allPlaces.filter((place) => {
    const matchesCategory = activeCategory === 'all' || place.category === activeCategory;
    const matchesSearch =
      place.name.toLowerCase().includes(searchValue) ||
      place.description.toLowerCase().includes(searchValue) ||
      place.address.toLowerCase().includes(searchValue);

    return matchesCategory && matchesSearch;
  });
}

function attachGridEvents() {
  const grid = document.querySelector('#places-grid');
  if (!grid) return;

  grid.addEventListener('click', (event) => {
    const target = event.target;

    if (!(target instanceof HTMLElement)) return;

    if (target.classList.contains('details-btn')) {
      const id = Number(target.dataset.id);
      const place = allPlaces.find((item) => item.id === id);
      if (place) openModal(place);
    }

    if (target.classList.contains('favorite-btn')) {
      const id = Number(target.dataset.id);
      const saved = toggleFavorite(id);
      target.textContent = saved ? 'Saved!' : 'Save Favorite';
      updateFavoritesCount(document.querySelector('#favorites-count'));
    }
  });
}

function initFilters() {
  const buttons = document.querySelectorAll('.filter-btn');
  const searchInput = document.querySelector('#search-input');

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      buttons.forEach((btn) => {
        btn.classList.remove('active');
        btn.setAttribute('aria-pressed', 'false');
      });

      button.classList.add('active');
      button.setAttribute('aria-pressed', 'true');
      activeCategory = button.dataset.filter || 'all';
      renderPlaces(getFilteredPlaces());
    });
  });

  searchInput?.addEventListener('input', () => {
    renderPlaces(getFilteredPlaces());
  });
}

async function initExplorePage() {
  try {
    allPlaces = await fetchPlaces();
    renderPlaces(allPlaces);
  } catch {
    const grid = document.querySelector('#places-grid');
    if (grid) {
      grid.innerHTML = `<p class="weather-error" role="alert">Unable to load places. Please refresh the page.</p>`;
    }
  }
}

initNavigation();
initFooterDates();
initModal();
attachGridEvents();
initFilters();
updateFavoritesCount(document.querySelector('#favorites-count'));
initExplorePage();
