const FAVORITES_KEY = 'temaCoastalFavorites';

export function getFavorites() {
  try {
    const stored = localStorage.getItem(FAVORITES_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function saveFavorites(ids) {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(ids));
}

export function toggleFavorite(id) {
  const favorites = getFavorites();
  const index = favorites.indexOf(id);
  const isSaved = index === -1;

  if (isSaved) {
    favorites.push(id);
  } else {
    favorites.splice(index, 1);
  }

  saveFavorites(favorites);
  return isSaved;
}

export function isFavorite(id) {
  return getFavorites().includes(id);
}

export function updateFavoritesCount(element) {
  if (!element) return;
  const count = getFavorites().length;
  element.textContent = `Saved favorites: ${count}`;
}
