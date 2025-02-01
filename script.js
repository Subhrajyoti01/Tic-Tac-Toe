const cells = document.querySelectorAll('[data-cell]');
const statusMessage = document.querySelector('.status-message');
const restartButton = document.getElementById('restartButton');

let currentPlayer = 'X';
let gameActive = true;
const boardState = Array(9).fill(null);

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

cells.forEach(cell => {
  cell.addEventListener('click', handleCellClick, { once: true });
});

function handleCellClick(e) {
  const cell = e.target;
  const cellIndex = Array.from(cells).indexOf(cell);

  if (boardState[cellIndex] || !gameActive) return;

  placeMark(cell, currentPlayer);
  boardState[cellIndex] = currentPlayer;

  if (checkWin()) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapPlayer();
  }
}

function placeMark(cell, player) {
  cell.textContent = player;
}

function swapPlayer() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  updateStatusMessage();
}

function updateStatusMessage() {
  statusMessage.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWin() {
  return winningCombinations.some(combination => {
    return combination.every(index => boardState[index] === currentPlayer);
  });
}

function isDraw() {
  return boardState.every(cell => cell !== null);
}

function endGame(draw) {
  gameActive = false;

  if (draw) {
    statusMessage.textContent = "It's a draw!";
  } else {
    statusMessage.textContent = `Player ${currentPlayer} wins!`;
  }

  restartButton.classList.add('show');
}

restartButton.addEventListener('click', restartGame);

function restartGame() {
  boardState.fill(null);
  cells.forEach(cell => {
    cell.textContent = '';
    cell.addEventListener('click', handleCellClick, { once: true });
  });

  gameActive = true;
  currentPlayer = 'X';
  updateStatusMessage();
}

updateStatusMessage();