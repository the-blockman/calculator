let add = (a, b) => a + b;
let subtract = (a, b) => a - b;
let divide = (a, b) => a / b;
let multiply = (a, b) => a * b;

const num1 = 0;
const num2 = 0;
let operator = "";

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
