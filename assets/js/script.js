var formEl = document.querySelector("#task-form");
var tasksToDoEl=document.querySelector("#tasks-to-do");
var pageContentEl = document.querySelector("#page-content");
var taskIdCounter = 0;

var taskFormHandler = function(event) {
   
    event.preventDefault();

    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;

    if(!taskNameInput || !taskTypeInput) {
        alert("You need to fill out the task form!");
        return false;
    }

    formEl.reset();
    var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput
    };

    createTaskEl(taskDataObj);
};

var createTaskEl = function(taskDataObj) {
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";

    //add task id as a custom attribute
    listItemEl.setAttribute("data-task-id", taskIdCounter);

    //creat div to hold task info and add to list item
    var taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";
    taskInfoEl.innerHTML = "<h3 class = 'task-name'>" + taskDataObj.name+ "</h3><span class = 'task-type'>" + taskDataObj.type + "</span>";
    listItemEl.appendChild(taskInfoEl);

    //add in the buttons
    var taskActionsEl = createTaskActions(taskIdCounter);
    listItemEl.appendChild(taskActionsEl);
    //append item to list
    tasksToDoEl.appendChild(listItemEl);

    //increase task counter for next unique id
    taskIdCounter++;
};

var createTaskActions = function(taskID) {
    var actionContainerEl = document.createElement("div");
    actionContainerEl.className="task-actions";

    //create edit buttons
    var editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id", taskID);

    actionContainerEl.appendChild(editButtonEl);

    //create the delete button
    var deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskID);

    actionContainerEl.appendChild(deleteButtonEl);

    //create dropdown
    var statusSelectEl = document.createElement("select");
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskID);

    actionContainerEl.appendChild(statusSelectEl);

     //set up status choices
     var statusChoices = ["To Do", "In Progress", "Completed"];
     for(var i = 0; i < statusChoices.length; i++) {
         var statusOptionEl = document.createElement("option");
         statusOptionEl.textContent = statusChoices[i];
         statusOptionEl.setAttribute("value", statusChoices[i]);
 
         //append to select
         statusSelectEl.appendChild(statusOptionEl);
     }

    return actionContainerEl;

};

var taskButtonHandler = function(event) {
    if(event.target.matches(".delete-btn")) {
        var taskId = event.target.getAttribute("data-task-id");
        console.log(taskId);
        deleteTask(taskId);
    }
};

var deleteTask = function(taskID) {
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskID + "']");
    taskSelected.remove();
};

pageContentEl.addEventListener("click", taskButtonHandler);

formEl.addEventListener("submit", taskFormHandler)