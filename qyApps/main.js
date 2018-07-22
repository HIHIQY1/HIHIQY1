document.addEventListener("contextmenu", (e) => e.preventDefault());
window.addEventListener("resize", mobileCheck);

let neededResources = 0;
let loadedResources = 0;
let qyApps = [];
let specifiedCategory = null;
let isMobile = false;

setup();

function setup() {
    mobileCheck();
    renderToolbar();
    loadApps();
}

function renderToolbar() {
    let toolbar = document.getElementById("toolbar");

    let icon = document.createElement("img");
    icon.id = "toolbarlogo";
    icon.src = "qyAppsIcon.png";

    let homeButton = document.createElement("div");
    homeButton.classList.add("toolbaritem");
    let homeButtonText = document.createElement("span");
    homeButtonText.textContent = "Home";
    homeButton.appendChild(homeButtonText);
    homeButton.addEventListener("mouseup", () => setCategory(null));

    let gamesButton = document.createElement("div");
    gamesButton.classList.add("toolbaritem");
    let gamesButtonText = document.createElement("span");
    gamesButtonText.textContent = "Games";
    gamesButton.appendChild(gamesButtonText);
    gamesButton.addEventListener("mouseup", () => setCategory("games"));

    let appsButton = document.createElement("div");
    appsButton.classList.add("toolbaritem");
    let appsButtonText = document.createElement("span");
    appsButtonText.textContent = "Apps";
    appsButton.appendChild(appsButtonText);
    appsButton.addEventListener("mouseup", () => setCategory("apps"));

    toolbar.appendChild(icon);
    toolbar.appendChild(homeButton);
    toolbar.appendChild(gamesButton);
    toolbar.appendChild(appsButton);
}

function setCategory(category) {
    specifiedCategory = category;
    renderApps();
}

function loadApps() {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "qyApps.json");
    xhr.responseType = "json";
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            qyApps = xhr.response;
            renderApps();
        }
    };
    xhr.send();
}

function renderApps() {
    let appContainer = document.getElementById("container");

    while (appContainer.lastChild) {
        appContainer.removeChild(appContainer.lastChild);
    }

    for (let app of qyApps) {
        let appTile = document.createElement("div");
        appTile.classList.add("tile");

        let appTileTitle = document.createElement("div");
        appTileTitle.classList.add("tiletitle");
        appTileTitle.textContent = app.name;
        appTile.appendChild(appTileTitle);

        let appTilePlatforms = document.createElement("div");
        appTilePlatforms.classList.add("tileplatforms", "tileinfo");
        appTilePlatforms.textContent = "Platforms: " + (app.platforms).toString();
        appTile.appendChild(appTilePlatforms);

        let appTileRelease = document.createElement("div");
        appTileRelease.classList.add("tilerelease", "tileinfo");
        appTileRelease.textContent = "Release: " + app.release;
        appTile.appendChild(appTileRelease);

        appTile.addEventListener("mouseup", () => openAppPage(app.id));

        if (specifiedCategory && app.category) {
            if (app.category == specifiedCategory) {
                appContainer.appendChild(appTile);
            }
        } else {
            appContainer.appendChild(appTile);
        }
    }
}

function openAppPage(id) {
    let selectedApp = qyApps.filter(app => app.id == id)[0];

    renderAppPage(selectedApp);
}

function renderAppPage(selectedApp) {
    let appPage = document.getElementById("apppage");

    while (appPage.lastChild) {
        appPage.removeChild(appPage.lastChild);
    }

    let closeAppPageButton = document.createElement("div");
    closeAppPageButton.id = "btn-close";
    let closeAppPageButtonImg = document.createElement("img");
    closeAppPageButtonImg.src = "cross.svg";
    closeAppPageButton.appendChild(closeAppPageButtonImg);
    closeAppPageButton.addEventListener("mouseup", closeAppPage);
    appPage.appendChild(closeAppPageButton);

    let appImg = document.createElement("img");
    appImg.id = "appimg";
    {
        appImg.src = selectedApp.icon || "unknownicon.svg";
    }
    appPage.appendChild(appImg);

    let appTitle = document.createElement("div");
    appTitle.id = "apptitle";
    appTitle.textContent = selectedApp.name;
    appPage.appendChild(appTitle);

    {
        let spacer = document.createElement("div");
        spacer.classList.add("spacer");
        appPage.appendChild(spacer);
    }

    {
        if (selectedApp.downloads) {
            for (let dl of Object.keys(selectedApp.downloads)) {
                let dlBtn = document.createElement("div");
                dlBtn.classList.add("downloadbutton");
                dlBtn.textContent = dl + " download";
                dlBtn.addEventListener("mouseup", () => window.location.href = selectedApp.downloads[dl]);
                appPage.appendChild(dlBtn);
            }

            let spacer = document.createElement("div");
            spacer.classList.add("spacer");
            appPage.appendChild(spacer);
        }
    }

    if (selectedApp.description) {
        let appDescriptionTitle = document.createElement("div");
        appDescriptionTitle.id = "appinfotitle";
        appDescriptionTitle.innerText = "App Description";
        appPage.appendChild(appDescriptionTitle);

        let appDescription = document.createElement("div");
        appDescription.id = "appdescription";
        appDescription.innerText = selectedApp.description;
        appPage.appendChild(appDescription);

        {
            let spacer = document.createElement("div");
            spacer.classList.add("spacer");
            appPage.appendChild(spacer);
        }
    }

    let appInfoTitle = document.createElement("div");
    appInfoTitle.id = "appinfotitle";
    appInfoTitle.innerText = "App Info";
    appPage.appendChild(appInfoTitle);

    let appInfo = document.createElement("div");
    appInfo.id = "appinfo";
    appInfo.innerText = "Platforms: " + selectedApp.platforms +
        "\nRelease: " + selectedApp.release +
        "\nCategory: " + selectedApp.category +
        "\nVersion: " + selectedApp.version;
    appPage.appendChild(appInfo);

    appPage.style.top = 0;
}
function closeAppPage() {
    let appPage = document.getElementById("apppage");
    appPage.style.top = "100vh";
}

function mobileCheck() {
    let bodyRect = document.body.getBoundingClientRect();
    if (bodyRect.width < bodyRect.height) {
        isMobile = true;
    } else {
        isMobile = false;
    }
}