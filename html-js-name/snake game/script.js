const board = document.getElementById('gameBoard');
const boardSize = 25;
const totalCells = Math.pow(boardSize, 2);
const resetButton = document.getElementById('resetBtn');
let score = document.getElementById("score");
score.innerHTML = 0;
let snake = [];
let direction = 1;


const cells = [];
for (let i = 0; i < totalCells; i++) {
  const div = document.createElement('div');
  div.classList.add('cell');
  board.appendChild(div);
  cells.push(div);
}

const snakeLength = 1;


document.addEventListener("keydown", changeDirection);

startGame();


function clearBoard(){
  cells.forEach(cell => cell.classList.remove('snake', 'food'));
}

function startGame(){

  let start = Math.floor(Math.random() * totalCells);
  snake = [start];

  let food = Math.floor(Math.random() * totalCells);
  food = Math.floor(Math.random() * totalCells);
  tick();

  




snake.forEach(i => {
  if (i >= 0 && i < totalCells) {
    cells[i].classList.add('snake');
  }
});

cells[food].classList.add('food');}


    resetButton.addEventListener('click', function(){
      clearBoard();
      startGame(); 
      
      
    })


function tick(){
  setTimeout(()=>{
    clearBoard();
    drawSnake();
    checkPositionOfFood();
    checkIfGameOver();
    moveHead();
    tick();
  },100);
}

function changeDirection(event){
    const keyPressed = event.keyCode;
    const LEFT = 37;
    const UP = 38;
    const RIGHT = 39;
    const DOWN = 40;

    if (keyPressed === LEFT) direction = -1;
    if (keyPressed === RIGHT) direction =1;
    if (keyPressed === UP) direction = boardSize;
    if (keyPressed === DOWN) direction = -boardSize;
}

function moveHead(){
  let head = snake[0];
}
function generateFood(){
  //need to check if fruit is not in body of snake, then generate fruit.
  let food = Math.floor(Math.random() * totalCells);
  food = Math.floor(Math.random() * totalCells);

}
function checkPositionOfFood(){
  if (snake[0]== food){
      generateFood();
      growSnake();
      score.textContent = parseInt(score.textContent,10)+1;
  }
  
}

function growSnake(){

}

function checkIfGameOver(){
  //If head is outside of borders or in the snake;
  //gameover();
}
function gameover(){
  score.textContent = 0;
}
function drawSnake(){
  
}
