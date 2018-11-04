let Pnl_Main = document.getElementById("main");
let Pnl_Load = document.getElementById("pnl-load");
let Pnl_Quiz = document.getElementById("quiz");
let Pnl_ButtonContainer = document.getElementById("pnl-buttoncontainer");
let Btn_LoadToMain = document.getElementById("btn-loadtomain");
let Pnl_QuizCredits = document.getElementById("pnl-quizcredits");
let Btn_CreditsToLoad = document.getElementById("btn-creditstoload");
let Btn_StartQuiz = document.getElementById("btn-startquiz");
let Pnl_About = document.getElementById("pnl-about");
let Btn_AboutToMain = document.getElementById("btn-abouttomain");

let tempLevelJSON;

setupMain();

function setupMain() {
    {
        let newSpacer = document.createElement("div");
        newSpacer.classList.add("spacer5");
        Pnl_Main.insertBefore(newSpacer, Pnl_ButtonContainer);
    }

    let Btn_LoadFromCode = document.createElement("div");
    Btn_LoadFromCode.classList.add("button");
    Btn_LoadFromCode.innerText = "Load from code";
    Btn_LoadFromCode.addEventListener("click", () => {
        Pnl_Main.style.display = "none";
        Pnl_Load.style.display = "initial";
    });
    Pnl_ButtonContainer.appendChild(Btn_LoadFromCode);

    {
        let newSpacer = document.createElement("div");
        newSpacer.classList.add("spacer2");
        Pnl_ButtonContainer.appendChild(newSpacer);
    }

    let Btn_ToEditor = document.createElement("div");
    Btn_ToEditor.classList.add("button");
    Btn_ToEditor.innerText = "Quizeditor";
    Btn_ToEditor.addEventListener("click", () => {
        window.location.replace("./Editor/index.html");
    });
    Pnl_ButtonContainer.appendChild(Btn_ToEditor);

    {
        let newSpacer = document.createElement("div");
        newSpacer.classList.add("spacer2");
        Pnl_ButtonContainer.appendChild(newSpacer);
    }

    let Btn_About = document.createElement("div");
    Btn_About.classList.add("button");
    Btn_About.innerText = "About qQuiz";
    Btn_About.addEventListener("click", () => {
        document.getElementById("swart").style.height = "100vh";
        document.getElementById("swart").style.opacity = "1";
        setTimeout(() => {
            Pnl_Main.style.display = "none";
            Pnl_About.style.display = "initial";
            setTimeout(() => {
                document.getElementById("swart").style.opacity = "0";
                setTimeout(() => { document.getElementById("swart").style.height = "0"; }, 750);
            }, 250);
        }, 500);
    });
    Pnl_ButtonContainer.appendChild(Btn_About);

    Btn_AboutToMain.addEventListener("click", () => {
        document.getElementById("swart").style.height = "100vh";
        document.getElementById("swart").style.opacity = "1";
        setTimeout(() => {
            Pnl_About.style.display = "";
            Pnl_Main.style.display = "";
            setTimeout(() => {
                document.getElementById("swart").style.opacity = "0";
                setTimeout(() => { document.getElementById("swart").style.height = "0"; }, 750);
            }, 250);
        }, 500)
    });

    Btn_LoadToMain.addEventListener("click", () => {
        Pnl_Load.style.display = "";
        Pnl_Main.style.display = "";
    });

    Btn_CreditsToLoad.addEventListener("click", () => {
        let Btn_Load = document.getElementById("btn-load");
        Btn_Load.setAttribute("enabled", "true");
        Btn_Load.style.backgroundColor = "";
        document.getElementById("text").removeAttribute("disabled");
        Pnl_Load.style.display = "initial";
        Pnl_QuizCredits.style.display = "";
    });

    Btn_StartQuiz.addEventListener("click", () => {
        quizCreditsChecked();
    });
}

document.getElementById("btn-load").addEventListener("mouseup", () => {
    let btn = document.getElementById("btn-load");
    let codeElement = document.getElementById("text");
    if (btn.getAttribute("enabled") == "true") {
        btn.setAttribute("enabled", "false");
        btn.style.backgroundColor = "rgb(50, 50, 50)";

        codeElement.setAttribute("disabled", "true");

        let valu = document.getElementById("text").value;
        if (valu) {
            decryptLevelData(valu);
        }
        else {
            codeElement.style.backgroundColor = "rgb(255, 0, 0)";
            setTimeout(() => {
                codeElement.style.backgroundColor = "";
                btn.setAttribute("enabled", "true");
                btn.style.backgroundColor = "";
            }, 500);
        }
    }
});

function decryptLevelData(levelData) {
    // encrypt = btoa(unescape(encodeURIComponent(str))))
    let decryptedLevelData;
    let levelJSON;
    try {
        try {
            decryptedLevelData = atob(levelData);
        }
        catch {
            decryptedLevelData = LZString.decompressFromUTF16(levelData);
        }
        levelJSON = JSON.parse(decryptedLevelData);
    }
    catch (err) {
        showParseError();
    }
    if (!decryptedLevelData || !levelJSON) {
        showParseError();
    }

    if (decryptedLevelData && levelJSON) {
        document.getElementById("loadbar").style.width = "75%";

        setTimeout(() => {
            document.getElementById("swart").style.height = "100vh";
            document.getElementById("swart").style.opacity = "1";
            setTimeout(() => {
                Pnl_Load.style.display = "";
                Pnl_QuizCredits.style.display = "initial";
                document.getElementById("loadbar").style.width = "";
                tempLevelJSON = levelJSON;
                renderQuizCredits();
                document.getElementById("swart").style.opacity = "0";
                setTimeout(() => { document.getElementById("swart").style.height = "0"; }, 750);
            }, 500);
        }, 750);
    }
}

function showParseError() {
    let codeElement = document.getElementById("text");
    codeElement.style.backgroundColor = "rgb(255, 0, 0)";
    setTimeout(() => {
        codeElement.style.backgroundColor = "";
        codeElement.removeAttribute("disabled");
    }, 500);

    let btn = document.getElementById("btn-load");
    setTimeout(() => {
        btn.setAttribute("enabled", "true");
        btn.style.backgroundColor = "";
    }, 500);
}

function renderQuizCredits() {
    let QuizCredits = document.getElementById("quizcredits");
    while (QuizCredits.children.length) {
        QuizCredits.removeChild(QuizCredits.children[0]);
    }
    let H1_QuizName = document.createElement("h1");
    H1_QuizName.innerText = tempLevelJSON.name;
    H1_QuizName.classList.add("quiztitle");
    QuizCredits.appendChild(H1_QuizName);
    let Par_QuizCredits = document.createElement("p");
    Par_QuizCredits.innerText = "Quiz made by: " + tempLevelJSON.author
        + "\n Questions: " + tempLevelJSON.questions.length +
        "\nLast edited on: " + new Date(tempLevelJSON.lastEdited).toLocaleString();
    QuizCredits.appendChild(Par_QuizCredits);
}

function quizCreditsChecked() {
    document.getElementById("swart").style.height = "100vh";
    document.getElementById("swart").style.opacity = "1";
    setTimeout(() => {
        Pnl_QuizCredits.style.display = "";
        Pnl_Quiz.style.display = "initial";
        document.getElementById("loadbar").style.width = "";
        setupQuiz(tempLevelJSON);
        setTimeout(() => {
            document.getElementById("swart").style.opacity = "0";
            setTimeout(() => { document.getElementById("swart").style.height = "0"; }, 750);
        }, 250);
    }, 500);
}