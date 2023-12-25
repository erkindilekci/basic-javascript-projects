"use strict";

const player0Element = document.querySelector(".player--0");
const player1Element = document.querySelector(".player--1");
const score0Element = document.getElementById("score--0");
const score1Element = document.getElementById("score--1");
const currentScore0Element = document.getElementById("current--0");
const currentScore1Element = document.getElementById("current--1");
const diceElement = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

let scores, currentScore, activePlayer, playing;

const init = () => {
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    score0Element.textContent = 0;
    score1Element.textContent = 0;

    currentScore0Element.textContent = currentScore;
    currentScore1Element.textContent = currentScore;

    diceElement.classList.add("hidden");
    player0Element.classList.add("player--active");
    player0Element.classList.remove("player--winner");
    player1Element.classList.remove("player--winner");
    player1Element.classList.remove("player--active");
};

init();

const switchPlayer = () => {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 1 ? 0 : 1;
    player0Element.classList.toggle("player--active");
    player1Element.classList.toggle("player--active");
};

btnRoll.addEventListener("click", () => {
    if (playing) {
        const dice = Math.floor(Math.random() * 6) + 1;

        diceElement.classList.remove("hidden");
        diceElement.src = `img/dice-${dice}.png`;

        if (dice !== 1) {
            currentScore += dice;

            document.getElementById(`current--${activePlayer}`).textContent =
                currentScore;
        } else {
            switchPlayer();
        }
    }
});

btnHold.addEventListener("click", () => {
    if (playing) {
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent =
            scores[activePlayer];

        if (scores[activePlayer] >= 50) {
            playing = false;
            document
                .querySelector(`.player--${activePlayer}`)
                .classList.add("player--winner");
            document
                .querySelector(`.player--${activePlayer}`)
                .classList.remove("player--active");
            diceElement.classList.add("hidden");
        } else {
            switchPlayer();
        }
    }
});

btnNew.addEventListener("click", init);
