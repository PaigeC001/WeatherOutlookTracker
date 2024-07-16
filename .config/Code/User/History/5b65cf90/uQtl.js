const apiKey = 'fe4d8bc132a06db690ae7d80bd8988ae';
const searchButton = document.getElementById('search-button');
const cityInput = document.getElementById('city-input');
const currentWeather = document.getElementById('current-weather');
const forecastItems = document.getElementById('forecast-items');
const searchHistory = document.getElementById('search-history');

let cities = [];

searchButton.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city && !cities.includes(city)) {
        cities.push(city);
        updateSearchHistory();
        getWeather(city);
    }
});

searchHistory.addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON') {
        const city = event.target.textContent;
        getWeather(city);
    }
});

function updateSearchHistory() {
    searchHistory.innerHTML = '';
    cities.forEach(city => {
        const button = document.createElement('button');
        button.textContent = city;
        searchHistory.appendChild(button);
    });
}

function getWeather(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`)
        .then(response => response.json())
        .then(data => {
            displayCurrentWeather(data);
            return fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`);
        })
        .then(response => response.json())
        .then(data => {
            displayForecast(data);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
}

function displayCurrentWeather(data) {
    const { name, dt, weather, main, wind } = data;
    currentWeather.innerHTML = `
        <h2>${name} (${new Date(dt * 1000).toLocaleDateString()}) <img src="https://openweathermap.org/img/wn/${weather[0].icon}.png" alt="${weather[0].description}"></h2>
        <p>Temp: ${main.temp} °F</p>
        <p>Wind: ${wind.speed} MPH</p>
        <p>Humidity: ${main.humidity}%</p>
    `;
}

function displayForecast(data) {
    forecastItems.innerHTML = '';

    // Extract forecasts for the next 5 days starting from tomorrow
    const dailyForecasts = [];
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    for (let i = 0; i < data.list.length; i++) {
        const forecast = data.list[i];
        const forecastDate = new Date(forecast.dt * 1000);
        forecastDate.setHours(0, 0, 0, 0);

        // Skip today's forecasts
        if (forecastDate <= currentDate) {
            continue;
        }

        // Add one forecast per day
        if (dailyForecasts.length === 0 || forecastDate.getDate() !== new Date(dailyForecasts[dailyForecasts.length - 1].dt * 1000).getDate()) {
            dailyForecasts.push(forecast);
        }

        // Stop after collecting 5 days of forecasts
        if (dailyForecasts.length === 5) {
            break;
        }
    }

    // Display the forecast data
    dailyForecasts.forEach((item) => {
        const { dt, weather, main, wind } = item;
        const forecastItem = document.createElement('div');
        forecastItem.className = 'forecast-item';
        forecastItem.innerHTML = `
            <p>${new Date(dt * 1000).toLocaleDateString()}</p>
            <img src="https://openweathermap.org/img/wn/${weather[0].icon}.png" alt="${weather[0].description}">
            <p>Temp: ${main.temp} °F</p>
            <p>Wind: ${wind.speed} MPH</p>
            <p>Humidity: ${main.humidity}%</p>
        `;
        forecastItems.appendChild(forecastItem);
    });
}
