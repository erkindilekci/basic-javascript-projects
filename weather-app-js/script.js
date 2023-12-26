const apiKey = "e7d99ba173321e29a9052da22a0d231d";
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?&appid=${apiKey}&units=metric&q=`;

const searchBox = document.querySelector('.search input');
const searchBtn = document.querySelector('.search button');
const weatherIcon = document.querySelector('.weather-icon');
const weather = document.querySelector('.weather');

async function checkWeather(city) {
    const response = await fetch(apiUrl + city);

    const error = document.querySelector('.error');

    if (response.status === 404) {
        error.style.display = 'block';
        weather.style.display = 'none';
    } else {
        const data = await response.json();

        document.querySelector('.city').innerHTML = data.name;
        document.querySelector('.temp').innerHTML = Math.round(data?.main?.temp) + '°C';
        document.querySelector('.humidity').innerHTML = data?.main?.humidity + '%';
        document.querySelector('.wind').innerHTML = data?.wind?.speed + ' km/h';

        weatherIcon.src = `images/${data?.weather[0]?.main?.toLowerCase()}.png`;

        weather.style.display = 'block';
        error.style.display = 'none';
    }
}

searchBtn.addEventListener('click', () => checkWeather(searchBox.value.toLowerCase()));