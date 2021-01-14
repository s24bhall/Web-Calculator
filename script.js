const calculatorDisplay =document.querySelector('h1');
const inputBtns = document.querySelectorAll('button');
const clearBtn = document.getElementById('clear-btn');

// Calculate first and second values depending on operator
const calculate = {
    '/': (firstNumber, secondNumber) => firstNumber/secondNumber,
    '*': (firstNumber, secondNumber) => firstNumber*secondNumber,
    '+': (firstNumber, secondNumber) => firstNumber+secondNumber,
    '-': (firstNumber, secondNumber) => firstNumber-secondNumber,
    '=': (firstNumber, secondNumber) => secondNumber,
};

let firstValue = 0
let operatorValue = '';
let awaitingNextValue = false;

function sendNumberValue(number) {   
    // Replace current display value if first value is entered
    if (awaitingNextValue) {
        calculatorDisplay.textContent = number;
        awaitingNextValue= false;
    } else {
         // If current display value is 0, replace it, if not add number
        const displayValue = calculatorDisplay.textContent;   
        if (displayValue === '0') {
            calculatorDisplay.textContent = number;
        } else {
            calculatorDisplay.textContent = displayValue + number
        }
    }
}

function addDecimal() {
    // If operator pressed, don't add decimal
    if (awaitingNextValue)
        return;
    // If no decimal, add one
    else if (!calculatorDisplay.textContent.includes('.')) {
        calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
    }
}

function useOperator(operator) {
    const currentValue = Number(calculatorDisplay.textContent);
    // To prevent multiple operators
    if (operatorValue && awaitingNextValue) {
        operatorValue=operator;
        return;
    }
    // Assign first value if no value 
    else if (!firstValue) {
        firstValue=currentValue;
    } 
    else {
        const calculation = calculate[operatorValue](firstValue,currentValue);
        calculatorDisplay.textContent= calculation;
        firstValue=calculation;
    }
    // Ready for next value, store operator
    awaitingNextValue=true;
    operatorValue=operator;
}

// Reset all display
function resetAll() {
    firstValue = 0;
    operatorValue = '';
    awaitingNextValue = false;
    calculatorDisplay.textContent = '0';
}

//Add Event Listeners for numbers, operators, decimal buttons
inputBtns.forEach((inputBtn) => {
    if (inputBtn.classList.length === 0) {
        inputBtn.addEventListener('click', () => sendNumberValue(inputBtn.value));
    } else if (inputBtn.classList.contains('operator')) {
        inputBtn.addEventListener('click', () => useOperator(inputBtn.value));
    } else if (inputBtn.classList.contains('decimal')) {
        inputBtn.addEventListener('click', () => addDecimal());
    }
});

//Event Listener
clearBtn.addEventListener('click', resetAll);