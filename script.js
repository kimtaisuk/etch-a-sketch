let b10BtnClicked = false; // Buttons are for selecting a pen tool. By default, no button is clicked.
let bwBtnClicked = false;
let rcBtnClicked = false;

let b10Btn = document.querySelector('input[id="btn-b10"]');
let bwBtn = document.querySelector('input[id="btn-bw"]');
let rcBtn = document.querySelector('input[id="btn-rc"]');

// Create the Canvas that contains the grids.
let canvasMade = false;
let makeCanvasBtn = document.querySelector('input[id="btn-mc"]');
makeCanvasBtn.onclick = function() {
    canvasRemover();
    canvasMaker();
    makeCanvasBtn.value="Restart Canvas"
    canvasMade = true;
    bwBtnClicked = true;

    if (bwBtnClicked && canvasMade) {
        bwBtn.classList.add('button-clicked'); 
        b10Btn.classList.remove('button-clicked');
        rcBtn.classList.remove('button-clicked');
    }
    else {
        bwBtn.classList.remove('button-clicked');

    }
}

function gridNumberPrompt() {
    let gridNumber = Number(window.prompt("Enter the number of grids, up to 128", 16)); //16 Grids by Default
    while (gridNumber >= 129 || !Number.isInteger(gridNumber)) {
        alert("The number of grids must be an integer smaller than or equal to 128")
        gridNumber = Number(window.prompt("Enter the number of grids again", 16));

    } 
    return gridNumber;
    
}

let clearBtn = document.querySelector('input[id="btn-clear"]');
clearBtn.onclick = function() {  
    let allGrids = document.querySelectorAll(".single-grid");
    let colorStart = 'rgb(255,255,255)';
    allGrids.forEach((singleGrid) => {
        singleGrid.style.backgroundColor = colorStart; 
        /*
        rcBtnClicked = false;
        bwBtnClicked = true;
        b10BtnClicked = false;
        */
    }
    );
}




// Select a pen tool.

b10Btn.onclick = function() {
    isCanvasMade();
    b10BtnClicked = !b10BtnClicked;
    bwBtnClicked = false;
    rcBtnClicked = false;
    //console.log(b10BtnClicked)
    if (b10BtnClicked && canvasMade) {
        b10Btn.classList.add('button-clicked'); 
        bwBtn.classList.remove('button-clicked');
        rcBtn.classList.remove('button-clicked');
    }
    else {
        b10Btn.classList.remove('button-clicked');

    }
}

bwBtn.onclick = function() {
    isCanvasMade();
    bwBtnClicked = !bwBtnClicked;
    rcBtnClicked = false;
    b10BtnClicked = false;
    //console.log(b10BtnClicked)
    if (bwBtnClicked && canvasMade) {
        bwBtn.classList.add('button-clicked'); 
        b10Btn.classList.remove('button-clicked');
        rcBtn.classList.remove('button-clicked');
    }
    else {
        bwBtn.classList.remove('button-clicked');
    }
}

rcBtn.onclick = function() {
    isCanvasMade();
    rcBtnClicked = !rcBtnClicked;
    bwBtnClicked = false;
    b10BtnClicked = false;
    //console.log(b10BtnClicked)
    if (rcBtnClicked && canvasMade) {
        rcBtn.classList.add('button-clicked'); 
        bwBtn.classList.remove('button-clicked');
        b10Btn.classList.remove('button-clicked');
    }
    else {
        rcBtn.classList.remove('button-clicked');
    }
}

function isCanvasMade() {
    if (!canvasMade) {
        alert('Click Start Canvas first');
    }
}

function canvasMaker() {
    let gridNumber = gridNumberPrompt();
    let gridContainer = document.getElementById('grid-container');
    var colorStart = 'rgb(255,255,255)'; //Default starter color is white given as the 000 RGA values.
    let numberOfGrid = Math.pow(gridNumber,2);
    let totalDefaultSize = 512; //Total number of pixels in one dimension is 512 pixel by default. Make sure it matches with the width in style.css. 
    var gridPixelSize = Math.round(totalDefaultSize/gridNumber) + "px";
    for (let i = 0; i < numberOfGrid; i++){
        let singleGrid = document.createElement('div');
        singleGrid.classList.add('single-grid');  
        singleGrid.setAttribute('style', `width: ${gridPixelSize}; height: ${gridPixelSize}; background-color: ${colorStart};`)
        gridContainer.appendChild(singleGrid);
        //singleGrid.addEventListener('mouseout',outGrid);
        singleGrid.addEventListener('mouseover',hoverGridBW);
        singleGrid.addEventListener('mouseover',hoverGridBlack10);
        singleGrid.addEventListener('mouseover',hoverGridRandomColor);

        // For mobile
        singleGrid.addEventListener('touchstart',hoverGridBW);
        singleGrid.addEventListener('touchstart',hoverGridBlack10);
        singleGrid.addEventListener('touchstart',hoverGridRandomColor);
    
    }
    
    gridContainer.setAttribute('style',`display: grid; grid-template-columns: repeat(${gridNumber}, ${gridPixelSize}); grid-template-rows: repeat(${gridNumber},${gridPixelSize});background-color: white;`)
    
}

function canvasRemover() {
    let gridContainer= document.getElementById("grid-container");
    while (gridContainer.firstChild && gridContainer.firstChild) {
        gridContainer.removeChild(gridContainer.lastChild);
    }
}

//Simple Black and White
function hoverGridBW(event) {
    if (bwBtnClicked) {
        event.target.style.backgroundColor = "black";
    }
}

//Add 10% of Black over each pass
function hoverGridBlack10(event) {
    if (b10BtnClicked) {
        // Get the existing background color:
        let currentColor = event.target.style.backgroundColor;
        let currentRGB = splitRGB(currentColor);
        let newRed = Math.round(currentRGB.red - 25.5);
        let newGreen = Math.round(currentRGB.green - 25.5);
        let newBlue = Math.round(currentRGB.blue - 25.5);
        if (currentRGB.red < 25.5 || currentRGB.blue < 25.5 || currentRGB.green < 25.5) {
            newRed = 0;
            newGreen = 0;
            newBlue = 0;
        }
        let newColor = "rgb(" + newRed + "," + newGreen + "," + newBlue + ")"; 
        event.target.style.backgroundColor = newColor;
    }

}

function splitRGB(rgbInfo) {
    let redNumber = rgbInfo.slice(rgbInfo.indexOf("(")+1,rgbInfo.indexOf(","))
    let greenNumber = rgbInfo.slice(rgbInfo.indexOf(",")+1,rgbInfo.lastIndexOf(","))
    let blueNumber = rgbInfo.slice(rgbInfo.lastIndexOf(",")+1,rgbInfo.indexOf(")"))
    return {
        red: redNumber,
        green: greenNumber,
        blue: blueNumber
    };
}

// Random Color
function hoverGridRandomColor(event) {
    if (rcBtnClicked) {
        let redNumber = Math.round(Math.random()*255);
        let greenNumber = Math.round(Math.random()*255);
        let blueNumber = Math.round(Math.random()*255);
        let newColor = "rgb(" + redNumber + "," + greenNumber + "," + blueNumber + ")"; 
        event.target.style.backgroundColor = newColor;
    }
} 
/*
function outGrid(event) {
    event.target.style.backgroundColor = colorInput;
}
*/