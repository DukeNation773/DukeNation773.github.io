let playerChoiceValue = "";
let computerChoiceValue = "";

const choices = ["rock", "paper", "scissors"];
const resultElement = document.getElementById("result");
const computerChoiceImage = document.getElementById("computer-choice");

function playerChoice(choice) {
  playerChoiceValue = choice;

  document.querySelectorAll(".throw-option").forEach((option) => {
    option.classList.remove("selected");
  });

  document.getElementById(choice).classList.add("selected");

  computerTurn();
}

function computerTurn() {
  let shuffleInterval = setInterval(() => {
    const randomChoice = choices[Math.floor(Math.random() * 3)];
    computerChoiceImage.innerHTML = `<img src="images/${randomChoice}.PNG" alt="${randomChoice}">`;
  }, 300);

  setTimeout(() => {
    clearInterval(shuffleInterval);
    computerChoiceValue = choices[Math.floor(Math.random() * 3)];
    computerChoiceImage.innerHTML = `<img src="images/${computerChoiceValue}.PNG" alt="${computerChoiceValue}">`;
    computerChoiceImage.classList.add("active");

    decideWinner();
  }, 3000);
}

function decideWinner() {
  if (playerChoiceValue === computerChoiceValue) {
    resultElement.innerText = "It's a Tie!";
  } else if (
    (playerChoiceValue === "rock" && computerChoiceValue === "scissors") ||
    (playerChoiceValue === "paper" && computerChoiceValue === "rock") ||
    (playerChoiceValue === "scissors" && computerChoiceValue === "paper")
  ) {
    resultElement.innerText = "You Win!";
  } else {
    resultElement.innerText = "You Lose :(";
  }
}

function resetGame() {
  playerChoiceValue = "";
  computerChoiceValue = "";
  resultElement.innerText = "";

  document.querySelectorAll(".throw-option").forEach((option) => {
    option.classList.remove("selected");
  });

  computerChoiceImage.innerHTML = `<img src="images/question-mark.PNG" alt="Question Mark">`;
  computerChoiceImage.classList.remove("active");
}
