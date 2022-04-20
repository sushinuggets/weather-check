//format date function
function formatDate(date) {
  let year = date.getFullYear();
  let day = date.getDate();
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[date.getMonth()];
  let weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let weekday = weekdays[date.getDay()];

  let hour = date.getHours();
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  let seconds = date.getSeconds();
  if (seconds < 10) {
    seconds = "0" + seconds;
  }

  let dateTime = `${weekday}, ${month} ${day}, ${year} ${hour}:${minutes}:${seconds}`;
  return dateTime;
}

function changeDate() {
  document.getElementById("date-time").innerHTML = formatDate(new Date());
}

let dateBtn = document.getElementById("date-btn");
dateBtn.addEventListener("click", changeDate);

//Auto populate date on refresh
let currentDate = document.getElementById("date-time");
currentDate.innerHTML = formatDate(new Date());

// function to convert to C when radio button clicked
let celciusRadio = document.getElementById("celcius-radio");

celciusRadio.onclick = function convertCelcius() {
  let temperature = document.getElementById("current-temp").innerHTML;
  temperature = parseInt(temperature);
  temperature = Math.round(((temperature - 32) * 5) / 9);

  let newTemp = document.getElementById("current-temp");
  newTemp.innerHTML = temperature;
  let unit = document.querySelector(".temp-unit");
  unit.innerHTML = "°C";
};
// function to convert to F when radio button clicked
let fahrenheitRadio = document.getElementById("fahrenheit-radio");

fahrenheitRadio.onclick = function convertFahreinheit() {
  let temperature = document.getElementById("current-temp").innerHTML;
  temperature = parseInt(temperature, 10);
  temperature = Math.round((temperature * 9) / 5 + 32);

  let newTemp = document.getElementById("current-temp");
  newTemp.innerHTML = temperature;
  let unit = document.querySelector(".temp-unit");
  unit.innerHTML = "°F";
};

// Search Engine

function changeWeather(response) {
  let cityName = response.data.name;
  let temp = Math.round(response.data.main.temp);
  let high = Math.round(response.data.main.temp_max);
  let low = Math.round(response.data.main.temp_min);
  //let precipitation = Math.round(response.data.??);
  let windSpeed = Math.round(response.data.wind.speed);
  let realFeel = Math.round(response.data.main.feels_like);
  let conditions = response.data.weather[0].description;

  let newCity = document.querySelector(".city-name");
  newCity.innerHTML = cityName;
  let newTemp = document.getElementById("current-temp");
  newTemp.innerHTML = temp;
  let highTemp = document.getElementById("high-temp");
  highTemp.innerHTML = `${high}°`;
  let lowTemp = document.getElementById("low-temp");
  lowTemp.innerHTML = `${low}°`;
  let newConditions = document.getElementById("weather-condition");
  newConditions.innerHTML = conditions;
  let newWind = document.getElementById("wind-speed");
  newWind.innerHTML = ` ${windSpeed} km/h`;
  let newReal = document.getElementById("real-feel");
  newReal.innerHTML = ` ${realFeel}°`;
}

let searchBtn = document.querySelector(".search-btn");

searchBtn.onclick = function searchCity(event) {
  event.preventDefault();
  let city = document.getElementById("city-search").value;
  city.trim();

  let units;
  if (celciusRadio.checked) {
    units = "metric";
  } else {
    units = "imperial";
  }

  let apiKey = "77897962aee35dda8ee05a81adbd8139";
  let api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(api).then(changeWeather);
};

// Geolocaition button
function locateUser(response) {
  let latitude = response.coords.latitude;
  let longitude = response.coords.longitude;
  let units;

  if (celciusRadio.checked) {
    units = "metric";
  } else {
    units = "imperial";
  }

  let apiKey = "77897962aee35dda8ee05a81adbd8139";
  let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  axios.get(api).then(changeWeather);
}

function startGeolocation() {
  navigator.geolocation.getCurrentPosition(locateUser);
}

let geolocationBtn = document.getElementById("geolocation");
geolocationBtn.addEventListener("click", startGeolocation);
