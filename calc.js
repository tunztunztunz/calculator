const calculator = document.querySelector('.calculator');
const keys = calculator.querySelector('.buttons');
const display = document.getElementById('display');

//Main Calculator Function

const runCalculator = (key) => {
    const action = key.dataset.action
    const keyContent = key.textContent;
    const displayedNum = display.textContent;
    const previousKeyType = calculator.dataset.previousKeyType

    //Removes the 'pressed look' from element after another element is selected
    Array.from(key.parentNode.children).forEach(k => k.classList.remove('is-depressed'));

    //changes the text.Content of the clear button when anything but is selected
    if (action !== 'clear') {
        const clearButton = calculator.querySelector('[data-action=clear]');
        clearButton.textContent = 'CE';
    }

    if (!action) {
        if (displayedNum === '0' || previousKeyType === 'operator' || previousKeyType === 'calculate') {
            display.textContent = keyContent;
        } else {
            display.textContent = displayedNum + keyContent;
        }
        calculator.dataset.previousKeyType = 'number';
    }

    if (
        action === 'add' ||
        action === 'subtract' ||
        action === 'multiply' ||
        action === 'divide'
    ) {

        const firstValue = calculator.dataset.firstValue;
        const operator = calculator.dataset.operator;
        const secondValue = displayedNum;

        if (firstValue && operator && previousKeyType !== 'operator' &&
            previousKeyType !== 'calculate') {

            const calcValue = calculate(firstValue, operator, secondValue);
            display.textContent = calcValue;
            calculator.dataset.firstValue = calcValue;
        } else {
            calculator.dataset.firstValue = displayedNum;
        }

        key.classList.add('is-depressed');
        calculator.dataset.previousKeyType = 'operator';
        calculator.dataset.operator = action;
    }

    if (action === 'decimal') {
        if (previousKeyType === 'operator' || previousKeyType === 'calculate') {
            display.textContent = '0.';
        } else if (!displayedNum.includes('.')) {
            display.textContent = displayedNum + '.';
        }
        calculator.dataset.previousKeyType = 'decimal';

    }

    if (action === 'clear') {
        if (key.textContent === 'AC') {
            calculator.dataset.firstValue = '';
            calculator.dataset.modValue = '';
            calculator.dataset.operator = '';
            calculator.dataset.previousKeyType = '';
        } else {
            key.textContent = 'AC';
        }
        display.textContent = 0;
        calculator.dataset.previousKeyType = 'clear';
    }
    if (action === 'calculate') {

        let firstValue = calculator.dataset.firstValue;
        let operator = calculator.dataset.operator;
        let secondValue = displayedNum;

        if (firstValue) {
            if (previousKeyType === 'calculate') {
                firstValue = displayedNum;
                secondValue = calculator.dataset.modValue
            }
            display.textContent = calculate(firstValue, operator, secondValue);
        }
        calculator.dataset.modValue = secondValue;
        calculator.dataset.previousKeyType = 'calculate';
    }
}

//Calculation Function

const calculate = (x, operator, y) => {
    firstNum = parseFloat(x);
    secondNum = parseFloat(y);
    if (operator === 'add') return firstNum + secondNum;
    if (operator === 'subtract') return firstNum - secondNum;
    if (operator === 'divide') return firstNum / secondNum;
    if (operator === 'multiply') return firstNum * secondNum;
}


//button clicks

keys.addEventListener('click', e => {
    if (e.target.matches('button')) {
        const key = e.target
        console.log(key);
        runCalculator(key);
    }
})


//Keyboard support 

const buttons = document.querySelectorAll('button');
const equalsButton = document.querySelector('.key--equals')
const clearButton = document.querySelector('.clear');
const multiplyButton = document.querySelector('.multiply');
const divideButton = document.querySelector('.divide');

this.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === '=') {
        runCalculator(equalsButton);
    }
    if (e.key === 'Backspace' || e.key === 'Delete') {
        runCalculator(clearButton);
    }
    if (e.key === '*') {
        runCalculator(multiplyButton);
    }
    if (e.key === '/') {
        runCalculator(divideButton);
    }
    if (e.key <= '9' || e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/' || e.key === '.') {
        buttons.forEach(button => {
            if (button.textContent === e.key) {
                console.log(e.key);
                runCalculator(button);
            }
        })
    }
})









//     if (e.key <= 9) {
//         runCalculator(e);
//     }
//     if (e.key === '+') 
//     if (e.key === '-') return 'subtract';
//     if (e.key === 'x') return 'multiply';
//     if (e.key === '/') return 'divide';
//     if (e.key === '.') return 'decimal';
//     if (e.key === 'Enter') return 'calculate';