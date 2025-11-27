import header from "../utils/utils.js";

const inputs = document.querySelectorAll('#taskForm input, #taskForm textarea, #taskForm select');
const form = document.querySelector('#taskForm');

if (inputs.length > 0) inputs[0].focus();

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let data = JSON.parse(localStorage.getItem('editTaskData')) || {};

// Populate form with existing task data
inputs.forEach((input) => {
  if (data && data[input.name] !== undefined) input.value = data[input.name];
});

// Update data object on input
inputs.forEach((input) => {
  input.addEventListener('input', (e) => {
    const { name, value } = e.target;
    data = { ...data, [name]: value };
  });
});

// Handle form submission
form.addEventListener('submit', (e) => {
  e.preventDefault();

  // Update task in tasks array
  tasks = tasks.map(task => task.id === data.id ? data : task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
  localStorage.removeItem('editTaskData');

  // Redirect to task view page
  window.location.href = './viewTasks.html';
});
