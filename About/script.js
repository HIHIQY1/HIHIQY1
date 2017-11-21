var menuHidden = true;
var menuButton = document.getElementById("menu-button");
var selectedSection;
var section1 = document.getElementById("section-1").innerHTML;

window.addEventListener("load", onLoad);
menuButton.addEventListener("click", switchMenu);
document.getElementById("section-1-button").addEventListener("click", function() {goToSection(document.getElementById("section-1"));});
document.getElementById("section-2-button").addEventListener("click", function() {goToSection(document.getElementById("section-2"));});
document.getElementById("section-3-button").addEventListener("click", function() {goToSection(document.getElementById("section-3"));});
document.getElementById("section-4-button").addEventListener("click", function() {goToSection(document.getElementById("section-4"));});

function switchMenu() {
    var menuFrame = document.getElementById("menu-frame");
    if (menuHidden)
    {
        menuFrame.style.right = "0";
        menuFrame.style.left = "initial";
        menuFrame.style.width = "100%";
        menuFrame.style.animation = "showMenu 1s ease-in-out 1";
        menuHidden = false;
        hideSection();
    }
    else if (!menuHidden)
    {
        menuFrame.style.right = "initial";
        menuFrame.style.left = "0";
        menuFrame.style.width = "0";
        menuFrame.style.animation = "hideMenu 1s ease-in-out 1";
        menuHidden = true;
    }
}

function goToSection(section) {
    selectedSection = section;
    showSection(section);
    switchMenu();
}

function hideSection() {
    if (selectedSection != undefined)
    {
        selectedSection.style.zIndex = "0";
        selectedSection.style.opacity = "0";
        selectedSection.style.animation = "fadeOut .5s ease-in-out 1";
    }
}

function showSection() {
    selectedSection.style.zIndex = "1";
    selectedSection.style.opacity = "1";
    selectedSection.style.animation = "fadeIn .5s ease-in-out 1";
}

function getYrsOld()
{
    // From https://stackoverflow.com/a/10008175
    var birthdate = new Date("2003/12/27");
    var cur = new Date();
    var diff = cur-birthdate;
    var age = Math.floor(diff/31557600000);
    document.getElementById("yrs").textContent = age;
}

function onLoad() {
    getYrsOld();
    document.getElementById("js-unsafe").style.display = "none";
    document.getElementById("js-safe").style.display = "initial";
    section1 = document.getElementById("section-1").innerHTML;
}