const todoForm = document.querySelector(".js-todoForm");
const todoInput = todoForm.querySelector("input");
const todoList = document.querySelector(".js-todoList");

const TODO_LS = "todo";
const todos = [];

function savetodos() {
  localStorage.setItem(TODO_LS, JSON.stringify(todos));
}

function paintTodo(text) {
  const li = document.createElement("li");
  const delbtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = todos.length + 1;

  delbtn.innerText = "X";
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

function handleTodosubmit() {
  event.preventDefault();
  const val = todoInput.value;
  paintTodo(val);
  todoInput.value = "";
}
function loadTodo() {
  const loadedtodo = localStorage.getItem(TODO_LS);
  if (loadedtodo !== null) {
    const parsedTodos = JSON.parse(loadedtodo);
    parsedTodos.forEach(function (temp) {
      paintTodo(temp.todotext);
    });
  }
}

function init() {
  loadTodo();
  todoForm.addEventListener("submit", handleTodosubmit);
}

init();
