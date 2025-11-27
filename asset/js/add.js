import header, { updateTaskCount } from "../utils/utils.js";

const form = document.querySelector('#taskForm');
const inputs = document.querySelectorAll('#taskForm input, #taskForm textarea, #taskForm select');

if (inputs.length > 0) inputs[0].focus();

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let data = {};

inputs.forEach((input) => {
  input.addEventListener('input', (e) => {
    const { name, value } = e.target;
    data = { ...data, [name]: value };
  });
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  tasks.push({ ...data, id: Date.now() });
  localStorage.setItem('tasks', JSON.stringify(tasks));
  form.reset();
  inputs[0].focus();
  updateTaskCount();
});
