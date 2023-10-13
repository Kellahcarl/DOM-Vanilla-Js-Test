// Retrieve todos from local storage
const todos = JSON.parse(localStorage.getItem("todos")) || [];

// Function to render the todo list
function renderTodos() {
  const todosList = document.getElementById("todos");
  todosList.innerHTML = "";

  todos.forEach((todo, index) => {
    const todoItem = document.createElement("li");
    todoItem.className = `todo-item ${todo.completed ? "complete" : ""}`;
    todoItem.innerHTML = `
                    ${todo.text}
                    <button data-index="${index}" class="edit">Edit</button>
                    <button data-index="${index}" class="delete">Delete</button>
                    <button data-index="${index}" class="complete-toggle">Complete</button>
                `;
    todosList.appendChild(todoItem);
  });
}

// Initial render
renderTodos();

// Function to add a new todo
function addTodo() {
  const taskInput = document.getElementById("task");
  const taskText = taskInput.value.trim();

  if (taskText !== "") {
    todos.push({ text: taskText, completed: false });
    localStorage.setItem("todos", JSON.stringify(todos));
    taskInput.value = "";
    renderTodos();
  }
}

// Function to edit a todo
function editTodo(index, newText) {
  todos[index].text = newText;
  localStorage.setItem("todos", JSON.stringify(todos));
  renderTodos();
}

// Function to delete a todo
function deleteTodo(index) {
  todos.splice(index, 1);
  localStorage.setItem("todos", JSON.stringify(todos));
  renderTodos();
}

// Function to toggle completion status
function toggleComplete(index) {
  todos[index].completed = !todos[index].completed;
  localStorage.setItem("todos", JSON.stringify(todos));
  renderTodos();
}

// Event listeners
document.getElementById("add").addEventListener("click", addTodo);

document.getElementById("todos").addEventListener("click", (event) => {
  const target = event.target;
  const index = target.getAttribute("data-index");

  if (target.classList.contains("delete")) {
    deleteTodo(index);
  } else if (target.classList.contains("complete-toggle")) {
    toggleComplete(index);
  } else if (target.classList.contains("edit")) {
    const newText = prompt("Edit task:", todos[index].text);
    if (newText !== null) {
      editTodo(index, newText);
    }
  }
});
