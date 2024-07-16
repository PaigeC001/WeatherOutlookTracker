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
            const currentDate = new Date();
            currentDate.setHours(0, 0, 0, 0); // Set current date to start of day

            // Filter forecast data to start from the next day
            const forecastList = data.list.filter(item => {
                const itemDate = new Date(item.dt * 1000);
                return itemDate > currentDate; // Only include future dates
            });

            // Extract forecasts for the next 5 days
            const dailyForecasts = [];
            for (let i = 1; i <= 6; i++) {
                const forecastForDay = forecastList.find(forecast => {
                    const forecastDate = new Date(forecast.dt * 1000);
                    return forecastDate.getDate() === (currentDate.getDate() + i) % 31;
                });
                if (forecastForDay) {
                    dailyForecasts.push(forecastForDay);
                }
            }

            displayForecast({ list: dailyForecasts });
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
    data.list.forEach((item, index) => {
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
