// current date

function todaysDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let showDay = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[showDay];

  return `${day} ${hours}:${minutes}`;
}

let currentDate = document.querySelector("#date-time");
let now = new Date();
currentDate.innerHTML = todaysDate(now);

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row align-items-center">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
<div class="col">
  <p class="day-small">${formatDay(forecastDay.dt)}</p>
  <img
    src="https://openweathermap.org/img/wn/${forecastDay.weather[0].icon}.png"
    alt=""
    width="36px"
  />
  <p class="temp-small">
    <span class="weather-forecast-temp-max">${Math.round(
      forecastDay.temp.max
    )}°</span>
    <span class="weather-forecast-temp-min">${Math.round(
      forecastDay.temp.min
    )}°</span>
  </p>
</div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

// city search

let searchButton = document.querySelector("#search-button");
searchButton.addEventListener("click", searchCity);

function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#search-bar").value;
  let apiKey = "12a6a3887b0006dd8641788afe6a5d74";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function getForecast(coordinates) {
  let apiKey = "12a6a3887b0006dd8641788afe6a5d74";
  let apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayWeather(response) {
  let cityElement = document.querySelector("#city-name");
  let temperatureElement = document.querySelector("#temp-deg-celcius");
  let descriptionElement = document.querySelector("#temp-description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let iconElement = document.querySelector("#icon");

  celsiusTemp = response.data.main.temp;

  cityElement.innerHTML = response.data.name;
  temperatureElement.innerHTML = `${Math.round(celsiusTemp)}`;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  windElement.innerHTML = `Wind: ${Math.round(response.data.wind.speed)}m/s`;
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  iconElement.style.display = "inline";

  getForecast(response.data.coord);
}

function displayFahrenheitTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp-deg-celcius");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemp * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemp(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temp-deg-celcius");
  temperatureElement.innerHTML = Math.round(celsiusTemp);
}

let celsiusTemp = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemp);

// current location

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", showCurrentTemp);

function showCurrentTemp(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition((position) => {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let apiKey = "12a6a3887b0006dd8641788afe6a5d74";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&q=`;

    axios.get(apiUrl).then(currentCity);
  });
}

function currentCity(response) {
  let city = response.data.name;
  let h2 = document.querySelector("h2");
  let temperature = Math.round(response.data.main.temp);
  let celciusTemp = document.querySelector("#temp-deg-celcius");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");

  h2.innerHTML = city;
  celciusTemp.innerHTML = `${temperature}`;
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  wind.innerHTML = `Wind: ${response.data.wind.speed}m/s`;
}
