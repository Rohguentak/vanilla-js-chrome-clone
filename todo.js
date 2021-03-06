const todoForm = document.querySelector(".js-todoForm");
const todoInput = todoForm.querySelector("input");
const todoList = document.querySelector(".js-todoList");

const TODO_LS = "todo";
let todos = [];

function savetodos() {
  localStorage.setItem(TODO_LS, JSON.stringify(todos));
}

function deleteTodos(event) {
  const btn = event.target;
  const li = btn.parentNode;
  todoList.removeChild(li);

  const cleanTodos = todos.filter(function (todos) {
    return todos.id !== parseInt(li.id);
  });
  //console.log(cleanTodos);
  todos = cleanTodos;
  savetodos();
  console.log(todos);
}

function paintTodo(text) {
  const li = document.createElement("li");
  const delbtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = todos.length + 1;

  delbtn.innerText = "X";
  delbtn.addEventListener("click", deleteTodos);

  span.innerText = text;
  li.appendChild(span);
  li.appendChild(delbtn);
  li.id = newId;
  todoList.appendChild(li);
  const todoObj = {
    todotext: text,
    id: newId,
  };
  todos.push(todoObj);
  savetodos();
}

function handleTodosubmit(event) {
  event.preventDefault();
  const val = todoInput.value;
  paintTodo(val);
  todoInput.value = "";
}

function loadTodo() {
  const loadedtodo = localStorage.getItem(TODO_LS);
  if (loadedtodo !== null) {
    const parsedTodos = JSON.parse(loadedtodo);
    parsedTodos.forEach(function (tempObjInParsedTodos) {
      paintTodo(tempObjInParsedTodos.todotext);
    });
  }
}

function init() {
  loadTodo();
  todoForm.addEventListener("submit", handleTodosubmit);
}

init();
