var allButtons = document.getElementsByClassName("level-button");
for (i = 0; i < allButtons.length; i++) {
    allButtons[i].addEventListener("mousedown", function(e) { toLevel(e); })
}

function toLevel(e) {
    window.location = "level" + e.target.id[e.target.id.length - 1] + ".html";
}