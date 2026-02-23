# Tic-Tac-Toe Game

A browser-based, two-player Tic-Tac-Toe game built with JavaScript, HTML, and CSS.  
Fully playable on mobile, tablet, and desktop, with a dark theme and accessible design.

---

## Features

- Two-player game with customizable names
- Clickable board cells to place "X" or "O"
- Keyboard accessible (Enter/Space to mark cells)
- Highlights current player turn
- Detects wins and ties automatically
- Start / Restart button to reset the game
- Responsive design for all devices
- Dark theme with clear focus and hover states
- Modular architecture (Gameboard, GameController, DisplayController)
- Secure and safe user input handling

---

## How to Play

1. Open `index.html` in a browser.
2. Enter player names (optional). Default names are "Player 1" and "Player 2".
3. Click **Start / Restart Game**.
4. Players take turns clicking empty cells or pressing Enter/Space.
5. The game displays whose turn it is.
6. When a player wins or the board is full (tie), the result is displayed.
7. Click **Start / Restart Game** to play again.

---

## Code Structure

- **Gameboard**: Module that stores the board state and checks for wins/ties.
- **Player**: Factory function to create player objects with name and marker.
- **GameController**: Module that manages turns, player switching, and game state.
- **DisplayController**: Module that handles DOM rendering, clicks, and displaying results.

---

## Accessibility & Best Practices

- Fully keyboard accessible with `tabIndex` and keypress handling
- Uses semantic HTML (`main`, `section`, `label`)
- Dark theme with good contrast
- Prevents invalid moves and interactions after the game ends
- Modular code to keep global scope clean and maintainable
- Safe user input handling (no `innerHTML` with user content)

---

## Requirements

- Modern web browser (Chrome, Firefox, Edge, Safari)
- No external libraries or frameworks required

---

## License

This project is free to use and modify.