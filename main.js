// Gameboard module (IIFE) using the Module Pattern.
// Encapsulates board state and exposes public methods.
const Gameboard = (() => {
    let board = ["", "", "", "", "", "", "", "", ""];

    // Return a shallow copy of the board to prevent external mutation
    const getBoard = () => board.slice();

    const setCell = (index, marker) => {
        if (board[index] === "") {
            board[index] = marker;
            return true;
        }
        return false;
    };

    const reset = () => {
        board = ["", "", "", "", "", "", "", "", ""];
    };

    // Check if the given marker has a winning combination on the board.
    // Returns true if any row, column, or diagonal is fully occupied by the marker.
    const checkWin = (marker) => {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        return winPatterns.some(pattern =>
            pattern.every(index => board[index] === marker)
        );
    };

    const isFull = () => board.every(cell => cell !== "");

    return { getBoard, setCell, reset, checkWin, isFull };
})();

// Player factory function: creates a new player object with a name and marker
const Player = (name, marker) => {
    return { name, marker };
}

const GameController = (() => {
    let player1;
    let player2;
    let currentPlayer;
    let gameOver = false;

    const startGame = (name1, name2) => {
        player1 = Player(name1, "X");
        player2 = Player(name2, "O");
        currentPlayer = player1;
        gameOver = false;
        Gameboard.reset();
    };

    const playRound = (index) => {
        if (gameOver) return;

        const validMove = Gameboard.setCell(index, currentPlayer.marker);
        if (!validMove) return;

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

    const getCurrentPlayer = () => currentPlayer;
    const getBoard = () => Gameboard.getBoard();

    return { startGame, playRound, getCurrentPlayer, getBoard };
})();

const DisplayController = (() => {
    const boardContainer = document.getElementById("gameboard");
    const resultDiv = document.getElementById("result");

    const render = () => {
        boardContainer.innerHTML = "";
        const board = Gameboard.getBoard();
        board.forEach((cell, index) => {
            const cellDiv = document.createElement("div");
            cellDiv.classList.add("cell");
            // Store the cell's index as a data attribute (data-index)
            // so it can be retrieved later when the cell is clicked
            cellDiv.dataset.index = index;
            cellDiv.textContent = cell;
            cellDiv.addEventListener("click", handleClick);
            boardContainer.appendChild(cellDiv);
        });
    };

    const handleClick = (e) => {
        const index = parseInt(e.target.dataset.index);
        const result = GameController.playRound(index);
        render();
        if (result) {
            resultDiv.textContent = result;
        } else {
            resultDiv.textContent = `${GameController.getCurrentPlayer().name}'s turn`;
        }
    };

    const clearResult = () => {
        resultDiv.textContent = "";
    };

    return { render, handleClick, clearResult };
})();

const startButton = document.getElementById("start-btn");
startButton.addEventListener("click", () => {
    const player1Name = document.getElementById("player1-name").value || "Player 1";
    const player2Name = document.getElementById("player2-name").value || "Player 2";

    GameController.startGame(player1Name, player2Name);
    DisplayController.render();
    DisplayController.clearResult();
    document.getElementById("result").textContent = `${GameController.getCurrentPlayer().name}'s turn`;
})