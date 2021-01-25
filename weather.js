const COORDS = "coordsinfo";

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
  }
}

function init() {
  loadCoords();
}
init();
