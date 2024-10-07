let currentInput = '';
let previousInput = '';
let currentOperation = null;

function appendNumber(number) {
    currentInput += number;
    updateDisplay();
}

function appendFraction() {
    currentInput += '/';
    updateDisplay();
}

function appendSpace() {
    currentInput += ' ';
    updateDisplay();
}

function appendDecimal() {
    if (!currentInput.includes('.')) {
        currentInput += '.';
        updateDisplay();
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
    if (currentInput === '') return;
    if (previousInput !== '') {
        calculate();
    }
    currentOperation = operation;
    previousInput = currentInput;
    currentInput = '';
}

function calculate() {
    let result;
    const prev = parseMixedNumber(previousInput);
    const current = parseMixedNumber(currentInput);

    switch (currentOperation) {
        case '+':
            result = addFractions(prev, current);
            break;
        case '-':
            result = subtractFractions(prev, current);
            break;
        case '*':
            result = multiplyFractions(prev, current);
            break;
        case '/':
            result = divideFractions(prev, current);
            break;
        default:
            return;
    }

    if (!isValidFraction(result)) {
        currentInput = (result.numerator / result.denominator).toString();
    } else {
        currentInput = formatMixedNumber(result);
    }

    currentOperation = null;
    previousInput = '';
    updateDisplay();
}

function clearDisplay() {
    currentInput = '';
    previousInput = '';
    currentOperation = null;
    updateDisplay();
}

function deleteLastInput() {
    currentInput = currentInput.slice(0, -1);
    updateDisplay();
}

function updateDisplay() {
    document.getElementById('display').value = currentInput;
}

function parseMixedNumber(input) {
    let whole = 0, numerator = 0, denominator = 1;
    const parts = input.split(' ');

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
    return simplifyFraction({ numerator, denominator });
}

function gcd(a, b) {
    return b === 0 ? a : gcd(b, a % b);
}

function simplifyFraction(fraction) {
    const commonDivisor = gcd(fraction.numerator, fraction.denominator);
    return {
        numerator: fraction.numerator / commonDivisor,
        denominator: fraction.denominator / commonDivisor
    };
}

function addFractions(a, b) {
    const numerator = a.numerator * b.denominator + b.numerator * a.denominator;
    const denominator = a.denominator * b.denominator;
    return simplifyFraction({ numerator, denominator });
}

function subtractFractions(a, b) {
    const numerator = a.numerator * b.denominator - b.numerator * a.denominator;
    const denominator = a.denominator * b.denominator;
    return simplifyFraction({ numerator, denominator });
}

function multiplyFractions(a, b) {
    const numerator = a.numerator * b.numerator;
    const denominator = a.denominator * b.denominator;
    return simplifyFraction({ numerator, denominator });
}

function divideFractions(a, b) {
    const numerator = a.numerator * b.denominator;
    const denominator = a.denominator * b.numerator;
    return simplifyFraction({ numerator, denominator });
}

function formatMixedNumber(result) {
    const whole = Math.floor(result.numerator / result.denominator);
    const numerator = result.numerator % result.denominator;
    const denominator = result.denominator;
    if (numerator === 0) {
        return whole.toString();
    } else if (whole === 0) {
        return `${numerator}/${denominator}`;
    } else {
        return `${whole} ${numerator}/${denominator}`;
    }
}

function isValidFraction(fraction) {
    const validDenominators = [2, 4, 8, 16];
    return validDenominators.includes(fraction.denominator);
}
