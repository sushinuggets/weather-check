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


let fahrenheitRadio = document.getElementById("fahrenheit-radio");
let celciusRadio = document.getElementById("celcius-radio");

celciusRadio.onclick = function convertCelcius() {
  let units = "metric";
  let city = document.getElementById("city-search").value;
  city.trim();
  let degrees = document.querySelector(".temp-unit");
  degrees.innerHTML = "°C";
  windUnits = "km/h";

  let apiKey = "77897962aee35dda8ee05a81adbd8139";
  let api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(api).then(changeWeather);
};

fahrenheitRadio.onclick = function convertFahreinheit() {
  let units = "Imperial";
  let city = document.getElementById("city-search").value;
  city.trim();
  let degrees = document.querySelector(".temp-unit");
  degrees.innerHTML = "°F";
  windUnits = "mph";

  let apiKey = "77897962aee35dda8ee05a81adbd8139";
  let api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(api).then(changeWeather);
};

// Search Engine
function changeWeather(response) {
  console.log(response);
  let cityName = response.data.name;
  let temp = Math.round(response.data.main.temp);
  let high = Math.round(response.data.main.temp_max);
  let low = Math.round(response.data.main.temp_min);
  let humidity = Math.round(response.data.main.humidity);
  let windSpeed = Math.round(response.data.wind.speed);
  let realFeel = Math.round(response.data.main.feels_like);
  let conditions = response.data.weather[0].description;

  let newCity = document.querySelector(".city-name");
  newCity.innerHTML = cityName;
  let newTemp = document.getElementById("current-temp");
  newTemp.innerHTML = `${temp}`;
  let highTemp = document.getElementById("high-temp");
  highTemp.innerHTML = `${high}°`;
  let lowTemp = document.getElementById("low-temp");
  lowTemp.innerHTML = `${low}°`;
  let newHumidity = document.getElementById("humidity");
  newHumidity.innerHTML = `${humidity}%`;
  let newConditions = document.getElementById("weather-condition");
  newConditions.innerHTML = conditions;
  let newReal = document.getElementById("real-feel");
  newReal.innerHTML = ` ${realFeel}°`;
  let newWind = document.getElementById("wind-speed");
  newWind.innerHTML = `${windSpeed} ${windUnits}`;

  //change current weather icon
  let icon = document.querySelector("#weather-icon");
  let weatherCondition = response.data.weather[0].main.toLowerCase();
  let description = response.data.weather[0].description;
  let backgroundImg = document.querySelector(".background");
  let headerText = document.querySelector(".header");

  switch (weatherCondition) {
    case "thunderstorm":
      icon.setAttribute("src", "./weather-images/thunderstorm.png");
      icon.setAttribute("alt", "weatherCondition");
      backgroundImg.setAttribute(
        "style",
        "background-image: url('./backgrounds/thunderstorm-bg.jpg')"
      );
      headerText.setAttribute("style", "color: #FFFFFF");
      break;
      break;
    case "drizzle":
      icon.setAttribute("src", "./weather-images/drizzle.png");
      backgroundImg.setAttribute(
        "style",
        "background-image: url('./backgrounds/rain-bg.jpg')"
      );
      headerText.setAttribute("style", "color: #FFFFFF");
      break;
    case "rain":
      icon.setAttribute("src", "./weather-images/rain.png");
      backgroundImg.setAttribute(
        "style",
        "background-image: url('./backgrounds/rain-bg.jpg');"
      );
      headerText.setAttribute("style", "color: #FFFFFF");
      break;
    case "snow":
      icon.setAttribute("src", "./weather-images/snow.png");
      backgroundImg.setAttribute(
        "style",
        "background-image: url('./backgrounds/snow-bg.jpg')"
      );
      headerText.setAttribute("style", "color: #000000");
      break;
    case "clear":
      icon.setAttribute("src", "./weather-images/clear.png");
      backgroundImg.setAttribute(
        "style",
        "background-image: url('./backgrounds/clear-bg.jpg');"
      );
      headerText.setAttribute("style", "color: #FFFFFF");
      break;
    case "mist":
      icon.setAttribute("src", "./weather-images/mist.png");
      backgroundImg.setAttribute(
        "style",
        "background-image: url('./backgrounds/mist-bg.jpg');"
      );
      headerText.setAttribute("style", "color: #000000");
      break;
    case "tornado":
      icon.setAttribute("src", "./weather-images/tornado.png");
      backgroundImg.setAttribute(
        "style",
        "background-image: url('./backgrounds/tornado-bg.jpg');"
      );
      headerText.setAttribute("style", "color: #FFFFFF");
      break;
    case "dust":
      icon.setAttribute("src", "./weather-images/dust.png");
      backgroundImg.setAttribute(
        "style",
        "background-image: url('./backgrounds/dust-bg.jpg');"
      );
      headerText.setAttribute("style", "color: #FFFFFF");
      break;
    case "sand":
      icon.setAttribute("src", "./weather-images/dust.png");
      backgroundImg.setAttribute(
        "style",
        "background-image: url('./backgrounds/dust-bg.jpg');"
      );
      headerText.setAttribute("style", "color: #FFFFFF");
      break;
    case "ash":
      icon.setAttribute("src", "./weather-images/dust.png");
      backgroundImg.setAttribute(
        "style",
        "background-image: url('./backgrounds/dust-bg.jpg');"
      );
      headerText.setAttribute("style", "color: #FFFFFF");
      break;
    case "clouds":
      if (description === "few clouds" || description === "scattered clouds") {
        icon.setAttribute("src", "./weather-images/few-clouds.png");
        backgroundImg.setAttribute(
          "style",
          "background-image: url('./backgrounds/partly-cloudy-bg.jpg');"
        );
      } else if (description === "overcast clouds") {
        icon.setAttribute("src", "./weather-images/cloudy.png");
        backgroundImg.setAttribute(
          "style",
          "background-image: url('./backgrounds/cloudy-bg.jpg');"
        );
      } else {
        icon.setAttribute("src", "./weather-images/partly-cloudy.png");
        backgroundImg.setAttribute(
          "style",
          "background-image: url('./backgrounds/partly-cloudy-bg.jpg');"
        );
      }
      break;
    default:
      icon.setAttribute("src", "./weather-images/mist.png");
      backgroundImg.setAttribute(
        "style",
        "background-image: url('./backgrounds/mist-bg.jpg');"
      );
      headerText.setAttribute("style", "color: #000000");
  }
}

let searchBtn = document.querySelector(".search-btn");

searchBtn.onclick = function searchCity(event) {
  event.preventDefault();
  let city = document.getElementById("city-search").value;
  city.trim();

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
let units;
let windUnits;
let geolocationBtn = document.getElementById("geolocation");
geolocationBtn.addEventListener("click", startGeolocation);
