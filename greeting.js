const hello = document.querySelector(".say-hello");
const form = document.querySelector(".js-form");
const input = form.querySelector("input");
const greeting = document.querySelector(".js-greeting");
const USER_LS = "USER";
const SHOWING_CN = "showing";
const JS_FORM = "js-form";
const todoFormForShow = document.querySelector(".js-todoForm");

function saveName(text) {
  localStorage.setItem(USER_LS, text);
}

function handleSubmit(event) {
  event.preventDefault();
  const value = input.value;
  paintGreeting(value);
  saveName(value);
}

function askForName() {
  hello.classList.add(SHOWING_CN);
  form.classList.add(SHOWING_CN);
  form.addEventListener("submit", handleSubmit);
}

function paintGreeting(text) {
  form.classList.remove(SHOWING_CN);
  form.classList.remove(JS_FORM);
  hello.classList.remove(SHOWING_CN);
  todoFormForShow.classList.add(SHOWING_CN);
  greeting.classList.add(SHOWING_CN);
  greeting.innerText = `Hello ${text}`;
}

function loadName() {
  const currentUser = localStorage.getItem(USER_LS);
  if (currentUser === null) {
    askForName();
  } else {
    paintGreeting(currentUser);
  }
}
function init() {
  loadName();
}

init();
