// 1. Select HTML elements in the document
const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');

// 2. Declare the API URL with Trier, Germany coordinates
const url = 'https://api.openweathermap.org/data/2.5/weather?lat=49.749992&lon=6.637143&units=imperial&appid=3f05813278c93c4afa09969dad0f6fdb'; // My API Key fixed in.

// 3. Define asynchronous function to fetch API data
async function apiFetch() {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      console.log(data); // Test output to console

      // Optional: Display the temperature, icon, and description
      currentTemp.innerHTML = `${data.main.temp.toFixed(1)} °F`;
      const iconSrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
      weatherIcon.setAttribute('src', iconSrc);
      weatherIcon.setAttribute('alt', data.weather[0].description);
      captionDesc.textContent = data.weather[0].description;
    } else {
      throw await response.text();
    }
  } catch (error) {
    console.error('API Fetch Error:', error);
  }
}

// 4. Invoke the function
apiFetch();

function displayResults(data) {
    currentTemp.innerHTML = `${data.main.temp}&deg;F`;
    const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    let desc = data.weather[0].description;
    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', desc);
    captionDesc.textContent = `${desc}`;
  }
  
  