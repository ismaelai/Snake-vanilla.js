import { snake_speed } from './snake.js ';
import { update } from './snake.js';
import { draw } from './snake.js.';
// Segun la variable de snake-speed podemos controlar como de rapido el juego se actualiza por segundos.
// En el update loop va determinar y actualizar la logica del juego como mover, food, lost game etc.
// En el draw loop va a basicamente representarnos en la pantalla todo lo basado en el loop 'update'.

let lastRenderTime = 0;

function main(currenTime) {
  const secondsSinceLastRender = (currenTime - lastRenderTime) / 1000;
  if (secondsSinceLastRender < 1 / snake_speed) return;
  window.requestAnimationFrame(main);

  lastRenderTime = currenTime;

  update();
  draw();
}
window.requestAnimationFrame(main);

function update() {
  updateSnake();
}

function draw() {
  drawSnake();
}
