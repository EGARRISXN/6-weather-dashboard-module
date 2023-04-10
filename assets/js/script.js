//Global variables
var searchHistory = [];
var apiRootUrl = 'https://api.openweathermap.org';
var apiKey = 'e081906e41053d0045aef1f5836faf73';

//DOM element references
var searchBox = document.querySelector('#search-box');
var searchButton = document.querySelector('#search-button');
var currentContainerEl = document.querySelector('#current');
var forecastContainerEl = document.querySelector('#forecast');
var searchHistoryContainerEl = document.querySelector('#history');

var timezone = document.getElementById("timezone");
var countryEl = document.getElementById("country");

//Add timezone plugins to day.js
//dayjs.extend(window.dayjs_plugin_utc);
//dayjs.extend(window.dayjs_plugin_timezone);

getCurrentWeatherData()
function getCurrentWeatherData () {
    navigator.geolocation.getCurrentPosition((success) => {

        let {latitude, longitude } = success.coords;

        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`).then(res => res.json()).then(data => {

        console.log(data);
        showCurrentWeatherData(data)
        })
    })
}

function showCurrentWeatherData (data){
    let {name} = data;
    let {temp, humidity} = data.main; 
    let {speed} = data.wind;

    currentContainerEl.innerHTML = 
    `<h3 class="city-name fw-bold">${name}</h3>
    <h6 class="weather-item fw-bold">Temp: ${temp} F</h6>
    <h6 class="weather-item fw-bold">Humidity: ${humidity} %</h6>
    <h6 class="weather-item fw-bold">Wind: ${speed} MPH</h6>`;
}