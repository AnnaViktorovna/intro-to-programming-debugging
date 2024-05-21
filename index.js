const guessInput = document.getElementById("guess");
const submitButton = document.getElementById("submit");
const resetButton = document.getElementById("reset");
const messages = document.getElementsByClassName("message");
const tooHighMessage = document.getElementById("too-high");
const tooLowMessage = document.getElementById("too-low");
const maxGuessesMessage = document.getElementById("max-guesses");
const numberOfGuessesMessage = document.getElementById("number-of-guesses");
const correctMessage = document.getElementById("correct");

let targetNumber;
let attempts = 0;

//const can't be changed const via let
let maxNumberOfAttempts = 5;

document
    .getElementById("guessForm")
    .addEventListener("submit", function (event) {
        event.preventDefault();
        checkGuess();
    });

// Returns a random number from min (inclusive) to max (exclusive)
// Usage:
// > getRandomNumber(1, 50)
// <- 32
// > getRandomNumber(1, 50)
// <- 11
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function checkGuess() {
    // Get value from guess input element
    const guess = parseInt(guessInput.value, 10);
    //You should not be able to submit a guessed number lower than 1
    //You should not be able to submit a guessed number higher than 99
    if (guess < 1 || guess > 99) {
        alert("Please, enter a number between 1 and 99.");
        return;
    }

    attempts = attempts + 1;

    hideAllMessages();

    if (guess === targetNumber) {
        //If there is only one guess left, it should say "guess" (singular) instead of "guesses" (plural)
        let guessText = attempts === 1 ? "guess" : "guesses";
        numberOfGuessesMessage.style.display = "";
        numberOfGuessesMessage.innerHTML = `You made ${attempts} ${guessText}`;

        correctMessage.style.display = "";

        submitButton.disabled = true;
        guessInput.disabled = true;
    }
    // not correct logic constraction
    else {
        if (guess < targetNumber) {
            tooLowMessage.style.display = "";

            //tooHigh via toolow
        } else {
            tooHighMessage.style.display = "";
        }

        const remainingAttempts = maxNumberOfAttempts - attempts;
        let guessText = remainingAttempts === 1 ? "guess" : "guesses";
        numberOfGuessesMessage.style.display = "";
        numberOfGuessesMessage.innerHTML = `You guessed ${guess}. <br> ${remainingAttempts} ${guessText} remaining`;

        //mistakes , not ====
        if (attempts === maxNumberOfAttempts) {
            submitButton.disabled = true;
            guessInput.disabled = true;
            if (maxGuessesMessage) {
                maxGuessesMessage.style.display = "";
            }
        }
    }
    guessInput.value = "";
    resetButton.style.display = "";
}

function hideAllMessages() {
    Array.from(messages).forEach((message) => (message.style.display = "none"));
}

//typo puntion via function
function setup() {
    // Get random number
    targetNumber = getRandomNumber(1, 100);
    console.log(`target number: ${targetNumber}`);

    // Reset number of attempts
    //max can't be 0
    attempts = 0;

    // Enable the input and submit button
    //typo disabeld via disabled
    submitButton.disabled = false;
    guessInput.disabled = false;

    //hideAllMessages is not defined
    hideAllMessages();
    resetButton.style.display = "none";
}

// submitButton.addEventListener('click', checkGuess);
resetButton.addEventListener("click", setup);

setup();
