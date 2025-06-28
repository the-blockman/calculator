let add = (a, b) => a + b;
let subtract = (a, b) => a - b;
let divide = (a, b) => a / b;
let multiply = (a, b) => a * b;

let operate = (a, operator, b) => {
  if (operator === "+") {
    return add(a, b);
  } else if (operator === "-") {
    return subtract(a, b);
  } else if (operator === "/") {
    return divide(a, b);
  } else if (operator === "*") {
    return multiply(a, b);
  }
};

let num1 = null;
let num2 = null;
let operator = "";

const buttons = document.querySelectorAll("button");
const display = document.querySelector("p");
let storedDisplay = "";
let result = 0;

buttons.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    let targetButton = event.target.textContent;
    storedDisplay += targetButton;
    display.textContent += targetButton;

    if (["+", "-", "*", "/"].includes(targetButton)) {
      if (num1 === null && num2 === null) {
        num1 = parseInt(storedDisplay);
      } else if (storedDisplay !== "") {
        num2 = parseInt(storedDisplay);
        num1 = operate(num1, operator, num2);
        display.textContent = num1;
      }

      operator = targetButton;
      storedDisplay = "";
    }

    if (targetButton === "=") {
      num2 = parseInt(storedDisplay);
      result = operate(num1, operator, num2);
      display.textContent = result;
      storedDisplay = "";
      num1 = parseInt(result);
    }

    if (targetButton === "c") {
      display.textContent = "";
      storedDisplay = "";
      num1 = null;
      num2 = null;
    }

    console.log(`num1 = ${num1}`);
    console.log(`num2 = ${num2}`);
    console.log(`stored = ${storedDisplay}`);
  });
});
