let currentInput = '';
let previousInput = '';
let currentOperation = null;
let fractionAdded = false;
let decimalAdded = false;

function appendNumber(number) {
    currentInput += number;
    updateDisplay();
}

function appendFraction() {
    if (!fractionAdded) {
        currentInput += '/';
        fractionAdded = true;
        updateDisplay();
    } else {
        console.log('Fraction already added');
    }
}

function appendSpace() {
    currentInput += ' ';
    updateDisplay();
}

function appendDecimal() {
    if (!decimalAdded) {
        currentInput += '.';
        decimalAdded = true;
        updateDisplay();
    } else {
        console.log('Decimal already added');
    }
}

function toggleSign() {
    if (currentInput.startsWith('-')) {
        currentInput = currentInput.substring(1);
    } else {
        currentInput = '-' + currentInput;
    }
    updateDisplay();
}

function setOperation(operation) {
    if (currentInput === '' && previousInput === '') return;
    if (currentInput === '' && previousInput !== '') {
        currentOperation = operation;
        return;
    }
    if (previousInput !== '') {
        calculate();
    }
    currentOperation = operation;
    previousInput = currentInput;
    currentInput = '';
    fractionAdded = false;
    decimalAdded = false;
}

function calculate() {
    let result;
    const prev = parseInput(previousInput);
    const current = parseInput(currentInput);

    switch (currentOperation) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            result = prev / current;
            break;
        default:
            return;
    }

    currentInput = formatResult(result);
    currentOperation = null;
    previousInput = '';
    fractionAdded = false;
    decimalAdded = false;
    updateDisplay();
}

function clearDisplay() {
    currentInput = '';
    previousInput = '';
    currentOperation = null;
    fractionAdded = false;
    decimalAdded = false;
    updateDisplay();
}

function deleteLastInput() {
    if (currentInput.endsWith('/')) {
        fractionAdded = false;
    }
    if (currentInput.endsWith('.')) {
        decimalAdded = false;
    }
    currentInput = currentInput.slice(0, -1);
    updateDisplay();
}

function updateDisplay() {
    document.getElementById('display').value = currentInput;
}

function parseInput(input) {
    if (input.includes('/')) {
        return parseFraction(input);
    } else {
        return parseFloat(input);
    }
}

function parseFraction(input) {
    const parts = input.split(' ');
    let whole = 0, numerator = 0, denominator = 1;

    if (parts.length === 2) {
        whole = parseInt(parts[0]);
        const fractionParts = parts[1].split('/');
        numerator = parseInt(fractionParts[0]);
        denominator = parseInt(fractionParts[1]);
    } else if (parts.length === 1 && parts[0].includes('/')) {
        const fractionParts = parts[0].split('/');
        numerator = parseInt(fractionParts[0]);
        denominator = parseInt(fractionParts[1]);
    } else {
        whole = parseInt(parts[0]);
    }

    numerator += whole * denominator;
    return numerator / denominator;
}

function gcd(a, b) {
    return b === 0 ? a : gcd(b, a % b);
}

function decimalToFraction(decimal) {
    const tolerance = 1.0E-6;
    let h1 = 1, h2 = 0, k1 = 0, k2 = 1, b = decimal;
    do {
        const a = Math.floor(b);
        let aux = h1;
        h1 = a * h1 + h2;
        h2 = aux;
        aux = k1;
        k1 = a * k1 + k2;
        k2 = aux;
        b = 1 / (b - a);
    } while (Math.abs(decimal - h1 / k1) > decimal * tolerance);

    return { numerator: h1, denominator: k1 };
}

function formatResult(result) {
    const fraction = decimalToFraction(result);
    const validDenominators = [2, 4, 8, 16];

    if (validDenominators.includes(fraction.denominator)) {
        return formatMixedNumber(fraction);
    } else {
        return result.toString();
    }
}

function formatMixedNumber(fraction) {
    const whole = Math.floor(fraction.numerator / fraction.denominator);
    const numerator = fraction.numerator % fraction.denominator;
    const denominator = fraction.denominator;
    if (numerator === 0) {
        return whole.toString();
    } else if (whole === 0) {
        return `${numerator}/${denominator}`;
    } else {
        return `${whole} ${numerator}/${denominator}`;
    }
}

function plotGraph() {
    const displayValue = document.getElementById('display').value;
    const decimalValue = parseInput(displayValue);
    const fractionalPart = decimalValue - Math.floor(decimalValue);
    if (displayValue) {
        console.log('Storing fractional part:', fractionalPart);
        const url = new URL('fraction-finder.html', window.location.href);
        url.searchParams.set('decimalValue', fractionalPart);
        console.log('Redirecting to:', url.toString());
        window.location.href = url.toString();
    } else {
        alert('No value to plot.');
    }
}

// Attach event listeners
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('plotButton').addEventListener('click', plotGraph);
    document.querySelector('.clear').addEventListener('click', clearDisplay);
    document.querySelector('.delete').addEventListener('click', deleteLastInput);
    document.querySelector('.toggle-sign').addEventListener('click', toggleSign);
    document.querySelector('.equals').addEventListener('click', calculate);
});
