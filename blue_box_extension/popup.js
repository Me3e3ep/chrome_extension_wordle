const numberDisplay = document.getElementById("number");
const clickMeButton = document.getElementById("myButton");
const userBoxElement = document.getElementById("wordBox");

// On screen counter variable
let count = 0;

function checkUserInput(word) {
  let wordLength = word.length;
  console.log("the word length is: " + wordLength);
  if (word.length === 5) {
    console.log("")
    numberDisplay.textContent = "Your text is 5 letters";
  }
  else {
    console.log("")
    numberDisplay.textContent = "Your text needs to be 5 letters";
  }
}

// When the button is clicked
clickMeButton.addEventListener("click", () => {
  let userTextInput = userBoxElement.value
  count++;
  //numberDisplay.textContent = count;
  //numberDisplay.textContent = userBoxElement.value;
  numberDisplay.textContent = userTextInput
  console.log(userTextInput)
  checkUserInput(userTextInput);
});

