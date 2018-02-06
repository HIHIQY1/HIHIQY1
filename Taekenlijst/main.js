// COPYLEFT (ᴐ) HIHIQY1 2018

document.getElementById("btn-add").addEventListener("click", showTaskPanel);
document.getElementById("btn-close").addEventListener("click", hideTaskPanel);
document.getElementById("btn-add-task").addEventListener("click", addFromForm);
document.getElementById("welcomeokbutton").addEventListener("click", welcomeOK);

checkWelcome();
render();

function showTaskPanel() {
    document.getElementById("panel-add-task").style.right = "0";
}
function hideTaskPanel() {
    document.getElementById("panel-add-task").style.right = "-100%";
}

function render() {
    document.getElementById("list-container").innerHTML = "";

    var tasks = JSON.parse(localStorage.getItem("tasks"));
    if (tasks != null) {
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
}

function addFromForm() {
    var taskName = document.getElementById("add-task-name").value;
    if (taskName.length > 0) {
        var prioritySelect = document.getElementById("add-task-priority");
        var taskPriority = prioritySelect.options[prioritySelect.selectedIndex].text.toLowerCase();
        if (taskPriority == "medium") { taskPriority = "mid" }
        addTask(taskName, taskPriority);
        hideTaskPanel();
    }
}

function removeFromButton(e) {
    var targetParent = e.target.parentNode;
    var title = targetParent.getElementsByTagName("h2")[0].innerHTML;
    targetParent.style.opacity = "0";
    removeTask(title);
    setTimeout(function () { render(); }, 1000);
}

function checkWelcome() {
    var answer = localStorage.getItem("welcome");
    if (answer == null) {
        document.getElementById("welcomepanel").style.right = "0";
    }
}

function welcomeOK() {
    localStorage.setItem("welcome", "OK");
    document.getElementById("welcomepanel").style.transitionDuration = "1s";
    document.getElementById("welcomepanel").style.right = "-100%";
}