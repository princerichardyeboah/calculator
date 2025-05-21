const display = document.getElementById('display');
let firstOperand = '';
let secondOperand = '';
let currentOperator = '';
let shouldResetDisplay = false;

function updateDisplay(value) {
  if (display.textContent === '0' || shouldResetDisplay) {
    display.textContent = value;
    shouldResetDisplay = false;
  } else {
    display.textContent += value;
  }
}

function clearDisplay() {
  display.textContent = '0';
  firstOperand = '';
  secondOperand = '';
  currentOperator = '';
}

function handleOperator(operator) {
  if (currentOperator !== '') evaluate();
  firstOperand = display.textContent;
  currentOperator = operator;
  shouldResetDisplay = true;
}

function evaluate() {
  if (currentOperator === '' || shouldResetDisplay) return;
  secondOperand = display.textContent;
  const result = operate(currentOperator, parseFloat(firstOperand), parseFloat(secondOperand));
  display.textContent = result;
  firstOperand = result;
  currentOperator = '';
  shouldResetDisplay = true;
}

function addDecimal() {
  if (shouldResetDisplay) {
    display.textContent = '0.';
    shouldResetDisplay = false;
    return;
  }
  if (!display.textContent.includes('.')) {
    display.textContent += '.';
  }
}

function backspace() {
  display.textContent = display.textContent.length > 1
    ? display.textContent.slice(0, -1)
    : '0';
}

function operate(operator, a, b) {
  if (operator === '/' && b === 0) return 'Stop it! 🙃';
  const operations = {
    '+': () => a + b,
    '-': () => a - b,
    '*': () => a * b,
    '/': () => a / b,
  };
  const result = operations[operator]();
  return Math.round(result * 10000) / 10000; // round to 4 decimals
}

document.querySelectorAll('.digit').forEach(btn =>
  btn.addEventListener('click', () => updateDisplay(btn.dataset.digit))
);

document.querySelectorAll('.operator').forEach(btn =>
  btn.addEventListener('click', () => handleOperator(btn.dataset.action))
);

document.querySelector('.equals').addEventListener('click', evaluate);
document.querySelector('.clear').addEventListener('click', clearDisplay);
document.querySelector('.decimal').addEventListener('click', addDecimal);
document.querySelector('.backspace').addEventListener('click', backspace);

document.addEventListener('keydown', (e) => {
  if (e.key >= 0 && e.key <= 9) updateDisplay(e.key);
  if (['+', '-', '*', '/'].includes(e.key)) handleOperator(e.key);
  if (e.key === 'Enter') evaluate();
  if (e.key === 'Backspace') backspace();
  if (e.key === '.') addDecimal();
  if (e.key === 'Escape') clearDisplay();
});
