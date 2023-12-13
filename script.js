let equation = {
    operandA: '',
    operandB: '',
    operator: '',
    result: ''
};

const display = document.querySelector('.display');

function add(operandA, operandB) {
    return +operandA + +operandB;
}

function subtract(operandA, operandB) {
    return +operandA - +operandB;
}

function multiply(operandA, operandB) {
    return +operandA * +operandB;
}

function divide(operandA, operandB) {
    if (operandB === 0) {
        return "ERROR";
    }
    return +operandA / +operandB;
}

function round(num) {
    return Math.floor(num*100)/100;
}

function operate(operator, operandA, operandB) {
    switch(operator) {
        case 'add':
            return round(add(operandA, operandB));

        case 'subtract':
            return round(subtract(operandA, operandB));

        case 'multiply':
            return round(multiply(operandA, operandB));

        case 'divide':
            return round(divide(operandA, operandB));

        default:
            return "ERROR";
    }
}

function clear() {
    equation.operandA = '';
    equation.operandB = '';
    display.textContent = '0';
    equation.operator = '';
    equation.result = '';
}

function displayResult() {
    equation.result = operate(equation.operator, equation.operandA, equation.operandB);
    display.textContent = equation.result;
    if (equation.result === "ERROR") {
        clear();
        display.textContent = "ERROR";
    }
}

document.addEventListener('click', (e) => {
    switch(e.target.className) {
        case 'operands':
            let operand = e.target;
            if (operand.textContent === '.' && equation[0].includes('.')) {
                return;            
            };
            if (!equation.operator) {
                equation.operandA += +operand.textContent;
                display.textContent = equation.operandA;
                console.log(equation);
            } else {
                equation.operandB += +operand.textContent;
                display.textContent = equation.operandB;
                console.log(equation);
            }
            break;
        
        case 'operators':
            if(!equation.operator) {
                equation.operator = e.target.value;
                console.log(equation);
            } else {
                displayResult();
                equation.operandB = '';
                equation.operator = e.target.value;
                equation.operandA = equation.result;
            }

            break;
            
        case 'equals':
            if(!equation.operandA) return;
            if(!equation.operandB) {
                display.textContent = equation.operandA;
                return;
            }
            displayResult();
            equation.operandB = '';
            equation.operator = '';
            equation.operandA = equation.result;
            break;

        case 'clear':
            clear();
            break;
        }
});