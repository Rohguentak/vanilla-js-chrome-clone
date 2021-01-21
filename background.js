const body = document.querySelector("body");
const NUMBER_OF_IMG = 4;

/*function handleImgLoad() {
  console.log("loading finithsed");
}
*/
function paintImage(imagenum) {
  const image = new Image();
  image.src = `pictures/${imagenum}.jpg`;
  image.classList.add("backgroundimage");
  body.appendChild(image);
  //image.addEventListener("loaded", handleImgLoad);  api에서 이미지 가져올경우 필요
}
function getRandNum() {
  const number = Math.floor(Math.random() * NUMBER_OF_IMG);
  return number;
}

function init() {
  const randNumber = getRandNum();
  paintImage(randNumber);
}

init();
