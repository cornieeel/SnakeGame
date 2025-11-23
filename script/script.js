const board = document.getElementById('gameBoard');
const gameMessage = document.getElementById('gameMessage');
const boardSize = 25;
const totalCells = Math.pow(boardSize, 2);
const resetButton = document.getElementById('resetBtn');
let score = document.getElementById("score");
score.textContent = 0;
let snake = [];
let direction = 1;
let food;

const cells = [];
for (let i = 0; i < totalCells; i++) {
  const div = document.createElement('div');
  div.classList.add('cell');
  board.appendChild(div);
  cells.push(div);
}

let gamesPlayed = 0;
let losses = 0;
let lastScore = 0;
let biggestScore = 0;

const gamesPlayedDiv = document.getElementById("gamesPlayed");
const lossesDiv = document.getElementById("losses");
const lastScoreDiv = document.getElementById("lastScore");
const biggestScoreDiv = document.getElementById("biggestScore");

//-Load saved stats from localStorage-
if (localStorage.getItem("gamesPlayed")) gamesPlayed = parseInt(localStorage.getItem("gamesPlayed"));
if (localStorage.getItem("losses")) losses = parseInt(localStorage.getItem("losses"));
if (localStorage.getItem("lastScore")) lastScore = parseInt(localStorage.getItem("lastScore"));
if (localStorage.getItem("biggestScore")) biggestScore = parseInt(localStorage.getItem("biggestScore"));

updateStats();

//-Listen for arrow key presses to change snake direction-
document.addEventListener("keydown", changeDirection);

//-Start the initial game-
startGame();

//-Clear the board visually-
function clearBoard(){
  cells.forEach(cell => cell.classList.remove('snake', 'food'));
}

//-Initialize snake and food positions-
function startGame(){
  let start = Math.floor(Math.random() * totalCells);
  snake = [start];
  food = Math.floor(Math.random() * totalCells);
  snake.forEach(i => cells[i].classList.add('snake'));
  cells[food].classList.add('food');
  score.textContent = 0;
}

//-Reset game when button is clicked-
resetButton.addEventListener('click', function(){
  clearInterval(gameLoop);
  clearBoard();
  startGame();
  gameMessage.textContent = "";
  gameLoop = setInterval(moveHead, 250);
});

//-Change snake direction based on arrow keys-
function changeDirection(event){
  const keyPressed = event.keyCode;
  if (keyPressed === 37) direction = -1;
  if (keyPressed === 39) direction = 1;
  if (keyPressed === 38) direction = -boardSize;
  if (keyPressed === 40) direction = boardSize;
}

//-Move snake forward and handle collisions and food-
function moveHead() {
  let currentHead = snake[0];
  let newHead = currentHead + direction;
  if (newHead < 0) newHead += totalCells;
  if (newHead >= totalCells) newHead -= totalCells;
  if (direction === 1 && newHead % boardSize === 0) newHead -= boardSize;
  if (direction === -1 && newHead % boardSize === boardSize - 1) newHead += boardSize;

  //-Check self-collision-
  if (snake.includes(newHead)) {
    clearInterval(gameLoop);
    gameMessage.textContent = "Game Over! Press Reset to play again.";
    gameMessage.style.color = "red";
    gameMessage.style.marginTop = "20px";
    gameMessage.style.fontFamily = "Permanent Marker, cursive";
    gameMessage.style.fontSize = "40px";

    lastScore = parseInt(score.textContent);
    if (lastScore > biggestScore) biggestScore = lastScore;

    gamesPlayed++;
    losses++;

    localStorage.setItem("lastScore", lastScore);
    localStorage.setItem("biggestScore", biggestScore);
    localStorage.setItem("gamesPlayed", gamesPlayed);
    localStorage.setItem("losses", losses);

    updateStats();
    return;
  }

  snake.unshift(newHead);
  cells[newHead].classList.add("snake");

  //-Check if snake eats food-
  if (newHead === food) {
    cells[food].classList.remove("food");
    generateFood();
    score.textContent = parseInt(score.textContent) + 1;
  } else {
    const tail = snake.pop();
    cells[tail].classList.remove("snake");
  }
}

//-Generate new food in random location not occupied by snake-
function generateFood(){
  do {
    food = Math.floor(Math.random() * totalCells);
  } while (snake.includes(food));
  cells[food].classList.add('food');
}

//-Update displayed statistics-
function updateStats() {
  gamesPlayedDiv.textContent = "Games Played: " + gamesPlayed;
  lossesDiv.textContent = "Losses: " + losses;
  lastScoreDiv.textContent = "Last Score: " + lastScore;
  biggestScoreDiv.textContent = "Biggest Score: " + biggestScore;
}

//-Start automatic movement of the snake-
let gameLoop = setInterval(moveHead, 250);
