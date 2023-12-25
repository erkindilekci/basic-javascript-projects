"use strict";

const getRandomNumber = () => Math.floor(Math.random() * 20) + 1;

const updateScoreText = () => {
    document.querySelector(".score").textContent = remainingAttempts;
};

let remainingAttempts = 5;
updateScoreText();
let secretNumber = getRandomNumber();

const decreaseAttempts = () => {
    remainingAttempts--;
    updateScoreText();
};

const getGuessedNumber = () => Number(document.querySelector(".guess").value);

const setMessage = (text) => {
    document.querySelector(".message").textContent = text;
};

const setWinStyles = () => {
    document.querySelector("body").style.backgroundColor = "#1aca03";
    document.querySelector(".number").style.width = "30rem";
};

const resetGame = () => {
    remainingAttempts = 5;
    updateScoreText();
    secretNumber = getRandomNumber();
    setMessage("Start guessing...");
    document.querySelector(".guess").value = "";
    document.querySelector(".number").textContent = "?";
    document.querySelector("body").style.backgroundColor = "#222";
    document.querySelector(".number").style.width = "15rem";
};

const handleLose = () => {
    setMessage("You lost the game!");
    document.querySelector(".score").textContent = 0;
};

document.querySelector(".check").addEventListener("click", () => {
    const guessedNumber = getGuessedNumber();

    if (!guessedNumber) {
        setMessage("Please enter a number!");
    } else if (guessedNumber === secretNumber) {
        setMessage("Correct Number!");
        setWinStyles();
        document.querySelector(".number").textContent = secretNumber;
    } else {
        if (remainingAttempts > 1) {
            const message =
                guessedNumber > secretNumber
                    ? "Guessed number is too high"
                    : "Guessed number is too low";
            setMessage(message);
            decreaseAttempts();
        } else {
            handleLose();
        }
    }
});

document.querySelector(".again").addEventListener("click", resetGame);
