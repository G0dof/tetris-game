function drawBoard() {
    for (let currentRow = 0; currentRow < ROW; currentRow++) {
        for (let currentCol = 0; currentCol < COL; currentCol++) {
            const currentSquareColor = board[currentRow][currentCol];
            drawSquare(currentCol, currentRow, currentSquareColor);
        }
    }
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
