document.getElementById("file-input").addEventListener("input", handleInput);

let Pnl_Input = document.getElementById("pnl-input");
let Pnl_Scale = document.getElementById("pnl-scale");
let Pnl_Output = document.getElementById("pnl-output");

document.getElementById("btn-render").addEventListener("click", () => {
    Pnl_Scale.style.transform = "scale(0)";
    Pnl_Scale.style.opacity = 0;
    convertImage();
});

document.getElementById("btn-backtohome").addEventListener("click", () => {
    Pnl_Output.style.transform = "scale(0)";
    Pnl_Output.style.opacity = 0;
    Pnl_Input.style.transform = "scale(1)";
    Pnl_Input.style.opacity = 1;
})

let loadedImage;

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let scaleFactor = 1;

function handleInput(e) {
    Pnl_Input.style.transform = "scale(0)";
    Pnl_Input.style.opacity = 0;
    showScalePanel();

    let fr = new FileReader();
    fr.addEventListener("load", () => {
        //newImg.src = fr.result;
        loadedImage = fr.result;
    });
    fr.addEventListener("error", () => {
        console.log("couldn't read");
    })
    fr.readAsDataURL(e.target.files[0]);
}

function showScalePanel() {
    Pnl_Scale.style.transform = "scale(1)";
    Pnl_Scale.style.opacity = 1;
}

function convertImage() {
    scaleFactor = document.getElementById("scale").value;

    let newImg = new Image();
    newImg.addEventListener("load", () => {
        //document.getElementById("img-converted").src = newImg;
        //document.getElementById("img-converted").src = fr.result;
        //console.log("loaded");
        console.log(newImg.width);
        canvas.width = newImg.width * scaleFactor;
        canvas.height = newImg.height * scaleFactor;
        ctx.drawImage(newImg, 0, 0, newImg.width * scaleFactor, newImg.height * scaleFactor);
        document.getElementById("img-converted").src = canvas.toDataURL();

        Pnl_Output.style.transform = "scale(1)";
        Pnl_Output.style.opacity = 1;
    });
    newImg.addEventListener("error", () => {
        console.log("err");
    });
    newImg.src = loadedImage;
}