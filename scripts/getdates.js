document.addEventListener("DOMContentLoaded", function () {
    // Set year and last modified date
    document.getElementById("year").textContent = new Date().getFullYear();
    document.getElementById("lastModified").textContent = "Last Modified: " + document.lastModified;

    // Toggle Menu
    const menuToggle = document.getElementById("menu-toggle");
    const menu = document.querySelector(".nav-menu");

    menuToggle.addEventListener("click", function () {
        menu.classList.toggle("show");
        menuToggle.textContent = menu.classList.contains("show") ? "✖" : "☰";
    });

    // Toggle Dark Mode
    const darkModeToggle = document.getElementById("dark-mode-toggle");
    const main = document.querySelector("main");

    // visits.js

    // Get the element where visits will be displayed
    const visitsDisplay = document.getElementById("visits");

    // Get the stored number of visits from localStorage
    let numVisits = Number(localStorage.getItem("numVisits")) || 0;

    // Increment the visit count
    numVisits++;

    // Save the updated count back to localStorage
    localStorage.setItem("numVisits", numVisits);

    // Display the number of visits
    if (visitsDisplay) {
    visitsDisplay.textContent = numVisits;
    }


    // Load saved preference
    if (localStorage.getItem("darkMode") === "enabled") {
        main.classList.add("dark-mode");
        darkModeToggle.textContent = "☀️ Light Mode";
    }

    darkModeToggle.addEventListener("click", function () {
        main.classList.toggle("dark-mode");

        if (main.classList.contains("dark-mode")) {
            localStorage.setItem("darkMode", "enabled");
            darkModeToggle.textContent = "☀️ Light Mode";
        } else {
            localStorage.setItem("darkMode", "disabled");
            darkModeToggle.textContent = "🌙 Dark Mode";
        }
    });
});
// 🔹 Update copyright year
document.getElementById("year").textContent = new Date().getFullYear();

// 🔹 Show last modified date
const lastMod = document.lastModified;
document.getElementById("lastModified").textContent = `Last Modified: ${lastMod}`;

// 🔹 Track number of visits
let visits = Number(localStorage.getItem("visits-ls")) || 0;
visits++;
localStorage.setItem("visits-ls", visits);
document.getElementById("visits").textContent = visits;

// 🔹 Weather Info using OpenWeatherMap API
const weatherEl = document.getElementById('weather');

// Tema, Ghana coordinates
const url = 'https://api.openweathermap.org/data/2.5/weather?lat=5.6693&lon=0.0166&units=metric&appid=9142d463ff084a27542f5d996e2a6835';

async function getWeatherData() {
  try {
    const response = await fetch(url);
    if (!response.ok) throw Error(await response.text());
    const data = await response.json();
    displayResults(data);
  } catch (error) {
    console.error('Weather fetch error:', error);
    weatherEl.textContent = 'Weather data unavailable.';
  }
}

function displayResults(data) {
  const temp = data.main.temp.toFixed(1);
  const desc = data.weather[0].description;
  const icon = data.weather[0].icon;
  const iconSrc = `https://openweathermap.org/img/w/${icon}.png`;

  weatherEl.innerHTML = `
    <img src="${iconSrc}" alt="${desc}" loading="lazy">
    <span>${temp}&deg;C - ${desc}</span>
  `;
}

getWeatherData();

// Display range value
const range = document.getElementById("rating");
const ratingValue = document.getElementById("ratingValue");
range.addEventListener("input", () => {
  ratingValue.textContent = range.value;
});

// Password match validation
const form = document.getElementById("accountForm");
form.addEventListener("submit", function (e) {
  const password = document.getElementById("password");
  const confirm = document.getElementById("confirmPassword");

  if (password.value !== confirm.value) {
    alert("Passwords do not match. Please try again.");
    password.value = "";
    confirm.value = "";
    password.focus();
    e.preventDefault();
  }
});