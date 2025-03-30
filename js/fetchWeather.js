const apiKey = '6e4353de17693f10bd6ffc07a337a7f3';

 // Replace with your OpenWeatherMap API key
const city = 'Phnom Penh'; // Replace with your desired city

// Fetch current weather data
async function fetchCurrentWeather() {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const response = await fetch(url);
    const data = await response.json();
    displayCurrentWeather(data);
}

// Fetch weather forecast data
async function fetchWeatherForecast() {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
    const response = await fetch(url);
    const data = await response.json();
    displayWeatherForecast(data);
}

// Display current weather
function displayCurrentWeather(data) {
    const weatherContainer = document.querySelector('.grid-item-small-directory:nth-child(2)');
    weatherContainer.innerHTML = `
        <h3>Current Weather</h3>
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Condition: ${data.weather[0].description}</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
    `;
}

// Display weather forecast
function displayWeatherForecast(data) {
    const forecastContainer = document.querySelector('.grid-item-small-directory:nth-child(3)');
    const forecast = data.list.slice(0, 3); // Get the next 3 forecasts
    forecastContainer.innerHTML = `
        <h3>Weather Focus</h3>
        ${forecast
            .map(
                (item) => `
            <p>${new Date(item.dt_txt).toLocaleString()}: ${item.main.temp}°C, ${item.weather[0].description}</p>
        `
            )
            .join('')}
    `;
}

// Fetch weather data on page load
fetchCurrentWeather();
fetchWeatherForecast();