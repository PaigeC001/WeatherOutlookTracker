const apiKey = '';
const searchButton = document.getElementById('search-button');
const cityInput = document.getElementById('city-input');
const currentWeather = document.getElementById('current-weather');
const forecast = document.getElementById('forecast');
const searchHistory = document.getElementById('search-history');

let cities = [];

searchButton.addEventListener('click', () => {
    const city = cityInput.value;
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
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
            displayCurrentWeather(data);
            return fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`);
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
        <h2>${name}</h2>
        <p>${new Date(dt * 1000).toLocaleDateString()}</p>
        <img src="https://openweathermap.org/img/wn/${weather[0].icon}.png" alt="${weather[0].description}">
        <p>Temperature: ${main.temp} °C</p>
        <p>Humidity: ${main.humidity}%</p>
        <p>Wind Speed: ${wind.speed} m/s</p>
    `;
}

function displayForecast(data) {
    forecast.innerHTML = '<h3>5-Day Forecast</h3>';
    const forecastList = data.list.filter((_, index) => index % 8 === 0);
    forecastList.forEach(item => {
        const { dt, weather, main, wind } = item;
        const forecastItem = document.createElement('div');
        forecastItem.className = 'forecast-item';
        forecastItem.innerHTML = `
            <p>${new Date(dt * 1000).toLocaleDateString()}</p>
            <img src="https://openweathermap.org/img/wn/${weather[0].icon}.png" alt="${weather[0].description}">
            <p>Temp: ${main.temp} °C</p>
            <p>Humidity: ${main.humidity}%</p>
            <p>Wind: ${wind.speed} m/s</p>
        `;
        forecast.appendChild(forecastItem);
    });
}
