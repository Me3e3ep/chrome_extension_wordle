const clickMeButton = document.getElementById("clickMeButton");
const guessInputElement = document.getElementById("guessBox");
const feedbackInputElement = document.getElementById("feedbackBox");
const guessDisplayElement = document.getElementById("guessDisplay");
const feedbackDisplayElement = document.getElementById("feedbackDisplay");

// When the button is clicked
clickMeButton.addEventListener("click", () => {
  let userGuess = guessInputElement.value;
  let userFeedback = feedbackInputElement.value;
  guessDisplayElement.textContent = "Your guess was: " + userGuess;
  feedbackDisplayElement.textContent = "Your feedback was " + userFeedback;
  console.log(userGuess);
});
