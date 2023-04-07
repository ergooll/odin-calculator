let currentNum = '';
let previousNum = '';
let operator = '';

const currentDisplayNumber = document.querySelector('.currentNumber');
const previousDisplayNumber = document.querySelector('.previousNumber');

const equal = document.querySelector('#sum');
const decimal = document.querySelector('#decimal');
const allClear = document.querySelector('#all-clear');
const clear = document.querySelector('#clear');
const numberButtons = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');

window.addEventListener('keydown', handleKeyPress);

equal.addEventListener('click', () => {
    if (currentNum != '' && previousNum != '') {
        calculate();
    }
});

numberButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        handleNumber(e.target.textContent);
    });
});

operators.forEach (btn => {
    btn.addEventListener('click', (e) => {
        handleOperator(e.target.textContent);
    })
});

allClear.addEventListener('click', clearAll);

clear.addEventListener('click', clearSingle);

function clearAll() {
    previousNum = '';
    currentNum = '';
    previousDisplayNumber.textContent = '';
    currentDisplayNumber.textContent = '';
}

function clearSingle() {
    currentNum = currentNum.slice(0, - 1);
    currentDisplayNumber.textContent = currentNum;
}

decimal.addEventListener('click', () => {
    addDecimal();
});

function handleNumber(number) {
    if (previousNum !== '' && currentNum !== '' && operator === '') {
        previousNum = '';
        currentDisplayNumber.textContent = currentNum;
    }
    if (currentNum.length <= 11) {
        currentNum += number;
        currentDisplayNumber.textContent = currentNum;
    }
}

function handleOperator(op) {
    if (previousNum === '') {
        previousNum = currentNum;
        operatorCheck(op);
    } else if (currentNum === '') {
        operatorCheck(op);
    } else {
        calculate();
        operator = op;
        currentDisplayNumber.textContent = '';
        previousDisplayNumber.textContent = previousNum + ' ' + operator;
    }
}

function operatorCheck(text) {
    operator = text;
    previousDisplayNumber.textContent = previousNum + ' ' + operator;
    currentNum = '';
    currentDisplayNumber.textContent = '';
}

function calculate() {
    previousNum = Number(previousNum);
    currentNum = Number(currentNum);
    if (operator === '+') {
        previousNum += currentNum;
    } else if (operator === '-') {
        previousNum -= currentNum;
    } else if (operator === 'x') {
        previousNum *= currentNum;
    } else if (operator === '/') {
        if (currentNum <= 0) {
            previousNum = 'Error';
            previousDisplayNumber.textContent = '';
            currentDisplayNumber.textContent = previousNum;
        } else {
            previousNum /= currentNum;
        }
    } else if (operator === '%') {
        currentNum = currentNum / 100;
    }
    previousNum = roundNumber(previousNum);
    previousNum = previousNum.toString();
    displayResult();
}

function roundNumber(num) {
    return Math.round(num * 10000000000000000) / 10000000000000000;
}

function displayResult() {
    if (previousNum.length <= 17) {
        currentDisplayNumber.textContent = previousNum;
    } else {
        currentDisplayNumber.textContent = previousNum.slice(0, 17) + '...';
    }
    previousDisplayNumber.textContent = '';
    operator = '';
    currentNum = '';
}

function addDecimal() {
    if (!currentNum.includes('.')) {
        currentNum += '.';
        currentDisplayNumber.textContent = currentNum;
    }
}

function handleKeyPress(e) {
    e.preventDefault();
    if (e.key >= 0 && e.key <= 9) {
        handleNumber(e.key);
    }
    if (e.key === 'Enter' ||
        (e.key === '=' && currentNum != '' && previousNum != '')) {
            calculate();
    }
    if (e.key === '+' || e.key === '-' || e.key === '/') {
        handleOperator(e.key);
    }
    if (e.key === '*') {
        handleOperator('x');
    }
    if (e.key === '.') {
        addDecimal();
    }
    if (e.key === 'Backspace') {
        clearSingle();
    }
    if (e.key === 'Delete') {
        clearAll();
    }
}