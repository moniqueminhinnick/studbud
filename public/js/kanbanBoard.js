// KANBAN BOARD

const todoList = document.getElementById("todoList");
const doingList = document.getElementById("doingList");

// Basic form DOM elements
const form = document.getElementById("taskForm");
const button = document.querySelector("#taskform > button");

// Selector for the tasklist output
var tasklist = document.querySelector("#tasklist > ul");
//var todo = document.querySelector("#todo .column_items")

// DOM elements for the task input fields
var taskInput = document.getElementById("taskInput");
var dueDateInput = document.getElementById("dueDateInput");
var completionTimeInput = document.getElementById("completionTimeInput");
var estimatedTimeInput = document.getElementById("estimatedTimeInput");
var priorityInput = document.getElementById("priorityInput");

// Form submission event listener
form.addEventListener("submit", function (event) {
  closeForm();
  event.preventDefault();
  let task = taskInput.value;
  let dueDate = dueDateInput.value;
  let completionTime = completionTimeInput.value;
  let estimatedTime = estimatedTimeInput.value;
  let priorityRating = priorityInput.options[priorityInput.selectedIndex].value;
  if (task) {
    addTask(
      task,
      dueDate,
      estimatedTime,
      priorityRating,
      completionTime,
      false
    );
  }
});

// Create global array to track tasks
var taskListArray = [];

// Function to add task with user inputs as parameters
function addTask(
  taskDescription,
  dueDate,
  estimatedTime,
  priorityRating,
  completionTime,
  completionStatus
) {
  let d = new Date();
  let dateCreated = d.getFullYear();
  let task = {
    id: Date.now(),
    taskDescription,
    dueDate,
    dateCreated,
    estimatedTime,
    completionTime,
    priorityRating,
    estimatedTime,
    completionStatus,
  };
  taskListArray.push(task);
  console.log(taskListArray);
  renderTask(task);
}

// Function to display task on screen
function renderTask(task) {
  // Call function - checks if a task has been added
  updateEmpty();

  // Create HTML elements
  let item = document.createElement("div");
  item.classList.add("card", "item", "draggable");
  item.setAttribute("draggable", true);
  item.setAttribute("data-id", task.id);

  item.innerHTML = `<div class='descrip'> ${task.taskDescription}</div> 
    <div class='duedate'> ${task.dueDate} </div> 
    <div class='estimatedT'> Estimated ${task.estimatedTime}mins</div>
    <div class='priority' id='${task.priorityRating}'> ${task.priorityRating} Priority</div>`;

  todoList.appendChild(item);

  // Extra Task DOM elements
  let delButton = document.createElement("button");
  let delButtonText = document.createTextNode("Delete Task");
  delButton.classList.add("deltask");
  delButton.appendChild(delButtonText);
  item.appendChild(delButton);

  // Event Listeners for DOM elements
  delButton.addEventListener("click", function (event) {
    event.preventDefault();
    let id = event.target.parentElement.getAttribute("data-id");
    let index = taskListArray.findIndex((task) => task.id === Number(id));
    removeItemFromArray(taskListArray, index);
    console.log(taskListArray);
    updateEmpty();
    item.remove();
  });

  item.addEventListener("dragstart", () => {
    item.classList.add("dragging");
  });

  item.addEventListener("dragend", () => {
    item.classList.remove("dragging");
  });
}

// Function to remove item from array
function removeItemFromArray(arr, index) {
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
}

// Function to hide the 'you haven't added any tasks' text
function updateEmpty() {
  if (taskListArray.length > 0) {
    document.getElementById("emptyList").style.display = "none";
  } else {
    document.getElementById("emptyList").style.display = "block";
    document.getElementById("taskColumns").style.display = "none !important";
  }
}

// Drag and drop functions for kanban board cards
const containers = document.querySelectorAll(".container");

containers.forEach((container) => {
  container.addEventListener("dragover", (e) => {
    e.preventDefault();
    const draggable = document.querySelector(".dragging");
    container.append(draggable);
  });
});
