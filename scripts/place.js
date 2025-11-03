const currentYearEl = document.getElementById("currentYear");
const lastModifiedEl = document.getElementById("lastModified");
const windChillEl = document.getElementById("windChill");

if (currentYearEl) {
    currentYearEl.textContent = new Date().getFullYear(); // Set ting the current year
}
if (lastModifiedEl) {
    lastModifiedEl.textContent = document.lastModified; // improving the last modified date
}


const temperature = 10; // Temperature in Celsius
const windSpeed = 5; // Wind speed in km/h

/**
 * Calculate the wind chill based on temperature and wind speed
 * Formula: 13.12 + 0.6215T - 11.37V^0.16 + 0.3965TV^0.16
 * @param {number} temp - The temperature in Celsius
 * @param {number} speed - The wind speed in km/h
 * @returns {string} - The calculated wind chill value with "°C" or "N/A" if conditions are seen
 */
function calculateWindChill(temp, speed) {
    if (temp <= 10 && speed > 4.8) {
        // Apply formula and return wind chill
        const windChill =
            13.12 +
            0.6215 * temp -
            11.37 * Math.pow(speed, 0.16) +
            0.3965 * temp * Math.pow(speed, 0.16);
        return `${windChill.toFixed(2)} °C`;
    }
    return "N/A"; // Wind chill is not applicable for higher temperatures or low wind speeds
}

if (windChillEl) {
    windChillEl.textContent = calculateWindChill(temperature, windSpeed);
}