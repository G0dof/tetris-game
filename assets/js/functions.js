function drawBoard() {
    for (let currentRow = 0; currentRow < ROW; currentRow++) {
        for (let currentCol = 0; currentCol < COL; currentCol++) {
            const currentSquareColor = board[currentRow][currentCol];
            drawSquare(currentCol, currentRow, currentSquareColor);
        }
    }
    
    scoreElement.innerHTML = score;
    speedElement.innerHTML = speed;
} // Draw the board

function drawSquare(x, y, color) {
    ctx.fillStyle = color; // Set the color of the square
    ctx.fillRect(x * SQ, y * SQ, SQ, SQ); // Draw the square

    if (color === defaultColor) {
        ctx.strokeStyle = defaultBorder;
    }

    ctx.strokeRect(x * SQ, y * SQ, SQ, SQ); // Draw the border of the square
}

function randomPiece() {
    const randomPieceNumber = Math.floor(Math.random() * PIECES.length); // Get a random number between 0 and the number of pieces
    return new Piece(
        PIECES[randomPieceNumber][0],
        PIECES[randomPieceNumber][1]
    ); // Return a new piece
}

function drop() {
    const now = Date.now();
    const delta = now - dropStart;

    if (delta > speed) {
        piece.moveDown();
        dropStart = Date.now();
    }

    requestAnimationFrame(drop);
}

function CONTROL(event) {
    const moveFunctions = {
        ArrowLeft() {
            piece.moveLeft();
            dropStart = Date.now();
        },
        ArrowRight() {
            piece.moveRight();
            dropStart = Date.now();
        },
        ArrowUp() {
            piece.rotate();
            dropStart = Date.now();
        },
        ArrowDown() {
            piece.moveDown();
        }
    }

    const movePiece = moveFunctions[event.code];
    movePiece()
}

function updateRowAndScore() {
    for (let currentRow = 0; currentRow < ROW; currentRow++) {
        let isRowFull = true;

        for (let currentCol = 0; currentCol < COL; currentCol++) {
            isRowFull = isRowFull && board[currentRow][currentCol] !== defaultColor;
        }

        if (isRowFull) {
            for (let currentRow2 = currentRow; currentRow2 > 1; currentRow2--) {
                for (let currentCol = 0; currentCol < COL; currentCol++) {
                    board[currentRow2][currentCol] = board[currentRow2 - 1][currentCol];
                }
            }

            for (let currentCol = 0; currentCol < COL; currentCol++) {
                board[0][currentCol] = defaultColor;
            }

            score += 10;
            speed -= 10;
        }
    }
}