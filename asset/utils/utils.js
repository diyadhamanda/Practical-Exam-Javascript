// utils.js
let brand = "Task Manager";

// Navbar
const header = document.querySelector("header");
if(header){
  header.innerHTML = `
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top shadow-sm">
    <div class="container">
      <a class="navbar-brand fw-bold" href="../index.html">${brand}</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMain">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navMain">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item"><a class="nav-link" href="../index.html">Home</a></li>
          <li class="nav-item"><a class="nav-link" href="../addTask.html">Add Task</a></li>
          <li class="nav-item"><a class="nav-link" href="../viewTasks.html">View Tasks</a></li>
        </ul>
        <div class="d-flex align-items-center">
          <i class="bi bi-list-task fs-4 text-white position-relative">
            <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">0</span>
          </i>
        </div>
      </div>
    </div>
  </nav>`;
}

// Update task count
export function updateTaskCount(){
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const badge = document.querySelector(".badge.bg-danger");
  if(badge) badge.textContent = tasks.length;
}
updateTaskCount();
