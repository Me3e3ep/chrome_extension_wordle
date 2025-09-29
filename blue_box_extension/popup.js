let count = 0;
const numberDisplay = document.getElementById("number");
const button = document.getElementById("myButton");

button.addEventListener("click", () => {
  count++;
  numberDisplay.textContent = count;
});