// lets get  the date
let currentYear = new Date();
let lastModification = document.lastModified;

document.querySelector('#lastmodified').textContent = `Last Modification: ${lastModification}`;
document.querySelector('#year').textContent = currentYear.getFullYear();

// Hamburger menu
const hamButton = document.querySelector('#menu');
const header = document.querySelector('header');
const navigation = document.querySelector('.navigation');

hamButton.addEventListener('click', () => {
    hamButton.classList.toggle('open');
    header.classList.toggle('open');
    navigation.classList.toggle('open');
});

const templeCards = document.querySelector('#temples');

const temples = [
    {
        templeName: "Aba Nigeria",
        location: "Aba, Nigeria",
        dedicated: "2005, August, 7",
        area: 11500,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
    },
    {
        templeName: "Manti Utah",
        location: "Manti, Utah, United States",
        dedicated: "1888, May, 21",
        area: 74792,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
    },
    {
        templeName: "Payson Utah",
        location: "Payson, Utah, United States",
        dedicated: "2015, June, 7",
        area: 96630,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
    },
    {
        templeName: "Yigo Guam",
        location: "Yigo, Guam",
        dedicated: "2020, May, 2",
        area: 6861,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
    },
    {
        templeName: "Washington D.C.",
        location: "Kensington, Maryland, United States",
        dedicated: "1974, November, 19",
        area: 156558,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
    },
    {
        templeName: "Lima Perú",
        location: "Lima, Perú",
        dedicated: "1986, January, 10",
        area: 9600,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
    },
    {
        templeName: "Mexico City Mexico",
        location: "Mexico City, Mexico",
        dedicated: "1983, December, 2",
        area: 116642,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
    },
    {
        templeName: "Arequipa Perú",
        location: "Arequipa, Perú",
        dedicated: "2019, December, 15",
        area: 26969,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/arequipa-peru/400x250/4-48661c257177c19a0f39a3991b1a7e7aa0338487.jpeg"
    },
    {
        templeName: "Albuquerque New Mexico",
        location: "Albuquerque, New Mexico, United States",
        dedicated: "2000, March, 5",
        area: 34245,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/albuquerque-new-mexico/400x250/albuquerque-temple-lds-137883-wallpaper.jpg"
    },
    {
        templeName: "Trujillo Perú",
        location: "Trujillo, Perú",
        dedicated: "2015, June, 21",
        area: 28200,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/trujillo-peru/400x250/trujillo-peru-temple-exterior-1449769-wallpaper.jpg"
    }
];

createTempleCard(temples);

const oldLink = document.querySelector('#old');
const newLink = document.querySelector('#new');
const largeLink = document.querySelector('#large');
const smallLink = document.querySelector('#small');

oldLink.addEventListener('click', () => {
    const cutoffDate = new Date(1900, 0, 1);
    createTempleCard(temples.filter(temple => new Date(temple.dedicated) < cutoffDate));
});

newLink.addEventListener('click', () => {
    const cutoffDate = new Date(2000, 0, 1);
    createTempleCard(temples.filter(temple => new Date(temple.dedicated) > cutoffDate));
});

largeLink.addEventListener('click', () => {
    createTempleCard(temples.filter(temple => new Date(temple.area) > 90000));
});

smallLink.addEventListener('click', () => {
    createTempleCard(temples.filter(temple => new Date(temple.area) < 10000));
});

function createTempleCard(filteredTemples) {
    document.querySelector('#temples').innerHTML = '';
    filteredTemples.forEach((temple) => {
        let card = document.createElement('section');
        const templeName = document.createElement('h2');
        const location = document.createElement('p');
        const dedicated = document.createElement('p');
        const area = document.createElement('p');
        const imageUrl = document.createElement('img');
        imageUrl.setAttribute('src', temple.imageUrl);
        imageUrl.setAttribute('alt', temple.templeName + ' Temple');
        imageUrl.setAttribute('loading', 'lazy');

        templeName.textContent = temple.templeName;
        location.textContent = 'Location: ' + temple.location;
        dedicated.textContent = 'Dedicated: ' + temple.dedicated;
        area.textContent = 'Size: ' + temple.area + ' sq ft';

        card.appendChild(templeName);
        card.appendChild(location);
        card.appendChild(dedicated);
        card.appendChild(area);
        card.appendChild(imageUrl);

        templeCards.appendChild(card);
    });
}