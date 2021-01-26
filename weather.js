const COORDS = "coordsinfo";
const API_KEY = "9753ebb1bec25f2f42c01f9c94fe6c2e";
const wheather_info = document.querySelector(".wheather-info");

function getWeather(lat, long) {
  fetch(
    `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}&units=metric`
  )
    .then(function (wheatherdata) {
      return wheatherdata.json();
    })
    .then(function (data) {
      paintWeather(data);
      console.log(data);
    });
}

function paintWeather(data) {
  const imageForIconCelsius = new Image();
  const imageForIconCelsius2 = new Image();
  imageForIconCelsius.src = `pictures/celsius-degrees-symbol-of-temperature.png`;
  imageForIconCelsius.classList.add("cel_icon");
  imageForIconCelsius2.src = `pictures/celsius-degrees-symbol-of-temperature.png`;
  imageForIconCelsius2.classList.add("cel_icon");
  const location = data.name;
  const tempNow = data.main.temp;
  const tempFeelLike = data.main.feels_like;
  const humidity = data.main.humidity;
  const spanForTempNow = document.createElement("span");
  const spanForTempFeelLike = document.createElement("span");
  spanForTempNow.classList.add("temp");
  spanForTempFeelLike.classList.add("temp_feel");
  const spanForHumidity = document.createElement("span");
  spanForTempNow.innerText = `Temperature: ${tempNow}`;
  spanForTempFeelLike.innerText = `Feels_like: ${tempFeelLike}`;
  spanForHumidity.innerText = `Humidity: ${humidity}%`;
  wheather_info.appendChild(spanForTempNow);
  wheather_info.appendChild(spanForTempFeelLike);
  wheather_info.appendChild(spanForHumidity);
  const temp = wheather_info.querySelector(".temp");
  const temp_feel = wheather_info.querySelector(".temp_feel");
  temp.appendChild(imageForIconCelsius);
  temp_feel.appendChild(imageForIconCelsius2);
}
function paintCoords(parsedCoords) {
  const spanForLat = document.createElement("span");
  const spanForLong = document.createElement("span");
  spanForLat.innerText = `latitude: ${parsedCoords.latitude}`;
  spanForLong.innerText = `longitude: ${parsedCoords.longitude}`;
  wheather_info.appendChild(spanForLat);
  wheather_info.appendChild(spanForLong);
}

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}
function handleGeoSuccess(position) {
  const lat = position.coords.latitude;
  const long = position.coords.longitude;
  const coordsObj = {
    latitude: lat,
    longitude: long,
  };
  saveCoords(coordsObj);
  getWeather(lat, long);
}

function handleGeoerror(position) {
  console.log("fail to get geo");
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoerror);
}

function loadCoords() {
  const loadedCords = localStorage.getItem(COORDS);
  if (loadedCords === null) {
    askForCoords();
  } else {
    const parsedCoords = JSON.parse(loadedCords);
    paintCoords(parsedCoords);
    getWeather(parsedCoords.latitude, parsedCoords.longitude);
  }
}

function init() {
  loadCoords();
}
init();
