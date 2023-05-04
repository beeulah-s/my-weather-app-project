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

function displayWeather(response) {
  let cityElement = document.querySelector("#city-name");
  let temperatureElement = document.querySelector("#temp-deg-celcius");
  let descriptionElement = document.querySelector("#temp-description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");

  cityElement.innerHTML = response.data.name;
  temperatureElement.innerHTML = `${Math.round(response.data.main.temp)}°C`;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  windElement.innerHTML = `Wind: ${Math.round(response.data.wind.speed)}m/s`;
}

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
  celciusTemp.innerHTML = `${temperature}°C`;
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  wind.innerHTML = `Wind: ${response.data.wind.speed}m/s`;
}
