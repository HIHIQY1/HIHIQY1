function heleu()
{
   document.getElementById("bigcontent").style.top = 0;
   document.getElementById("bigcontent").style.height = "100%";
   document.getElementById("tab5").style.top = 0;
   document.getElementById("tab5").style.height = "100%";
   document.getElementById("tab5").style.width = "10%";
   document.getElementById("bigcontent").style.opacity = "1";
   document.getElementById("tab5").style.backgroundColor = "rgb(100, 100, 100)";
}
function ueleh()
{
   document.getElementById("bigcontent").style.top = "-100%";
   document.getElementById("bigcontent").style.height = "200px";
   document.getElementById("tab5").style.top = "-140px";
   document.getElementById("tab5").style.height = "200px";
   document.getElementById("bigcontent").style.opacity = "0";
   document.getElementById("tab5").style.backgroundColor = "rgb(100, 255, 100)";
}
function getYrsOld()
{
    // From https://stackoverflow.com/a/10008175
    // Thanks!
    // TTT H  H  X   X
    //  TT  HHH    X
    //  TT  H  H  X   X
    var birthdate = new Date("2003/12/27");
    var cur = new Date();
    var diff = cur-birthdate;
    var age = Math.floor(diff/31557600000);
    document.getElementById("yrs").textContent = age;
}
function WhenLoaded()
{
    getYrsOld();
}