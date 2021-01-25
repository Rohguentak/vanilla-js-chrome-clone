const COORDS = "coordsinfo";
const API_KEY = "9753ebb1bec25f2f42c01f9c94fe6c2e";
const geo_info = document.querySelector(".geo-info");

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
  }
}

function init() {
  loadCoords();
}
init();
