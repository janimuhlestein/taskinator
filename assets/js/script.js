var formEl = document.querySelector("#task-form");
var tasksToDoEl=document.querySelector("#tasks-to-do");
var pageContentEl = document.querySelector("#page-content");
var tasksInProgressEl = document.querySelector("#tasks-in-progress");
var tasksCompletedEL = document.querySelector("#tasks-completed");
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

    var isEdit = formEl.hasAttribute("data-task-id");

    if(isEdit) {
        var taskId = formEl.getAttribute("data-task-id");
        completeEditTask(taskNameInput, taskTypeInput,taskId);
    }
    else {
    var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput
    };

    createTaskEl(taskDataObj);
};
};

var completeEditTask = function(taskName, taskType, taskId) {
    //find the matching task item
    var taskSelected = document.querySelector(".task-item[data-task-id = '" + taskId + "']");
    //update it
    taskSelected.querySelector("h3.task-name").textContent = taskName;
    taskSelected.querySelector("span.task-type").textContent = taskType;
    alert("Task Updated");

    formEl.removeAttribute("data-task-id");
    document.querySelector("#save-task").textContent = "Add Task";
}

var createTaskEl = function(taskDataObj) {
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";

    //add task id as a custom attribute
    listItemEl.setAttribute("data-task-id", taskIdCounter);
    listItemEl.setAttribute("draggable", "true");

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

    var targetEl = event.target;

    if(targetEl.matches(".edit-btn")) {
        var taskId = targetEl.getAttribute("data-task-id");
        editTask(taskId);
    }

    if(event.target.matches(".delete-btn")) {
        var taskId = event.target.getAttribute("data-task-id");
        console.log(taskId);
        deleteTask(taskId);
    }
};

var editTask = function(taskId) {
    //get task list item
    var taskSelected = document.querySelector(".task-item[data-task-id= '" + taskId + "']")
    //get content from task name and type
    var taskName = taskSelected.querySelector("h3.task-name").textContent;
    var taskType = taskSelected.querySelector("span.task-type").textContent;

    //get taskname and type and put them in the form fields
    document.querySelector("input[name='task-name']").value = taskName;
    document.querySelector("select[name = 'task-type']").value=taskType;

    //change the button name
    document.querySelector("#save-task").textContent = "Save Task";
    formEl.setAttribute("data-task-id", taskId);

};

var deleteTask = function(taskID) {
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskID + "']");
    taskSelected.remove();
};

var taskStatusChangeHandler = function(event) {
    //get the task ID
    var taskId = event.target.getAttribute("data-task-id");

    //get the currently-selected option value and convert to lowercase
    var statusValue = event.target.value.toLowerCase();

    //find the parent task item based on the id
    var taskSelected = document.querySelector(".task-item[data-task-id = '" + taskId + "']");

    console.log(taskSelected);
    //move item
    if(statusValue === "to do") {
        tasksToDoEl.appendChild(taskSelected);
    }
    else if(statusValue === "in progress"){
        tasksInProgressEl.appendChild(taskSelected);
    }
    else if (statusValue === "completed"){
        tasksCompletedEL.appendChild(taskSelected);
    }
};

var dragTaskHandler = function(event) {
    var taskId = event.target.getAttribute("data-task-id");
    event.dataTransfer.setData("text/plain", taskId);
    var getId = event.dataTransfer.getData("text/plain");
};

var dropZoneDragHandler = function(event) {
  var taskListEl = event.target.closest(".task-list");
  if(taskListEl) {
      event.preventDefault();
      taskListEl.setAttribute("style", "background: rgba(68, 233, 255, 0.7); border-style: dashed;");
  }
};

var dropTaskHandler = function(event) {
    var id = event.dataTransfer.getData("text/plain");
    var draggableElement = document.querySelector("[data-task-id='" + id + "']");
    var dropZoneEl = event.target.closest(".task-list");
    var statusType = dropZoneEl.id;
    console.log(statusType);
    var statusSelectEl = draggableElement.querySelector("select[name='status-change']");
    console.log(statusSelectEl.selectIndex);
    if(statusType === "tasks-to-do") {
        statusSelectEl.selectIndex = 0;
    }
    else if(statusType === "tasks-in-progress") {
        statusSelectEl.selectIndex = 1;
    }
    else if(statusType === "tasks-completed") {
        statusSelectEl.selectIndex = 2;
    }
    dropZoneEl.appendChild(draggableElement);
  };



pageContentEl.addEventListener("dragover", dropZoneDragHandler);

pageContentEl.addEventListener("dragstart", dragTaskHandler);

pageContentEl.addEventListener("change", taskStatusChangeHandler);

pageContentEl.addEventListener("click", taskButtonHandler);

formEl.addEventListener("submit", taskFormHandler);

pageContentEl.addEventListener("drop", dropTaskHandler);
//pageContentEl.addEventListener("drop", dropTaskHandler);
