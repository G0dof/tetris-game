class Piece {
    constructor(piece, color) {
        this.piece = piece; // The piece
        this.color = color; // Define the color of the piece

        this.pieceN = 0; // We start from the first pattern
        this.activePiece = this.piece[this.pieceN]; // We initialize the active piece

        this.x = 3; // We need to center the piece
        this.y = -2; // We need to push the piece a bit
    }

    fill(color) {
        for (
            let currentRow = 0;
            currentRow < this.activePiece.length;
            currentRow++
        ) {
            for (
                let currentCol = 0;
                currentCol < this.activePiece.length;
                currentCol++
            ) {
                if (this.activePiece[currentRow][currentCol]) {
                    drawSquare(this.x + currentCol, this.y + currentRow, color);
                }
            }
        }
    } // Fill the piece with the color

    draw() {
        this.fill(this.color);
    } // Draw the piece

    unDraw() {
        this.fill(defaultColor);
    } // Undraw the piece

    moveDown() {
        if (!this.collision(0, 1, this.activePiece)) {
            this.unDraw();
            this.y++;
            this.draw();
            return;
        }

        this.lock();
        piece = randomPiece();
    } // Move the piece down

    collision(x, y, futurePiece) {
        for (
            let currentRow = 0;
            currentRow < futurePiece.length;
            currentRow++
        ) {
            for (
                let currentCol = 0;
                currentCol < futurePiece.length;
                currentCol++
            ) {
                if (!futurePiece[currentRow][currentCol]) {
                    continue;
                }

                const newX = this.x + currentCol + x;
                const newY = this.y + currentRow + y;

                if (newX < 0 || newX >= COL || newY >= ROW) {
                    return true;
                }

                if (newY < 0) {
                    continue;
                }

                if (board[newY][newX] != defaultColor) {
                    return true;
                }
            }
        }

        return false;
    } // Check if the piece collides with the board

    lock() {
        for (
            let currentRow = 0;
            currentRow < this.activePiece.length;
            currentRow++
        ) {
            for (
                let currentCol = 0;
                currentCol < this.activePiece.length;
                currentCol++
            ) {
                if (!this.activePiece[currentRow][currentCol]) {
                    continue;
                }

                if (this.y + currentRow < 0) {
                    break;
                }

                board[this.y + currentRow][this.x + currentCol] = this.color;
            }
        }
        drawBoard();
    }
}
