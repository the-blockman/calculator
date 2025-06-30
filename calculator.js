const buttons = document.querySelectorAll("button");
const display = document.querySelector("p");

const OPERATORS = ["+", "-", "*", "/"];

let storedDisplay = "0";
let result = 0;
let errorDisplayed = false;
let justEvaluated = false;
let justChained = false;
let num1 = null;
let num2 = null;
let operator = "";

//Basic arithmetic functions
let add = (a, b) => a + b;
let subtract = (a, b) => a - b;
let divide = (a, b) => a / b;
let multiply = (a, b) => a * b;

//Operate function
let operate = (a, operator, b) => {
  a = parseFloat(a);
  b = parseFloat(b);
  if (operator === "+") {
    return add(a, b);
  } else if (operator === "-") {
    return subtract(a, b);
  } else if (operator === "/") {
    if (b === 0) {
      showError();
      return;
    }
    return divide(a, b);
  } else if (operator === "*") {
    return multiply(a, b);
  }
};

//error display
function showError() {
  display.textContent = "syntax error";
  storedDisplay = "";
  num1 = null;
  num2 = null;
  operator = "";
  errorDisplayed = true;
}

//handle decimals
function handleDecimalInput(targetButton) {
  if (storedDisplay.includes(".") && !justEvaluated) return;
  if (storedDisplay === "0" && display.textContent !== "")
    display.textContent += "0";
  if (storedDisplay === "0" && display.textContent === "")
    display.textContent += "0";
  if (justEvaluated) {
    storedDisplay = "0.";
    display.textContent = "0.";
    justEvaluated = false;
    return;
  }
  storedDisplay += targetButton;
  display.textContent += targetButton;
}

//handle delete button
function handleDelete() {
  if (justEvaluated || justChained) return;
  if (storedDisplay === "") {
    display.textContent = display.textContent.slice(0, -1);
    storedDisplay = display.textContent;
    num1 = null;
    return;
  }
  display.textContent = display.textContent.slice(0, -1);
  storedDisplay = storedDisplay.slice(0, -1);
}

//handle evaluate button
function handleEquals() {
  if (
    storedDisplay === "0" ||
    operator === "" ||
    num1 === null ||
    isNaN(parseFloat(storedDisplay))
  ) {
    showError();
    return;
  }
  num2 = parseFloat(storedDisplay);
  result = operate(num1, operator, num2);
  if (result === undefined) {
    storedDisplay = "0";
    num1 = null;
    num2 = null;
    return;
  }
  justChained = false;
  display.textContent = Math.round(result * 100) / 100;
  storedDisplay = result.toString();
  num1 = null;
  num2 = null;
  operator = "";
  justEvaluated = true;
}

function resetCalculator() {
  display.textContent = "";
  storedDisplay = "0";
  num1 = null;
  num2 = null;
  operator = "";
  justChained = false;
  justEvaluated = false;
  errorDisplayed = false;
}

//button event listener
buttons.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    let targetButton = event.target.textContent;

    if (errorDisplayed) {
      display.textContent = "";
      errorDisplayed = false;
    }

    if (targetButton === "c") {
      resetCalculator();
      return;
    }

    if (targetButton === "del") {
      event.preventDefault();
      handleDelete();
      return;
    }

    if (targetButton === ".") {
      handleDecimalInput(targetButton);
      return;
    }

    storedDisplay += targetButton;

    //handle button input
    if (OPERATORS.includes(targetButton)) {
      const lastOperator = display.textContent.slice(-1);
      justEvaluated = false;
      if (OPERATORS.includes(lastOperator)) {
        //do not allow multiple operators
        display.textContent = display.textContent.slice(0, -1) + targetButton;
        storedDisplay = "0";
        operator = targetButton;
        return;
      }
      if (num1 === null && num2 === null) {
        num1 = parseFloat(storedDisplay);
        storedDisplay = "0";
      } else if (storedDisplay !== "0") {
        num2 = parseFloat(storedDisplay);
        num1 = operate(num1, operator, num2);
        display.textContent = Math.round(num1 * 100) / 100;
        storedDisplay = "0";
        num2 = null;
        justChained = true;
      }
      operator = targetButton;
    }

    //if an operator is clicked after evaluation: allow delete
    if (justEvaluated && OPERATORS.includes(targetButton)) {
      justEvaluated = false;
    }

    // If a button is clicked after evaluation and it's not an operator, start new input
    if (justEvaluated && !OPERATORS.includes(targetButton)) {
      storedDisplay = targetButton;
      display.textContent = "";
      justEvaluated = false;
    }

    //if a button is clicked after chained result: allow delete
    if (justChained && !OPERATORS.includes(targetButton)) {
      justChained = false;
    }

    display.textContent += targetButton;

    if (targetButton === "=") {
      handleEquals();
      return;
    }

    console.log(`num1 = ${num1}`);
    console.log(`num2 = ${num2}`);
    console.log(`operator = ${operator}`);
    console.log(`stored = ${storedDisplay}`);
    console.log(`disp = ${display.textContent}`);
    console.log(justEvaluated);
  });
});
