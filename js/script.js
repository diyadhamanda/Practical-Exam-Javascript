window.onload = () => {

    let taskInput = document.getElementById("task");
    let descInput = document.getElementById("description");
    let dateInput = document.getElementById("date");
    let timeInput = document.getElementById("time");
    let taskCards = document.getElementById("taskCards");

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    let editId = null;

    taskInput.focus();

    // Save Task
    window.saveTask = () => {

        if (taskInput.value === "" || descInput.value === "" || dateInput.value === "" || timeInput.value === "") {
            alert("Please fill all fields!");
            return;
        }

        if (editId === null) {

            tasks.push({
                id: Date.now(),
                task: taskInput.value,
                description: descInput.value,
                date: dateInput.value,
                time: timeInput.value
            });

        } else {

            tasks = tasks.map(t =>
                t.id == editId
                    ? { ...t, task: taskInput.value, description: descInput.value, date: dateInput.value, time: timeInput.value }
                    : t
            );

            editId = null;
        }

        localStorage.setItem("tasks", JSON.stringify(tasks));
        clearForm();
        displayTasks();
    };

    // Clear form
    const clearForm = () => {
        taskInput.value = "";
        descInput.value = "";
        dateInput.value = "";
        timeInput.value = "";
        taskInput.focus();
    };

    // Display tasks (CARD FORMAT)
    window.displayTasks = () => {

        taskCards.innerHTML = "";

        tasks.forEach(t => {

            let col = document.createElement("div");
            col.className = "col-md-4";

            col.innerHTML = `
                <div class="card mb-3 shadow-sm">
                    <div class="card-body">
                        <h5 class="card-title">${t.task}</h5>
                        <p class="card-text">${t.description}</p>
                        <p><strong>Date:</strong> ${t.date}</p>
                        <p><strong>Time:</strong> ${t.time}</p>

                        <div class="d-flex justify-content-between mt-3">
                            <button class="btn btn-warning btn-sm" onclick="editTask(${t.id})">Edit</button>
                            <button class="btn btn-danger btn-sm" onclick="deleteTask(${t.id})">Delete</button>
                        </div>
                    </div>
                </div>
            `;

            taskCards.appendChild(col);
        });
    };

    // Edit Task
    window.editTask = (id) => {
        let t = tasks.find(x => x.id === id);
        editId = id;

        taskInput.value = t.task;
        descInput.value = t.description;
        dateInput.value = t.date;
        timeInput.value = t.time;

        taskInput.focus();
    };

    // Delete Task
    window.deleteTask = (id) => {
        tasks = tasks.filter(t => t.id !== id);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        displayTasks();
    };

    // Initial load
    displayTasks();
};
