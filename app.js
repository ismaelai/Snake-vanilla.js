window.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid');
  const width = 10;
  const height = width;
  const gridDimensions = width * height;
  const cells = [];

  for (let index = 0; index < gridDimensions; index = index + 1) {
    const cell = document.createElement('div');

    grid.appendChild(cell);
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

  //Empezar y re-start el juego

  function startGame() {
    bodySnake.forEach((index) => squares[index].classList.remove('snake'));
    bodySnake.forEach((index) => squares[index].classList.add('snake'));
    squares[appleIndex].classList.remove('apple');
    clearInterval(interval);
    score = 0;
    randomApple();
    direction = 1;
    scoreDisplay.innerText = score;
    intervalTime = 1000;
    bodySnake = [2, 1, 0];
    currentIndex = 0;

    interval = setInterval(overcomes, intervalTime);
    console.log(interval);
  }
  /////////////////////////////////////////////////////////////////////////////////////////////////

  ///////////////////////////////////////////////////////////////////////////////////////

  function overcomes() {
    if (
      (bodySnake[0] + width >= width * width && direction === width) || //Chocamos con el bottom
      (bodySnake[0] % width === width - 1 && direction === 1) || //chocar muro derecho
      (bodySnake[0] % width === 0 && direction === -1) || //chocar muro izquiero
      (bodySnake[0] - width < 0 && direction === -width) || //chocar con el top
      squares[bodySnake[0] + direction].classList.contains('snake') // chocarnos nosotros mismos
    ) {
      return clearInterval(interval); // Si cualquiera de lo anterior sucede. Se para el intervalo.
    }
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////

  // Eliminamos el ultimo item del array bodySnake, y la clase de 'snake' en TAIL.
  // Asi damos una nueva direccion con la cabeza del array.

  const tail = bodySnake.pop();
  squares[tail].classList.remove('snake');
  bodySnake.unshift(bodySnake[0] + direction);

  // Se va apple, cuando pasamos por la clase que la contenga, Y generamos una nueva apple.
  // Añadir clase snake a tail cuando consigamos manzanas.Por tanto,BodySnake crece.
  // Sumamos score
  // Clear interval y aumentamos la velocidad de snake. Y volvemos a iniciar Interval.
  //

  if (squares[bodySnake[0]].classList.contains('apple')) {
    squares[bodySnake[0]].classList.remove('apple');
    squares[tail].classList.add('snake');
    bodySnake.push(tail);
    randomApple();
    score = +1;
    scoreDisplay.textContent = score;
    clearInterval(interval);
    intervalTime = intervalTime * speed;
    interval = setInterval(overcomes, intervalTime);
    squares[bodySnake[0]].classList.add('snake');
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////

  //Generar apples al azar
  function randomApple() {
    do {
      appleIndex = Math.floor(Math.random() * squares.length);
    } while (squares[appleIndex].classList.contains('snake')); // Apple no aparece encima de snake
    squares[appleIndex].classList.add('apple');
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////

  function control(e) {
    squares[currentIndex].classList.remove('snake');

    if (e.keyCode === 39) {
      direction = 1; // ir a la derecha
    } else if (e.keyCode === 38) {
      direction = -width; // ir arriba
    } else if (e.keyCode === 37) {
      direction = -1; // ir izquiera
    } else if (e.keyCode === 40) {
      direction = +width; // ir hacia abajo
    }
  }

  // function control(e) {
  //   squares[currentIndex].classList.remove('snake');
  //   switch (e.keyCode) {
  //     case 37:
  //       if (direction === -1) direction = 'left';
  //       break;
  //     case 38:
  //       if (direction === -width) direction = 'up';
  //       break;
  //     case 39:
  //       if (direction === 1) direction = 'right';
  //       break;
  //     case 40:
  //       if (direction === +width) direction = 'down';
  //       break;
  // }

  function gameOver() {
    if (clearInterval()) {
      startGame();
      clearInterval();
      overcomes();
      grid.classList.remove('.grid');
      grid.classList.add('dead');
    }
    console.log('gameOver');
  }
  document.addEventListener('keyup', control);
  startBtn.addEventListener('click', startGame);
});
