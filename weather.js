const COORDS = "coordsinfo";
const API_KEY = "9753ebb1bec25f2f42c01f9c94fe6c2e";
const geo_info = document.querySelector(".geo-info");

function getWeather(lat, long) {
  fetch(
    `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}&units=metric`
  )
    .then(function (wheatherdata) {
      return wheatherdata.json();
    })
    .then(function (data) {
      console.log(data);
    });
}
function paintCoords(parsedCoords) {
  const spanForLat = document.createElement("span");
  const spanForLong = document.createElement("span");
  spanForLat.innerText = `latitude: ${parsedCoords.latitude}`;
  spanForLong.innerText = `longitude: ${parsedCoords.longitude}`;
  geo_info.appendChild(spanForLat);
  geo_info.appendChild(spanForLong);
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
