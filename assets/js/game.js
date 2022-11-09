// Define the game object
const cvs = document.getElementById("tetris"); // Get the canvas element
const ctx = cvs.getContext("2d"); // Get the context of the canvas
const scoreElement = document.getElementById("score"); // Get the score element
const speedElement = document.getElementById("speed"); // Get the speed element

// Define the game board
const ROW = 20; // Number of rows
const COL = 10; // Number of column
const SQ = 30; // Size of a square
const defaultColor = "#111"; // Default color of a square
const defaultBorder = "rgba(255, 255, 255, 0.1)"; // Default border color of a square

let speed = 500; // Speed of the game
let dropStart = Date.now(); // Time when the piece was dropped
let score = 0; // Score of the player

let board = []; // Create the board
for (let currentRow = 0; currentRow < ROW; currentRow++) {
    board[currentRow] = [];
    for (let currentCol = 0; currentCol < COL; currentCol++) {
        board[currentRow][currentCol] = defaultColor;
    }
}

drawBoard();

const PIECES = [
    [Z, "red"],
    [S, "green"],
    [T, "yellow"],
    [O, "blue"],
    [L, "purple"],
    [I, "cyan"],
    [J, "orange"],
];

let piece = randomPiece();

drop();