// Gameboard module (IIFE) using the Module Pattern.
// Encapsulates board state and exposes public methods.
const Gameboard = (() => {
    let board = Array(9).fill("");

    // Return a shallow copy of the board to prevent external mutation
    const getBoard = () => [...board];

    const setCell = (index, marker) => {
        if (!board[index]) {
            board[index] = marker;
            return true;
        }
        return false;
    };

    const reset = () => {
        board = Array(9).fill("");
    };

    // Check if the given marker has a winning combination on the board.
    // Returns true if any row, column, or diagonal is fully occupied by the marker.
    const checkWin = (marker) => {
        const patterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];
        return patterns.some(pattern => pattern.every(i => board[i] === marker));
    };

    const isFull = () => board.every(cell => cell !== "");

    return { getBoard, setCell, reset, checkWin, isFull };
})();

// Player factory function: creates a new player object with a name and marker
const Player = (name, marker) => ({ name, marker });

const GameController = (() => {
    let player1, player2, currentPlayer, gameOver = false;

    const startGame = (name1, name2) => {
        player1 = Player(name1, "X");
        player2 = Player(name2, "O");
        currentPlayer = player1;
        gameOver = false;
        Gameboard.reset();
    };

    const playRound = (index) => {
        if (gameOver) return;

        const valid = Gameboard.setCell(index, currentPlayer.marker);
        if (!valid) return;

        if (Gameboard.checkWin(currentPlayer.marker)) {
            gameOver = true;
            return `${currentPlayer.name} wins!`;
        }

        if (Gameboard.isFull()) {
            gameOver = true;
            return "It's a tie!";
        }

        currentPlayer = currentPlayer === player1 ? player2 : player1;
    };

    const getCurrentPlayer = () => gameOver ? null : currentPlayer;
    const getBoard = () => Gameboard.getBoard();
    const isGameOver = () => gameOver;

    return { startGame, playRound, getCurrentPlayer, getBoard, isGameOver };
})();

const DisplayController = (() => {
    const boardContainer = document.getElementById("gameboard");
    const resultDiv = document.getElementById("result");

    const render = () => {
        boardContainer.innerHTML = "";
        GameController.getBoard().forEach((cell, i) => {
            const cellDiv = document.createElement("div");
            cellDiv.classList.add("cell");
            // Store the cell's index as a data attribute (data-index)
            // so it can be retrieved later when the cell is clicked
            cellDiv.dataset.index = i;
            cellDiv.textContent = cell;
            cellDiv.tabIndex = 0; // keyboard accessible
            cellDiv.addEventListener("click", handleClick);
            cellDiv.addEventListener("keypress", e => {
                if (e.key === "Enter" || e.key === " ") handleClick(e);
            });
            boardContainer.appendChild(cellDiv);
        });
    };

    const handleClick = (e) => {
        if (!GameController.getCurrentPlayer()) return;
        if (GameController.isGameOver()) return;

        const index = parseInt(e.target.dataset.index);
        const result = GameController.playRound(index);
        render();
        if (result) {
            resultDiv.textContent = result;
        } else {
            resultDiv.textContent = `${GameController.getCurrentPlayer().name}'s turn`;
        }
    };

    const clearResult = () => resultDiv.textContent = "";

    return { render, handleClick, clearResult };
})();

document.getElementById("start-btn").addEventListener("click", () => {
    const p1 = document.getElementById("player1-name").value.trim() || "Player 1";
    const p2 = document.getElementById("player2-name").value.trim() || "Player 2";
    GameController.startGame(p1, p2);
    DisplayController.render();
    DisplayController.clearResult();
    document.getElementById("result").textContent = `${GameController.getCurrentPlayer().name}'s turn`;
})