function determineWinner({ player, enemy, timerId }) {
  clearTimeout(timerId);
  document.querySelector(".tie").style.display = "flex";
  if (player.health === enemy.health) {
    document.querySelector(".tie").innerHTML = "Tie";
  } else if (player.health > enemy.health) {
    document.querySelector(".tie").innerHTML = "Player 1 wins";
  } else if (enemy.health > player.health) {
    document.querySelector(".tie").innerHTML = "Player 2 wins";
  }
}

let timer = 60;
let timerId;
function decreaseTimer() {
  if (timer > 0) {
    timerId = setTimeout(decreaseTimer, 1000);
    timer--;
    document.querySelector(".smaller__timer").innerHTML = timer;
  }
  if (timer === 0) {
    determineWinner({ player, enemy, timerId });
  }
}
