document.addEventListener("contextmenu", e => {
    e.preventDefault();
});

let Pnl_Home = document.getElementById("pnl-home");
let Par_Home = document.getElementById("par-home");
let Btn_Wiki = document.getElementById("btn-wiki");
let Btn_ToHome = document.getElementById("btn-tohome");
let Pnl_Prestart = document.getElementById("pnl-prestart");
let Btn_Prestart = document.getElementById("btn-prestart");
let Btn_ToWarning = document.getElementById("btn-towarning");
let Pnl_Warning = document.getElementById("pnl-warning");
let Btn_ToMainCheck = document.getElementById("btn-tomaincheck");
let Pnl_MainCheck = document.getElementById("pnl-maincheck");
let Pnl_Instructions = document.getElementById("pnl-instructions");
let Btn_ToInstructions = document.getElementById("btn-toinstructions");
let Btn_Start = document.getElementById("btn-start");
let Pnl_Main = document.getElementById("pnl-main");
let Img_RedGreen = document.getElementById("img-redgreen");
let Pnl_After = document.getElementById("pnl-after");
let Btn_ToFinal = document.getElementById("btn-tofinal");
let Pnl_Final = document.getElementById("pnl-final");
let Btn_Finish = document.getElementById("btn-finish");
let Btn_ToLightlyColored = document.getElementById("btn-tolightlycolored");
let Pnl_LightlyColored = document.getElementById("pnl-lightlycolored");

let MainLoopId;
let Display_Red = true;

let Btns_ToHome = document.getElementsByClassName("btn-home");
for (let Btn_Stop of Btns_ToHome) {
    Btn_Stop.addEventListener("click", emergencyStop);
}

setup();

Btn_Prestart.addEventListener("click", () => {
    Pnl_Home.style.visibility = "";
    Pnl_Home.style.opacity = 0;
    setTimeout(() => {
        Pnl_Prestart.style.visibility = "initial";
        Pnl_Prestart.style.opacity = 1;
    }, 1000);
});

Btn_ToHome.addEventListener("click", () => {
    Pnl_Prestart.style.visibility = "";
    Pnl_Prestart.style.opacity = 0;
    setTimeout(() => {
        Pnl_Home.style.visibility = "initial";
        Pnl_Home.style.opacity = 1;
    }, 1000);
});

Btn_ToWarning.addEventListener("click", () => {
    Pnl_Prestart.style.visibility = "";
    Pnl_Prestart.style.opacity = 0;
    setTimeout(() => {
        Pnl_Warning.style.visibility = "initial";
        Pnl_Warning.style.opacity = 1;
    }, 1000);
});

Btn_Wiki.addEventListener("click", () => {
    Pnl_Home.style.visibility = "";
    Pnl_Home.style.opacity = 0;
    setTimeout(() => {
        window.location.href =
            "https://en.m.wikipedia.org/wiki/McCollough_effect";
    }, 1500);
});

Btn_ToMainCheck.addEventListener("click", () => {
    Pnl_Warning.style.visibility = "";
    Pnl_Warning.style.opacity = 0;
    setTimeout(() => {
        Pnl_MainCheck.style.visibility = "initial";
        Pnl_MainCheck.style.opacity = 1;
    }, 1500);
});

Btn_ToInstructions.addEventListener("click", () => {
    Pnl_MainCheck.style.visibility = "";
    Pnl_MainCheck.style.opacity = 0;
    document.body.style.backgroundColor = "black";
    setTimeout(() => {
        Pnl_Instructions.style.visibility = "initial";
        Pnl_Instructions.style.opacity = 1;
    }, 1000);
});

Btn_ToLightlyColored.addEventListener("click", () => {
    Pnl_MainCheck.style.visibility = "";
    Pnl_MainCheck.style.opacity = 0;
    document.body.style.backgroundColor = "black";
    setTimeout(() => {
        Pnl_LightlyColored.style.visibility = "initial";
        Pnl_LightlyColored.style.opacity = 1;
    }, 1000);
});

Btn_Start.addEventListener("click", () => {
    Pnl_Instructions.style.visibility = "";
    Pnl_Instructions.style.opacity = 0;
    setTimeout(() => {
        Pnl_Main.style.visibility = "initial";
        Pnl_Main.style.opacity = 1;
        setTimeout(() => {
            Pnl_Main.style.visibility = "";
            Pnl_Main.style.opacity = 0;
            clearInterval(MainLoopId);
            setTimeout(() => {
                //asdfghjklqwertyuiop to keep the formatter from formatting this empty block;
                Pnl_After.style.visibility = "initial";
                Pnl_After.style.opacity = 1;
            }, 1000);
        }, 1000 * 60 * parseFloat(document.getElementById("num-time").value));
        MainLoopId = setInterval(mainLoop, 10000);
    }, 1000);
});

Btn_ToFinal.addEventListener("click", () => {
    Pnl_After.style.visibility = "";
    Pnl_After.style.opacity = 0;
    setTimeout(() => {
        Pnl_Final.style.visibility = "initial";
        Pnl_Final.style.opacity = 1;
    }, 1000);
});

Btn_Finish.addEventListener("click", () => {
    Pnl_Final.style.visibility = "";
    Pnl_Final.style.opacity = 0;
    setTimeout(() => {
        Pnl_Home.style.visibility = "initial";
        Pnl_Home.style.opacity = 1;
    }, 1500);
});

function mainLoop() {
    Img_RedGreen.setAttribute("src", Display_Red ? "green.svg" : "red.svg");
    Display_Red = Display_Red ? false : true;
}

function setup() {
    setTimeout(() => {
        Pnl_Home.style.visibility = "initial";
        Pnl_Home.style.opacity = 1;
        Par_Home.style.opacity = 1;
    }, 1000);
}

function emergencyStop() {
    document.body.style.backgroundColor = "";
    for (pnl of document.getElementsByClassName("panel")) {
        pnl.style.visibility = "";
        pnl.style.opacity = 0;
    }
    setTimeout(() => {
        Pnl_Home.style.visibility = "initial";
        Pnl_Home.style.opacity = 1;
    }, 1500);
}
