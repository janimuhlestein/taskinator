//get the new task button
var buttonEl = document.querySelector("#save-task");
//get the tasks to do id
var tasksToDoEl = document.querySelector("#tasks-to-do");

var createTaskHandler = function() {
    var listItemEL = document.createElement("li");
    listItemEL.className = "task-item";
    listItemEL.textContent = "This is a new task";
    tasksToDoEl.appendChild(listItemEL);
}

buttonEl.addEventListener("click", createTaskHandler);