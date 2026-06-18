import { initNavigation, initFooterDates } from './nav.js';
import { fetchPlaces, buildPlaceCard } from './places.js';
import { updateFavoritesCount } from './storage.js';

const WEATHER_API_KEY = '3f05813278c93c4afa09969dad0f6fdb';
const TEMA_LAT = 5.669;
const TEMA_LON = -0.017;

async function loadWeather() {
  const weatherBox = document.querySelector('#weather-data');
  if (!weatherBox) return;

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${TEMA_LAT}&lon=${TEMA_LON}&appid=${WEATHER_API_KEY}&units=metric`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Weather request failed with status ${response.status}`);
    }

    const data = await response.json();
    const temp = data.main.temp.toFixed(1);
    const description = data.weather[0].description;
    const humidity = data.main.humidity;
    const wind = data.wind.speed.toFixed(1);

    weatherBox.innerHTML = `
      <p><strong>${temp}°C</strong> — ${description}</p>
      <p>Humidity: ${humidity}% · Wind: ${wind} m/s</p>
    `;
  } catch (error) {
    console.error('Weather error:', error);
    weatherBox.innerHTML = `<p class="weather-error" role="alert">Weather is unavailable right now. Please try again later.</p>`;
  }
}

async function loadFeaturedPlaces() {
  const container = document.querySelector('#featured-places');
  if (!container) return;

  try {
    const places = await fetchPlaces();
    const featured = [...places]
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 3);

    container.innerHTML = featured
      .map((place) => buildPlaceCard(place, { showFavorite: false }))
      .join('');
  } catch (error) {
    container.innerHTML = `<p class="weather-error" role="alert">Featured places could not be loaded.</p>`;
  }
}

initNavigation();
initFooterDates();
updateFavoritesCount(document.querySelector('#favorites-count'));
loadWeather();
loadFeaturedPlaces();
