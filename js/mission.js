const todoSubmit = document.querySelector(".todo-submit");
const todoInput = document.querySelector(".todo-input");
const todoList = document.querySelector(".todo-list");
let todos = JSON.parse(localStorage.getItem("todoList")) || [];

[...todos].forEach((item) => {
  addTask(item);
});
function addTask(input) {
  const template = ` <div class="todo-item">
    <span class="todo-text">${input}</span>
    <i class="fa fa-trash todo-remove"></i>
  </div> `;
  //   console.log(todoList);
  todoList.insertAdjacentHTML("afterbegin", template);
}

todoSubmit.addEventListener("click", function (e) {
  e.preventDefault();
  const input = todoInput.value;
  addTask(input);
  todos.push(input);
  todoInput.value = "";
  localStorage.setItem("todoList", JSON.stringify(todos));
});
todoList.addEventListener("click", function (e) {
  if (e.target.matches(".todo-remove")) {
    // console.log(e.target);
    const todoItem = e.target.parentNode;
    // console.log(todoItem);
    todoItem.parentNode.removeChild(todoItem);
    let todos = JSON.parse(localStorage.getItem("todoList")) || [];
    const index = [...todos].indexOf(
      e.target.previousElementSibling.textContent
    );
    todos.splice(index, 1);
    localStorage.setItem("todoList", JSON.stringify(todos));
  }
});
