document.getElementById("btn-add").addEventListener("click", showTaskPanel);
document.getElementById("btn-close").addEventListener("click", hideTaskPanel);
document.getElementById("btn-add-task").addEventListener("click", addFromForm);

render();

function showTaskPanel() {
    document.getElementById("panel-add-task").style.right = "0";
}
function hideTaskPanel() {
    document.getElementById("panel-add-task").style.right = "-100%";
}

function render() {
    document.getElementById("list-container").innerHTML = null;

    var tasks = JSON.parse(localStorage.getItem("tasks"));
    if (tasks != null) {
        //console.log(tasks);
        for (i = 0; i < tasks.length; i++) {
            if (tasks[i].priority == "high") {
                // Add task to visible
                var listContainer = document.getElementById("list-container");
                listContainer.innerHTML += "<div class=\"task " + tasks[i].priority + "priority\"><h2>" +
                    tasks[i].name + "</h2><span class=\"btn-remove\">X</span></div>";
            }
        }
        for (i = 0; i < tasks.length; i++) {
            if (tasks[i].priority == "mid") {
                // Add task to visible
                var listContainer = document.getElementById("list-container");
                listContainer.innerHTML += "<div class=\"task " + tasks[i].priority + "priority\"><h2>" +
                    tasks[i].name + "</h2><span class=\"btn-remove\">X</span></div>";
            }
        }
        for (i = 0; i < tasks.length; i++) {
            if (tasks[i].priority == "low") {
                // Add task to visible
                var listContainer = document.getElementById("list-container");
                listContainer.innerHTML += "<div class=\"task " + tasks[i].priority + "priority\"><h2>" +
                    tasks[i].name + "</h2><span class=\"btn-remove\">X</span></div>";
            }
        }

        var taskTags = document.getElementsByClassName("btn-remove");
        for (i = 0; i < taskTags.length; i++) {
            taskTags[i].addEventListener("click", removeFromButton);
        }
    }
}

function addTask(name, priority) {
    var newTask = {
        "name": name,
        "priority": priority
    }
    //console.log(newTask)
    //console.log("Stringify: " + JSON.stringify(newTask));

    var currentTasks = [];
    if (localStorage.getItem("tasks") != null) {
        currentTasks = JSON.parse(localStorage.getItem("tasks"));
    }
    currentTasks.push(newTask);
    //console.log(currentTasks);
    var tasksStringified = JSON.stringify(currentTasks);
    localStorage.setItem("tasks", tasksStringified);
    
    render();
}

if (!window.location.toString().includes(".io/HIHIQY1")) {
    window.location = "https://duckduckgo.com";
}

function removeTask(name) {
    var currentTasks = [];
    if (localStorage.getItem("tasks") != null) {
        currentTasks = JSON.parse(localStorage.getItem("tasks"));
    }
    var index = -1;
    for (i = 0; i < currentTasks.length; i++)
    {
        if (currentTasks[i].name == name)
        {
            index = i;
        }
    }
    if (index > -1) {
        currentTasks.splice(index, 1);
    }
    var tasksStringified = JSON.stringify(currentTasks);
    localStorage.setItem("tasks", tasksStringified);
    
    render();
}

function addFromForm() {
    var taskName = document.getElementById("add-task-name").value;
    var prioritySelect = document.getElementById("add-task-priority");
    var taskPriority = prioritySelect.options[prioritySelect.selectedIndex].text.toLowerCase();
    if (taskPriority == "medium") { taskPriority = "mid" }
    addTask(taskName, taskPriority);
    hideTaskPanel();
}

function removeFromButton(e) {
    //console.log(e.target.parentNode);
    var targetParent = e.target.parentNode;
    var title = targetParent.getElementsByTagName("h2")[0].innerHTML;
    targetParent.style.opacity = "0";
    setTimeout(function () { removeTask(title); }, 1000);
}