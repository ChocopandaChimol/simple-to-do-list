const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const completedCounter = document.getElementById("completed-counter");
const uncompletedCounter = document.getElementById("uncompleted-counter");

document.addEventListener('DOMContentLoaded', loadTasks);

function addTask() {
    const task = inputBox.value.trim();
    if (!task) {
        alert("Silakan tulis tugas");
        return;
    }

    const li = document.createElement("li");
    li.innerHTML = `
        <label>
            <input type="checkbox">
            <span>${task}</span>
        </label>
        <span class="edit-btn">Edit</span>
        <span class="delete-btn">Hapus</span>
    `;

    const checkbox = li.querySelector("input");
    const editBtn = li.querySelector(".edit-btn");
    const taskSpan = li.querySelector("span");
    const deleteBtn = li.querySelector(".delete-btn");

    checkbox.addEventListener("click", function () {
        li.classList.toggle("completed", checkbox.checked);
        updateCounters();
    });

    editBtn.addEventListener("click", function () {
        const update = prompt("Edit tugas:", taskSpan.textContent);
        if (update !== null) {
            taskSpan.textContent = update;
            li.classList.remove("completed");
            checkbox.checked = false;
            updateCounters();
        }
    });

    deleteBtn.addEventListener("click", function () {
        if (confirm("Apakah Anda yakin ingin menghapus tugas ini?")) {
            li.remove();
            updateCounters();
        }
    });

    listContainer.appendChild(li);
    inputBox.value = "";
    updateCounters();
}

function updateCounters() {
    const completedTasks = document.querySelectorAll(".completed").length;
    const uncompletedTasks = document.querySelectorAll("li:not(.completed)").length;

    completedCounter.textContent = completedTasks;
    uncompletedCounter.textContent = uncompletedTasks;
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        const li = document.createElement("li");
        li.innerHTML = `
            <label>
                <input type="checkbox" ${task.completed ? 'checked' : ''}>
                <span>${task.text}</span>
            </label>
            <span class="edit-btn">Edit</span>
            <span class="delete-btn">Hapus</span>
        `;

        const checkbox = li.querySelector("input");
        const editBtn = li.querySelector(".edit-btn");
        const taskSpan = li.querySelector("span");
        const deleteBtn = li.querySelector(".delete-btn");

        checkbox.addEventListener("click", function () {
            li.classList.toggle("completed", checkbox.checked);
            updateCounters();
            saveTasks();
        });

        editBtn.addEventListener("click", function () {
            const update = prompt("Edit tugas:", taskSpan.textContent);
            if (update !== null) {
                taskSpan.textContent = update;
                li.classList.remove("completed");
                checkbox.checked = false;
                updateCounters();
                saveTasks();
            }
        });

        deleteBtn.addEventListener("click", function () {
            if (confirm("Apakah Anda yakin ingin menghapus tugas ini?")) {
                li.remove();
                updateCounters();
                saveTasks();
            }
        });

        listContainer.appendChild(li);
    });
    updateCounters();
}

function saveTasks() {
    const tasks = [];
    document.querySelectorAll("#list-container li").forEach(li => {
        const taskText = li.querySelector("span").textContent;
        const taskCompleted = li.classList.contains("completed");
        tasks.push({ text: taskText, completed: taskCompleted });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
