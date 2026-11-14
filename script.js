// Get HTML elements
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

// Store tasks
let tasks = [];

// Save tasks in localStorage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Display tasks
function displayTasks() {

    // Clear old list
    taskList.innerHTML = "";

    // Loop through tasks
    tasks.forEach(function(task, index) {

        // Create a new list item
        const li = document.createElement("li");

        // Show task name 
        li.textContent = task.name;

        // Check if task is completed
        if (task.completed) {
            li.classList.add("completed");
        }

        // Create delete button
        const deleteBtn = document.createElement("button");

        deleteBtn.textContent = "Delete";

        // Delete task
        deleteBtn.addEventListener("click", function(event) {

    event.stopPropagation();

    tasks.splice(index, 1);

    saveTasks();

    displayTasks();
});
        // Mark task as completed
        li.addEventListener("click", function() {

            task.completed = !task.completed;

            saveTasks();

            displayTasks();
        });

        // Add delete button to list item
        li.appendChild(deleteBtn);

        // Add list item to the page
        taskList.appendChild(li);

    });
}

// Add new task
function addTask() {

    // Get input value
    const taskName = taskInput.value.trim();

    // Check if input is empty
    if (taskName === "") {
        alert("Please enter a task!");
        return;
    }

    // Create a task object
    const newTask = {
        name: taskName,
        completed: false
    };

    // Add task to array
    tasks.push(newTask);

    // Save tasks
    saveTasks();

    // Display updated tasks
    displayTasks();

    // Clear input
    taskInput.value = "";
}

// Listen for button click
addBtn.addEventListener("click", addTask);

// Load saved tasks
const savedTasks = localStorage.getItem("tasks");

// Check if saved tasks exist
if (savedTasks !== null) {
    tasks = JSON.parse(savedTasks);
}

// Display saved tasks
displayTasks();