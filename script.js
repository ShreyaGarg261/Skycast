const apiKey = '6157c593fbc6bc0fcade54ac23f4e1ab'; // Replace with your actual API key

const locationForm = document.getElementById('location-form');
const cityInput = document.getElementById('city-input');
const weatherInfo = document.getElementById('weather-info');
const favoriteCitiesList = document.getElementById("favorite-cities");

locationForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent default form submission

    const city = cityInput.value.trim();

    if (city) {
        fetchWeatherData(city);
    } else {
        alert('Please enter a valid city name and country (e.g., London, UK).');
    }
});

function fetchWeatherData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`; // Use metric units by default

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) { // Successful API call
                const weather = data.weather[0];
                const temperature = Math.round(data.main.temp);

                weatherInfo.innerHTML = `
                    <h3>${city}</h3>
                    <p>
                        <img src="https://openweathermap.org/img/wn/${weather.icon}@2x.png" alt="${weather.main}">
                        ${weather.main} - ${temperature}°C
                    </p>
                `;
            } else {
                alert('Error: City not found or invalid API key.'); // Handle errors gracefully
            }
            

        })
        .catch(error => {
            console.error('Error fetching weather data:', error); // Log errors for debugging
        });
        window.addEventListener("load", updateFavoritesList);
}
