"use strict";

// DOM elements constants
const score0 = document.querySelector("#player0Score");
const score1 = document.getElementById("player1Score");
const dice = document.querySelector("#dice");
const current0 = document.querySelector("#currentScore0");
const current1 = document.querySelector("#currentScore1");
const buttonRoll = document.querySelector("#buttonRoll");
const buttonNew = document.querySelector("#buttonRestart");
const buttonHold = document.querySelector("#buttonSkip");
const player0 = document.querySelector("#player0");
const player1 = document.querySelector("#player1");
const buttonStart = document.querySelector("#start");

// program definitions
let currentPlayer, currentScore, total;
const changePlayerActive = function (player) {
  if (player === 0) {
    player0.classList.remove("playerActive");
    player1.classList.add("playerActive");
  } else {
    player0.classList.add("playerActive");
    player1.classList.remove("playerActive");
  }
  currentPlayer = player === 0 ? 1 : 0;
};

const initialize = function () {
  dice.classList.add("hidden");
  score0.textContent = 0;
  score1.textContent = 0;
  currentScore = [0, 0];
  total = [0, 0];
  changePlayerActive(1);
  current1.textContent = 0;
  current0.textContent = 0;
  currentPlayer = 0;
  document.querySelector(`#player0`).classList.remove("winner");
  document.querySelector(`#player1`).classList.remove("winner");
  document.querySelector(`.player1Name`).textContent = `Player 1`;
  document.querySelector(`.player2Name`).textContent = `Player 2`;
};

// initialize DOM elements
initialize();

// event listeners for buttons
buttonRoll.addEventListener("click", function () {
  const roll = Math.trunc(Math.random() * 6) + 1;
  dice.classList.remove("hidden");
  dice.src = `images/dice-${roll}.png`;

  if (roll !== 1) {
    currentScore[currentPlayer] += roll;
    document.querySelector(`#currentScore${currentPlayer}`).textContent =
      currentScore[currentPlayer];
  } else {
    document.querySelector(`#currentScore${currentPlayer}`).textContent = 0;
    currentScore[currentPlayer] = 0;
    changePlayerActive(currentPlayer);
  }
});

buttonHold.addEventListener("click", function () {
  total[currentPlayer] += currentScore[currentPlayer];
  document.querySelector(`#player${currentPlayer}Score`).textContent =
    total[currentPlayer];
  currentScore[currentPlayer] = 0;
  document.querySelector(`#currentScore${currentPlayer}`).textContent = 0;
  if (total[currentPlayer] >= 100) {
    document.querySelector(`#player${currentPlayer}`).classList.add("winner");
    document.querySelector(
      `.player${currentPlayer + 1}Name`
    ).textContent = `👑 Winner 👑`;
  } else {
    changePlayerActive(currentPlayer);
  }
});

buttonNew.addEventListener("click", initialize);

buttonStart.addEventListener("click", function () {
  document.querySelector("#instructions").style.display = "none";
});
