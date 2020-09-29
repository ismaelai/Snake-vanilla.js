function init() {
  const width = 10;
  const height = width;

  const squareGrid = width * height;

  const squares = document.querySelector('.grid');

  const cells = [];

  for (let index = 0; index < squareGrid; index = index + 1) {
    const cell = document.createElement('div');
    squares.appendChild(cell);
    cells.push(cell);
  }
  const squares = document.querySelectorAll('.grid div');
  const scoreDisplay = document.querySelector('span');
  const startBtn = document.querySelector('.start');

  //////////////////////////////////////////////////////////////////////////////////

  let currentIndex = 0;
  let appleIndex = 0;
  let bodySnake = [2, 1, 0]; /// 2 es la cabeza, 1 cuerpo y 0 tail (todo lo que proceda hay es 1)
  let direction = 1;
  let score = 0;
  let speed = 0.9;
  let intervalTime = 0;
  let interval = 0;

  //to start, and restart the game
  function startGame() {
    bodySnake.forEach((index) => squares[index].classList.remove('snake'));
    squares[appleIndex].classList.remove('apple');
    clearInterval(interval);
    score = 0;
    randomApple();
    direction = 1;
    scoreDisplay.innerText = score;
    intervalTime = 700;
    bodySnake = [2, 1, 0];
    currentIndex = 0;
    bodySnake.forEach((index) => squares[index].classList.add('snake'));
    interval = setInterval(moveOutcomes, intervalTime);
  }
  /////////////////////////////////////////////////////////////////////////////////////////////////

  // Eliminamos el ultimo item del array bodySnake, y la clase de 'snake' en TAIL.
  // Asi damos una nueva direccion con la cabeza del array.

  const tail = bodySnake.pop();
  squares[tail].classList.remove('snake');
  bodySnake.unshift(bodySnake[0] + direction);

  /////////////////////////////////////////////////////////////////////////////////////////////////

  //
  // Añadir clase snake a tail cuando consigamos manzanas.BodySnake crece.
  // Sumamos score
  // Aumentamos la velocidad

  if (squares[bodySnake[0]].classList.contains('apple')) {
    squares[bodySnake[0]].classList.remove('apple');
    squares[tail].classList.add('snake');
    bodySnake.push(tail);
    randomApple();
    score++;
    scoreDisplay.textContent = score;
    clearInterval(interval);
    intervalTime = intervalTime * speed;
    interval = setInterval(moveOutcomes, intervalTime);
  }
  squares[bodySnake[0]].classList.add('snake');
}
////////////////////////////////////////////////////////////////////////////////////////////////////

//generate new apple once apple is eaten
function randomApple() {
  do {
    appleIndex = Math.floor(Math.random() * squares.length);
  } while (squares[appleIndex].classList.contains('snake')); //making sure apples dont appear on the snake
  squares[appleIndex].classList.add('apple');
}

document.addEventListener('DOMContentLoaded', init);
