let lastFocusedElement = null;

export function initModal() {
  const overlay = document.querySelector('#place-modal');
  const closeBtn = document.querySelector('#modal-close');

  if (!overlay || !closeBtn) return;

  closeBtn.addEventListener('click', closeModal);

  overlay.addEventListener('click', (event) => {
    if (event.target === overlay) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && overlay.classList.contains('open')) {
      closeModal();
    }
  });
}

export function openModal(place) {
  const overlay = document.querySelector('#place-modal');
  const title = document.querySelector('#modal-title');
  const image = document.querySelector('#modal-image');
  const category = document.querySelector('#modal-category');
  const address = document.querySelector('#modal-address');
  const description = document.querySelector('#modal-description');
  const rating = document.querySelector('#modal-rating');
  const hours = document.querySelector('#modal-hours');
  const cost = document.querySelector('#modal-cost');

  if (!overlay) return;

  lastFocusedElement = document.activeElement;

  title.textContent = place.name;
  image.src = `images/${place.image}`;
  image.alt = place.name;
  category.textContent = `Category: ${place.category}`;
  address.textContent = place.address;
  description.textContent = place.description;
  rating.textContent = `Rating: ${place.rating} / 5`;
  hours.textContent = `Hours: ${place.hours}`;
  cost.textContent = `Cost: ${place.cost}`;

  overlay.classList.add('open');
  overlay.setAttribute('aria-hidden', 'false');
  document.querySelector('#modal-close')?.focus();
}

export function closeModal() {
  const overlay = document.querySelector('#place-modal');
  if (!overlay) return;

  overlay.classList.remove('open');
  overlay.setAttribute('aria-hidden', 'true');

  if (lastFocusedElement instanceof HTMLElement) {
    lastFocusedElement.focus();
  }
}
