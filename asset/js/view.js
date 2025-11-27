import header, { updateTaskCount } from "../utils/utils.js";

let taskTbl = document.querySelector('#taskTbl');
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

const displayTasks = () => {
  taskTbl.innerHTML = '';
  tasks.forEach((task, index) => {
    const { title, date, priority, description, id } = task;
    let row = document.createElement('tr');
    row.innerHTML = `
      <td>${index+1}</td>
      <td>${title}</td>
      <td>${date}</td>
      <td>${priority}</td>
      <td>${description}</td>
      <td>
        <button class="btn btn-sm btn-danger" onclick="deleteTask(${id})">Delete</button>
        <button class="btn btn-sm btn-warning" onclick="editTask(${id})">Edit</button>
      </td>
    `;
    taskTbl.appendChild(row);
  });
  updateTaskCount();
};

window.deleteTask = (id) => {
  tasks = tasks.filter(task => task.id != id);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  displayTasks();
};

window.editTask = (id) => {
  const data = tasks.find(task => task.id == id);
  localStorage.setItem('editTaskData', JSON.stringify(data));
  window.location.href = './editTask.html';
};

displayTasks();
