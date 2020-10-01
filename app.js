const width = 10;
const height = width;
const cellCount = width * height;
const grid = document.querySelector('.grid');
const cells = [];
for (let index = 0; index < cellCount; index = index + 1) {
  const cell = document.createElement('div');
  //cell.innerText = index;
  grid.appendChild(cell);
  cells.push(cell);
}
////////////////////////////////////////////////////////////s
document.addEventListener('DOMContentLoaded', () => {
  const squares = document.querySelectorAll('.grid div');
  const scoreDisplay = document.querySelector('span');
  const startBtn = document.querySelector('.start');
  //const width = 10;
  let currentIndex = 0;
  let appleIndex = 0;
  let bodySnake = [2, 1, 0]; // los indices de snake.
  let direction = 1;
  let score = 0;
  let speed = 0.9;
  let intervalTime = 0;
  let interval = 0;

  // Al clickar el boton de Play

  function startGame() {
    bodySnake.forEach((index) => squares[index].classList.remove('snake'));
    squares[appleIndex].classList.remove('apple');
    clearInterval(interval);
    score = 0;
    randomApple();
    direction = 1;
    scoreDisplay.innerText = score;
    intervalTime = 800;
    bodySnake = [2, 1, 0];
    currentIndex = 0;
    bodySnake.forEach((index) => squares[index].classList.add('snake'));
    interval = setInterval(overcomes, intervalTime);
  }

  function overcomes() {
    // colisiones con la pared
    if (
      (bodySnake[0] + width >= width * width && direction === width) || // Pared inferior.
      (bodySnake[0] % width === width - 1 && direction === 1) || //Pared derecha.
      (bodySnake[0] % width === 0 && direction === -1) || //Pared izquierda.
      (bodySnake[0] - width < 0 && direction === -width) || //pared superior
      squares[bodySnake[0] + direction].classList.contains('snake') //chocar nosotros mismos.
    ) {
      return clearInterval(interval); //Si algo de lo anterior sucede. Se acaba el intervalo.
    }
    const tail = bodySnake.pop(); // Quita la ultima posicion del array snake.
    squares[tail].classList.remove('snake'); //Quita clase de snake de la cola.
    bodySnake.unshift(bodySnake[0] + direction); // Da direccion a la cabeza del array.

    // Comer manzanas.
    // Crecer
    // sumar score
    // aumentamos la velocidad de snake

    if (squares[bodySnake[0]].classList.contains('apple')) {
      squares[bodySnake[0]].classList.remove('apple');
      squares[tail].classList.add('snake');
      bodySnake.push(tail);
      randomApple();
      score++;
      scoreDisplay.textContent = score;
      clearInterval(interval);
      intervalTime = intervalTime * speed;
      interval = setInterval(overcomes, intervalTime);
    }
    squares[bodySnake[0]].classList.add('snake');
  }

  //Generar manzanas al azar.
  function randomApple() {
    do {
      appleIndex = Math.floor(Math.random() * squares.length);
    } while (squares[appleIndex].classList.contains('snake')); // Las manzanas no aparecen encima clase snake.
    squares[appleIndex].classList.add('apple');
  }
  //Asignar funciones a los keycodes de Arrowkeys para mover snake en el grid.
  function control(e) {
    squares[currentIndex].classList.remove('snake');
    if (e.keyCode === 39) {
      direction = 1; // Ir hacia la derecha.
    } else if (e.keyCode === 38) {
      direction = -width; // Ir hacia arriba.
    } else if (e.keyCode === 37) {
      direction = -1; // Ir hacia izquierda.
    } else if (e.keyCode === 40) {
      direction = +width; //Ir hacia abajo.
    }
  }
  document.addEventListener('keyup', control);
  startBtn.addEventListener('click', startGame);
});
