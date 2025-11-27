
let taskTbl = document.querySelector(".task-data .row");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const displayTasks = () => {
  taskTbl.innerHTML = "";
  
  if (tasks.length === 0) {
    taskTbl.innerHTML = `
      <div class="text-center py-5">
        <h4>No tasks added yet!</h4>
        <button class="btn btn-primary mt-3" onclick="showTaskForm()">Add Task</button>
      </div>`;
    return;
  }

  tasks.forEach((task) => {
    const { title, date, priority, description, id } = task;

    let col = document.createElement("div");
    col.classList.add("col-md-4", "mb-4");

    col.innerHTML = `
      <div class="card h-100 shadow-sm">
        <div class="card-body">
          <h5 class="card-title">${title}</h5>
          <h6 class="card-subtitle mb-2 text-muted">${date}</h6>
          <p class="card-text">${description}</p>
          <span class="badge ${getPriorityClass(priority)}">${priority}</span>
        </div>
        <div class="card-footer border-0 bg-transparent text-center">
          <button class="btn btn-danger w-100" onclick="deleteTask(${id})">
            <i class="bi bi-trash"></i> Delete Task
          </button>
        </div>
      </div>
    `;
    taskTbl.appendChild(col);
  });
};

const getPriorityClass = (priority) => {
  switch(priority) {
    case 'High': return 'bg-danger';
    case 'Medium': return 'bg-warning text-dark';
    case 'Low': return 'bg-success';
    default: return 'bg-secondary';
  }
};

const addTask = (task) => {
  task.id = Date.now(); 
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  displayTasks();
};

const deleteTask = (id) => {
  tasks = tasks.filter(task => task.id !== id);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  displayTasks();
};

// Optional: show/hide task form function
const showTaskForm = () => {
  document.getElementById("taskFormContainer").classList.toggle("d-none");
};

// Expose functions to global scope
window.addTask = addTask;
window.deleteTask = deleteTask;
window.showTaskForm = showTaskForm;

// Initial render
displayTasks();
