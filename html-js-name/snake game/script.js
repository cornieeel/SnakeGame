const board = document.getElementById('gameBoard');
const boardSize = 25;
const totalCells = Math.pow(boardSize, 2);
const resetButton = document.getElementById('resetBtn');

const cells = [];
for (let i = 0; i < totalCells; i++) {
  const div = document.createElement('div');
  div.classList.add('cell');
  board.appendChild(div);
  cells.push(div);
}

const snakeLength = 1;



function clearBoard(){
  cells.forEach(cell => cell.classList.remove('snake', 'food'));
}

function startGame(){
  let start = Math.floor(Math.random() * totalCells);
let snake = [start];
let food = Math.floor(Math.random() * totalCells);
while (food === start) {
  food = Math.floor(Math.random() * totalCells);
} 
snake.forEach(i => {
  if (i >= 0 && i < totalCells) {
    cells[i].classList.add('snake');
  }
});
function moveSnake(){
  let snakeHead;
  

  
}
cells[food].classList.add('food');}


    resetButton.addEventListener('click', function(){
      clearBoard();
      startGame();
    })



  
    
    


