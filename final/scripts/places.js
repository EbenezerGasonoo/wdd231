export async function fetchPlaces() {
  try {
    const response = await fetch('data/places.json');

    if (!response.ok) {
      throw new Error(`Places request failed with status ${response.status}`);
    }

    const data = await response.json();

    if (!data.places || !Array.isArray(data.places)) {
      throw new Error('Places data is not formatted correctly.');
    }

    return data.places;
  } catch (error) {
    console.error('Error loading places:', error);
    throw error;
  }
}

export function buildPlaceCard(place, options = {}) {
  const { showFavorite = true } = options;

  return `
    <article class="place-card" data-id="${place.id}">
      <img src="images/${place.image}" alt="${place.name}" width="400" height="267" loading="lazy" decoding="async">
      <div class="card-body">
        <h3>${place.name}</h3>
        <p class="meta">${place.category} · ${place.rating} ★ · ${place.cost}</p>
        <p>${place.address}</p>
        <p>${place.description}</p>
        <div class="card-actions">
          <button type="button" class="btn btn-primary details-btn" data-id="${place.id}">View Details</button>
          ${showFavorite ? `<button type="button" class="btn btn-secondary favorite-btn" data-id="${place.id}">Save Favorite</button>` : ''}
        </div>
      </div>
    </article>
  `;
}
