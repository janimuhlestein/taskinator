var formEl = document.querySelector("#task-form");
var tasksToDoEl=document.querySelector("#tasks-to-do");

var createTaskHandler = function(event) {
    debugger;
    event.preventDefault();

    var listItemEL = document.createElement("li");
    listItemEL.className = "task-item";
    listItemEL.textContent = "This is a new task";
    tasksToDoEl.appendChild(listItemEL);
    console.log(event);
}

formEl.addEventListener("submit", createTaskHandler)