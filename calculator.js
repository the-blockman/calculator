const buttons = document.querySelectorAll("button");
const display = document.querySelector("p");

let storedDisplay = "";
let result = 0;
let errorDisplayed = false;
let justEvaluated = false;
let justChained = false;

let add = (a, b) => a + b;
let subtract = (a, b) => a - b;
let divide = (a, b) => a / b;
let multiply = (a, b) => a * b;

let operate = (a, operator, b) => {
  a = parseFloat(a);
  b = parseFloat(b);
  if (operator === "+") {
    return add(a, b);
  } else if (operator === "-") {
    return subtract(a, b);
  } else if (operator === "/") {
    if (b === 0) {
      display.textContent = "syntax error";
      errorDisplayed = true;
      return;
    }
    return divide(a, b);
  } else if (operator === "*") {
    return multiply(a, b);
  }
};

let num1 = null;
let num2 = null;
let operator = "";

buttons.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    let targetButton = event.target.textContent;

    if (targetButton === "del") {
      event.preventDefault();
      if (justEvaluated) return;
      if (justChained) return;
      if (storedDisplay === "") {
        display.textContent = display.textContent.slice(0, -1);
        storedDisplay = display.textContent;
        num1 = null;
        return;
      }
      display.textContent = display.textContent.slice(0, -1);
      storedDisplay = storedDisplay.slice(0, -1);
      return;
    }

    if (targetButton === ".") {
      if (storedDisplay.includes(".") && !justEvaluated) return;
      if (justEvaluated || storedDisplay === "") {
        storedDisplay = "0";
        display.textContent = "0";
        justEvaluated = false;
      }
    }

    storedDisplay += targetButton;

    if (errorDisplayed) {
      display.textContent = "";
      errorDisplayed = false;
    }

    if (["+", "-", "*", "/"].includes(targetButton)) {
      const lastOperator = display.textContent.slice(-1);
      justEvaluated = false;
      if (["+", "-", "*", "/"].includes(lastOperator)) {
        display.textContent = display.textContent.slice(0, -1) + targetButton;
        operator = targetButton;
        return;
      }
      if (num1 === null && num2 === null) {
        num1 = parseFloat(storedDisplay);
        storedDisplay = "";
      } else if (storedDisplay !== "") {
        num2 = parseFloat(storedDisplay);
        num1 = operate(num1, operator, num2);
        display.textContent = Math.round(num1 * 100) / 100;
        storedDisplay = "";
        justChained = true;
      }
      operator = targetButton;
    }

    if (justEvaluated && !["+", "-", "*", "/"].includes(targetButton)) {
      storedDisplay = targetButton;
      display.textContent = "";
      justEvaluated = false;
    }

    display.textContent += targetButton;

    if (targetButton === "=") {
      if (
        storedDisplay === "" ||
        operator === "" ||
        num1 === null ||
        isNaN(parseFloat(storedDisplay))
      ) {
        display.textContent = "syntax error";
        storedDisplay = "";
        num1 = null;
        num2 = null;
        operator = "";
        errorDisplayed = true;
        return;
      }
      num2 = parseFloat(storedDisplay);
      result = operate(num1, operator, num2);
      if (result === undefined) {
        storedDisplay = "";
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

    if (targetButton === "c") {
      display.textContent = "";
      storedDisplay = "";
      num1 = null;
      num2 = null;
      operator = "";
      justChained = false;
      justEvaluated = false;
      return;
    }

    // console.log(`num1 = ${num1}`);
    // console.log(`num2 = ${num2}`);
    // console.log(`operator = ${operator}`);
    // console.log(`stored = ${storedDisplay}`);
    // console.log(`disp = ${display.textContent}`);
  });
});
