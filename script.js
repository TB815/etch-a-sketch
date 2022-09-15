const STARTING_COLOR = '#facfac';
const STARTING_MODE = 'color';
const STARTING_GRID_SIZE = 16;

let currentColor = STARTING_COLOR;
let currentMode = STARTING_MODE;
let currentGridSize = STARTING_GRID_SIZE;

const colorPicker = document.getElementById('colorPicker');
const colorBtn = document.getElementById('colorBtn');
const rainbowBtn = document.getElementById('rainbowBtn');
const clearBtn = document.getElementById('clearBtn');
const eraseBtn = document.getElementById('eraseBtn');
const sizeValue = document.getElementById('sizeOfGrid');
const grid = document.getElementById('grid');
const slider = document.getElementById('slider');

function setCurrentColor(newColor) {
    currentColor = newColor;
}

function setCurrentMode(newMode) {
    activate(newMode);
    currentMode = newMode;
}

function setCurrentGridSize(newGridSize) {
    currentGridSize = newGridSize;
}

function theGrid(size) {
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    for (let i = 0; i < size * size; i++) {
        const gridElem = document.createElement('div');
        gridElem.classList.add('gridElement');
        gridElem.addEventListener('mousedown', changeColor);
        gridElem.addEventListener('mouseover', changeColor);
        grid.appendChild(gridElem);
    }
}

let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

colorPicker.oninput = (e) => setCurrentColor(e.target.value);
colorBtn.onclick = () => setCurrentMode('color');
rainbowBtn.onclick = () => setCurrentMode('rainbowColor');
eraserBtn.onclick = () => setCurrentMode('eraser');
clearBtn.onclick = () => reloadGrid();
slider.onmousemove = (e) => updateSize(e.target.value);
slider.onchange = (e) => changeGridSize(e.target.value);

function activate(newMode) {
    if (currentMode === 'rainbowColor') {
        rainbowBtn.classList.remove('active');
    } else if (currentMode === 'eraser') {
        eraserBtn.classList.remove('active');
    } else if (currentMode === 'clear') {
        clearBtn.classList.remove('active');
    }

    if (newMode === 'rainbowColor') {
        rainbowBtn.classList.add('active');
    } else if (newMode === 'eraser') {
        eraserBtn.classList.add('active');
    } else if (newMode === 'clear') {
        clearBtn.classList.add('active');
    }
}

function reloadGrid() {
    clearTheGrid();
    theGrid(currentGridSize);
}

function clearTheGrid() {
    grid.textContent = '';
}

function updateSize(value) {
    sizeValue.textContent = `${value} x ${value}`;
}

function changeGridSize(value) {
    setCurrentGridSize(value);
    updateSize(value);
    reloadGrid();
}

window.onload = () => {
    theGrid(STARTING_GRID_SIZE);
    activate(STARTING_MODE);
}

function changeColor(e) {
    if (currentMode === 'rainbowColor') {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        e.target.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
    } else if (currentMode === 'color') {
        e.target.style.backgroundColor = currentColor;
    } else if (currentMode === 'eraser') {
        e.target.style.backgroundColor = 'white';
    }
}