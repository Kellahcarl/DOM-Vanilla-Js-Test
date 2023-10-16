// Retrieve todos and completed tasks from local storage
const todos = JSON.parse(localStorage.getItem("todos")) || [];
const completedTasks = JSON.parse(localStorage.getItem("completedTasks")) || [];

// Function to render the todo list
function renderTodos() {
  const todosList = document.getElementById("todos");
  todosList.innerHTML = "";

  todos.forEach((todo, index) => {
    const todoItem = document.createElement("li");
    todoItem.className = "todo-item";
    todoItem.innerHTML = `<span>${todo.text}</span><div class="control-btn">
                    <button data-index="${index}" class="edit">Edit</button>
                    <button data-index="${index}" class="delete">Delete</button>
                    <button data-index="${index}" class="complete-toggle">Complete</button></div>
                    
                `;
    todosList.appendChild(todoItem);
  });
}

// Function to render the completed tasks
function renderCompletedTasks() {
  const completedList = document.getElementById("completed");
  completedList.innerHTML = "";

  completedTasks.forEach((task, index) => {
    const completedItem = document.createElement("div");
    completedItem.className = "completed-item";
    completedItem.innerHTML = `
                    <span class="checkmark">&#10004;</span>
                    <span>${task}</span>
                    <button data-index="${index}" class="delete-completed">Delete</button>
                `;
    completedList.appendChild(completedItem);
  });
}

// Initial render
renderTodos();
renderCompletedTasks();

// Function to add a new todo
function addTodo() {
  const taskInput = document.getElementById("task");
  const taskText = taskInput.value.trim();

  if (taskText !== "") {
    todos.push({ text: taskText });
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

// Function to mark a todo as complete
function completeTodo(index) {
  const completedTask = todos[index].text;
  completedTasks.push(completedTask);
  localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
  todos.splice(index, 1);
  localStorage.setItem("todos", JSON.stringify(todos));
  renderTodos();
  renderCompletedTasks();
}

// Function to delete a completed task
function deleteCompletedTask(index) {
  completedTasks.splice(index, 1);
  localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
  renderCompletedTasks();
}

// Event listeners
document.getElementById("add").addEventListener("click", addTodo);

document.getElementById("todos").addEventListener("click", (event) => {
  const target = event.target;
  const index = target.getAttribute("data-index");

  if (target.classList.contains("delete")) {
    deleteTodo(index);
  } else if (target.classList.contains("complete-toggle")) {
    completeTodo(index);
  } else if (target.classList.contains("edit")) {
    const newText = prompt("Edit task:", todos[index].text);
    if (newText !== null) {
      editTodo(index, newText);
    }
  }
});

document.getElementById("completed").addEventListener("click", (event) => {
  const target = event.target;
  const index = target.getAttribute("data-index");

  if (target.classList.contains("delete-completed")) {
    deleteCompletedTask(index);
  }
});
