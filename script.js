const STARTING_COLOR = 'black';
const STARTING_MODE = 'color';
const STARTING_GRID_SIZE = 16;

let currentColor = STARTING_COLOR;
let currentMode = STARTING_MODE;
let currentGridSize = STARTING_GRID_SIZE;

// const colorPicker = document.getElementById('colorPicker');
const colorBtn = document.getElementById('colorBtn');
const rainbowBtn = document.getElementById('rainbowBtn');
const clearBtn = document.getElementById('clearBtn');
const eraseBtn = document.getElementById('eraseBtn');
const sizeValue = document.getElementById('sizeOfGrid');
const grid = document.getElementById('grid');

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
        gridElem.classList.add(gridElement);
        grid.appendChild(gridElem);
    }
}

colorBtn.onclick = () => setCurrentMode('color');
rainbowBtn.onclick = () => setCurrentMode('rainbowColor');
clearBtn.onclick = () => reloadGrid();
eraseBtn.onclick = () => setCurrentMode('erase');

function activate(newMode) {
    if (currentMode === 'rainbow') {
        rainbowBtn.classList.remove('active');
    } else if (currentMode === 'erase') {
        eraseBtn.classList.remove('active');
    } else if (currentMode === 'clear') {
        clearBtn.classList.remove('active');
    }

    if (newMode === 'rainbow') {
        rainbowBtn.classList.add('active');
    } else if (newMode === 'erase') {
        eraseBtn.classList.add('active');
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