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
let forecastDate;

function formatTimestamp(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  let weekday = date.getDay(days);
  forecastDate = date.getDate(timestamp * 1000);
  return days[weekday];
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
  let city = document.getElementById("current-city").innerHTML;
  city.trim();

  let apiKey = "77897962aee35dda8ee05a81adbd8139";
  let api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(api).then(changeWeather);
};

fahrenheitRadio.onclick = function convertFahreinheit() {
  let units = "Imperial";
  let city = document.getElementById("current-city").innerHTML;
  city.trim();

  let apiKey = "77897962aee35dda8ee05a81adbd8139";
  let api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(api).then(changeWeather);
};
//Pull forecast Dtata from API
function getForecast(coordinates) {
  let units;
  if (celciusRadio.checked) {
    units = "metric";
  } else {
    units = "imperial";
  }

  let apiKey = "77897962aee35dda8ee05a81adbd8139";
  let api = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude=alerts,hourly,minutely&appid=${apiKey}&units=${units}`;

  axios.get(api).then(displayForecast);
}

//function  to display forecast
function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.getElementById("forecast");

  forecast.splice(0, 1); //removes first object to start forcast with "tomorrow"

  let forecastHTML = `<div class = "row ">`;
  forecast.forEach(function (dayObject, index) {
    let weatherCondition = dayObject.weather[0].main;
    let icon = weatherCondition.toLowerCase();
    let description;
    let temp = Math.round(dayObject.temp.max);
    if (icon === "clouds") {
      description = dayObject.weather[0].description;
      if (description === "few clouds" || description === "scattered clouds") {
        icon = "few-clouds";
      } else if (description === "broken clouds") {
        icon = "partly-cloudy";
      } else {
        icon = "cloudy";
      }
    }
    if (icon === "sand" || icon === "ash" || icon === "smoke") {
      icon = "dust";
    }
    if (icon === "haze" || icon === "fog" || icon === "squall") {
      icon = "mist";
    }
    let iconLink = `weather-images/${icon}.png`;

    if (index < 5) {
      //gets only 5 days
      forecastHTML =
        forecastHTML +
        `<div class="card col-2 d-flex mx-auto">
          <div class="card-body">
           <div class="row card-info">
             <span class=" col future-temp" id="temp">${temp}°</span>
             <span class ="col float-end " id="date">${formatTimestamp(
               dayObject.dt
             )}
               <br />
               ${forecastDate}
               </span>
           </div> 
          <div class="row future-icon">
            <div class="col w-100" >
                <li>
                    <img class="icon" 
                  src="${iconLink}" 
                  alt="${weatherCondition}" 
                  width="70px">
                </img>
              </li>    
         </div>
         </div>
          </div>
        </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

// Search Engine
function changeWeather(response) {
  let cityName = response.data.name;
  let temp = Math.round(response.data.main.temp);
  let high = Math.round(response.data.main.temp_max);
  let low = Math.round(response.data.main.temp_min);
  let humidity = Math.round(response.data.main.humidity);
  let windSpeed = Math.round(response.data.wind.speed);
  let realFeel = Math.round(response.data.main.feels_like);
  let conditions = response.data.weather[0].description;
  let degrees = document.querySelector(".temp-unit");

  if (celciusRadio.checked) {
    windUnits = "km/h";

    degrees.innerHTML = "°C";
  } else {
    windUnits = "mph";
    degrees.innerHTML = "°F";
  }

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
  newWind.innerHTML = ` ${windSpeed} ${windUnits}`;

  getForecast(response.data.coord);

  //change current weather icon
  let icon = document.querySelector("#weather-icon");
  let weatherCondition = response.data.weather[0].main.toLowerCase();
  let description = response.data.weather[0].description;
  let backgroundImg = document.querySelector(".background");
  let headerText = document.querySelector(".header");
  let attributeLink = document.querySelector("#attribute");

  switch (weatherCondition) {
    case "thunderstorm":
      icon.setAttribute("src", "./weather-images/thunderstorm.png");
      icon.setAttribute("alt", "weatherCondition");
      attributeLink.innerHTML =
        "Photo by <a href='https://unsplash.com/@jplenio?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText' target='_blank'>Johannes Plenio";
      backgroundImg.setAttribute(
        "style",
        "background-image: url('./backgrounds/thunderstorm-bg.jpg')"
      );
      headerText.setAttribute("style", "color: #FFFFFF");
      break;
    case "drizzle":
      icon.setAttribute("src", "./weather-images/drizzle.png");
      icon.setAttribute("alt", "weatherCondition");
      attributeLink.innerHTML =
        "Photo by <a href='https://unsplash.com/@livvie_bruce?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText' target='_blank'>Liv Bruce";

      backgroundImg.setAttribute(
        "style",
        "background-image: url('./backgrounds/rain-bg.jpg')"
      );
      headerText.setAttribute("style", "color: #FFFFFF");
      break;
    case "rain":
      icon.setAttribute("src", "./weather-images/rain.png");
      icon.setAttribute("alt", "weatherCondition");
      attributeLink.innerHTML =
        "Photo by <a href='https://unsplash.com/@livvie_bruce?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText' target='_blank'>Liv Bruce";

      backgroundImg.setAttribute(
        "style",
        "background-image: url('./backgrounds/rain-bg.jpg');"
      );
      headerText.setAttribute("style", "color: #FFFFFF");
      break;
    case "snow":
      icon.setAttribute("src", "./weather-images/snow.png");
      icon.setAttribute("alt", "weatherCondition");
      attributeLink.innerHTML =
        "Photo by <a href='https://unsplash.com/@nickartman?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText' target='_blank'>Nick Artman";

      backgroundImg.setAttribute(
        "style",
        "background-image: url('./backgrounds/snow-bg.jpg')"
      );
      headerText.setAttribute("style", "color: #000000");
      break;
    case "clear":
      icon.setAttribute("src", "./weather-images/clear.png");
      icon.setAttribute("alt", "weatherCondition");
      attributeLink.innerHTML =
        "Photo by <a href='https://unsplash.com/@erikvandijk?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText' target='_blank'>Erik van Dijk";
      backgroundImg.setAttribute(
        "style",
        "background-image: url('./backgrounds/clear-bg.jpg');"
      );
      headerText.setAttribute("style", "color: #000000");
      break;
    case "mist":
      icon.setAttribute("src", "./weather-images/mist.png");
      icon.setAttribute("alt", "weatherCondition");
      attributeLink.innerHTML =
        "Photo by <a href='https://unsplash.com/@marinareich?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText' target='_blank'>Marina Reich";
      backgroundImg.setAttribute(
        "style",
        "background-image: url('./backgrounds/mist-bg.jpg');"
      );
      headerText.setAttribute("style", "color: #000000");
      break;
    case "fog":
      icon.setAttribute("src", "./weather-images/mist.png");
      icon.setAttribute("alt", "weatherCondition");
      attributeLink.innerHTML =
        "Photo by <a href='https://unsplash.com/@sickle?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText' target='_blank'>Sergey Pesterev";
      backgroundImg.setAttribute(
        "style",
        "background-image: url('./backgrounds/fog-bg.jpg');"
      );
      headerText.setAttribute("style", "color: #000000");
      break;
    case "tornado":
      icon.setAttribute("src", "./weather-images/tornado.png");
      icon.setAttribute("alt", "weatherCondition");
      attributeLink.innerHTML =
        "Photo by <a href='https://unsplash.com/@espenbi?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText' target='_blank'>Espen Bierud";
      backgroundImg.setAttribute(
        "style",
        "background-image: url('./backgrounds/tornado-bg.jpg');"
      );
      headerText.setAttribute("style", "color: #000000");
      break;
    case "dust":
      icon.setAttribute("src", "./weather-images/dust.png");
      icon.setAttribute("alt", "weatherCondition");
      attributeLink.innerHTML =
        "Photo by <a href='https://unsplash.com/@jeremybishop?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText' target='_blank'>Jeremy Bishop";
      backgroundImg.setAttribute(
        "style",
        "background-image: url('./backgrounds/dust-bg.jpg');"
      );
      headerText.setAttribute("style", "color: #FFFFFF");
      break;
    case "sand":
      icon.setAttribute("src", "./weather-images/dust.png");
      icon.setAttribute("alt", "weatherCondition");
      attributeLink.innerHTML =
        "Photo by <a href='https://unsplash.com/@jeremybishop?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText' target='_blank'>Jeremy Bishop";
      backgroundImg.setAttribute(
        "style",
        "background-image: url('./backgrounds/dust-bg.jpg');"
      );
      headerText.setAttribute("style", "color: #FFFFFF");
      break;
    case "ash":
      icon.setAttribute("src", "./weather-images/dust.png");
      icon.setAttribute("alt", "weatherCondition");
      attributeLink.innerHTML =
        "Photo by <a href='https://unsplash.com/@jeremybishop?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText' target='_blank'>Jeremy Bishop";
      backgroundImg.setAttribute(
        "style",
        "background-image: url('./backgrounds/dust-bg.jpg');"
      );
      headerText.setAttribute("style", "color: #FFFFFF");
      break;
    case "clouds":
      if (description === "few clouds" || description === "scattered clouds") {
        icon.setAttribute("src", "./weather-images/few-clouds.png");
        icon.setAttribute("alt", "weatherCondition");
        attributeLink.innerHTML =
          "Photo by <a href='https://unsplash.com/@nedaastani?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText' target='_blank'>Neda Astani";
        backgroundImg.setAttribute(
          "style",
          "background-image: url('./backgrounds/partly-cloudy-bg.jpg');"
        );
      } else if (description === "overcast clouds") {
        icon.setAttribute("src", "./weather-images/cloudy.png");
        icon.setAttribute("alt", "weatherCondition");
        attributeLink.innerHTML =
          "Photo by <a href='https://unsplash.com/@lukaszlada?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText' target='_blank'>Łukasz Łada";
        backgroundImg.setAttribute(
          "style",
          "background-image: url('./backgrounds/cloudy-bg.jpg');"
        );
      } else {
        icon.setAttribute("src", "./weather-images/partly-cloudy.png");
        icon.setAttribute("alt", "weatherCondition");
        attributeLink.innerHTML =
          "Photo by <a href='https://unsplash.com/@nedaastani?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText' target='_blank'>Neda Astani";
        backgroundImg.setAttribute(
          "style",
          "background-image: url('./backgrounds/partly-cloudy-bg.jpg');"
        );
      }
      break;
    default:
      icon.setAttribute("src", "./weather-images/mist.png");
      icon.setAttribute("alt", "weatherCondition");
      attributeLink.innerHTML =
        "Photo by <a href='https://unsplash.com/@marinareich?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText' target='_blank'>Marina Reich";
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
