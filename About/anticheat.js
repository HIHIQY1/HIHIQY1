var section1 = document.getElementById("section-1").innerHTML;
var section2 = document.getElementById("section-2").innerHTML;
var section3 = document.getElementById("section-3").innerHTML;
var section4 = document.getElementById("section-4").innerHTML;
window.addEventListener("load", function() { setTimeout(onLoad, 500); });

function onLoad() {
    section1 = document.getElementById("section-1").innerHTML;
    section2 = document.getElementById("section-2").innerHTML;
    section3 = document.getElementById("section-3").innerHTML;
    section4 = document.getElementById("section-4").innerHTML;
    setInterval(resetText, 100)
}

function resetText() {
    if (document.getElementById("section-1").innerHTML != section1)
    { document.getElementById("section-1").innerHTML = section1; }
    if (document.getElementById("section-2").innerHTML != section2)
    { document.getElementById("section-2").innerHTML = section2; }
    if (document.getElementById("section-3").innerHTML != section3)
    { document.getElementById("section-3").innerHTML = section3; }
    if (document.getElementById("section-4").innerHTML != section4)
    { document.getElementById("section-4").innerHTML = section4; }
}