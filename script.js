// Audio files
const winSound = new Audio('/mnt/data/Windows XP - tada.mp3');
const drawSound = new Audio('draw-sound.mp3'); // Replace with an actual draw sound if needed

// Elements
const board = document.getElementById('board');
const cells = Array.from(document.querySelectorAll('.cell'));
const winnerModal = document.getElementById('winnerModal');
const winnerMessage = document.getElementById('winnerMessage');
const restartButton = document.getElementById('restartButton');
const modalRestartButton = document.getElementById('modalRestartButton');
const closeModal = document.getElementById('closeModal');

// Winning combinations
const WINNING_COMBINATIONS = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

let isXTurn = true;

// Initialize the game
function startGame() {
    isXTurn = true;
    cells.forEach(cell => {
        cell.classList.remove('x', 'o');
        cell.textContent = '';
        cell.addEventListener('click', handleClick, { once: true });
    });
    setHoverEffect();
    hideModal();
}

// Handle cell clicks
function handleClick(e) {
    const cell = e.target;
    const currentClass = isXTurn ? 'x' : 'o';
    placeMark(cell, currentClass);

    if (checkWin(currentClass)) {
        playSound(winSound);
        showModal(`${currentClass.toUpperCase()} wins!`);
    } else if (isDraw()) {
        playSound(drawSound);
        showModal("It's a draw!");
    } else {
        swapTurns();
        setHoverEffect();
    }
}

// Place a mark on the board
function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
    cell.textContent = currentClass.toUpperCase();
}

// Swap turns between players
function swapTurns() {
    isXTurn = !isXTurn;
}

// Set hover effect for the board
function setHoverEffect() {
    board.classList.remove('x', 'o');
    board.classList.add(isXTurn ? 'x' : 'o');
}

// Check for a winning combination
function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => cells[index].classList.contains(currentClass));
    });
}

// Check for a draw
function isDraw() {
    return cells.every(cell => cell.classList.contains('x') || cell.classList.contains('o'));
}

// Play sound effect
function playSound(sound) {
    if (sound) sound.play();
}

// Show modal with a message
function showModal(message) {
    winnerMessage.textContent = message;
    winnerModal.style.display = 'flex';
}

// Hide the modal
function hideModal() {
    winnerModal.style.display = 'none';
}

// Event listeners
restartButton.addEventListener('click', startGame);
modalRestartButton.addEventListener('click', startGame);
closeModal.addEventListener('click', hideModal);

// Start the game on page load
startGame();
