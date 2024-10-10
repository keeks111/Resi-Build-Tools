document.addEventListener('DOMContentLoaded', function() {
    const scale = document.getElementById('scale');

    function createTick(className, leftPosition) {
        const tick = document.createElement('div');
        tick.className = `tick ${className}`;
        tick.style.left = `${leftPosition}%`;
        scale.appendChild(tick);
    }

    // Generate tick marks for 0 to 1 inch
    for (let i = 0; i <= 16; i++) { // Total of 16 ticks for full 1 inch
        const tickClass = i % 16 === 0 ? 'tick-1-2' :
                          i % 8 === 0 ? 'tick-1-2' :
                          i % 4 === 0 ? 'tick-1-4' :
                          i % 2 === 0 ? 'tick-1-8' : 'tick-1-16';
        createTick(tickClass, (i / 16) * 100);
    }

    window.convertDecimal = function() {
        const input = parseFloat(document.getElementById('decimalInput').value);
        if (isNaN(input) || input <= 0 || input >= 1) {
            alert("This exceeds the one-inch scale. Please enter a number starting with 0.");
            return;
        }

        const denominators = [2, 4, 8, 16, 32, 64];
        let exactFraction = null;

        for (let denom of denominators) {
            const numerator = Math.round(input * denom);
            if (Math.abs(input - (numerator / denom)) < 1e-6) {
                exactFraction = simplifyFraction(numerator, denom);
                break;
            }
        }

        if (exactFraction) {
            document.getElementById('resultFraction').innerText = `Exact Fraction: ${exactFraction[0]}/${exactFraction[1]}`;
        } else {
            const fractionNumerator = Math.round(input * 16); // Convert to sixteenths
            const nearestFraction = fractionNumerator / 16;
            const wholeNumber = Math.floor(nearestFraction);
            const numerator = fractionNumerator % 16;
            const simplified = simplifyFraction(numerator, 16);
            document.getElementById('resultFraction').innerText = `Nearest Fraction: ${wholeNumber ? wholeNumber + ' ' : ''}${simplified[0]}/${simplified[1]}`;
        }

        // Update the visual scale
        scale.innerHTML = ''; // Clear previous markers

        // Create tick marks for 0 to 1 inch
        for (let i = 0; i <= 16; i++) { // Total of 16 ticks for full 1 inch
            const tick = document.createElement('div');
            tick.className = 'tick';
            if (i % 16 === 0) { // 1 inch tick
                tick.classList.add('tick-1-2');
            } else if (i % 8 === 0) { // 1/2 inch tick
                tick.classList.add('tick-1-2');
            } else if (i % 4 === 0) { // 1/4 inch tick
                tick.classList.add('tick-1-4');
            } else if (i % 2 === 0) { // 1/8 inch tick
                tick.classList.add('tick-1-8');
            } else { // 1/16 inch tick
                tick.classList.add('tick-1-16');
            }
            tick.style.left = `${(i / 16) * 100}%`; // Position based on total ticks
            scale.appendChild(tick);
        }

        // Add pointer to indicate decimal point on the scale
        const pointer = document.createElement('div');
        pointer.className = 'pointer';
        pointer.style.left = `${input * 100}%`;
        scale.appendChild(pointer);
    };

    window.clearInput = function() {
        document.getElementById('decimalInput').value = '';
        document.getElementById('resultFraction').innerText = '';
        const pointer = document.querySelector('.pointer');
        if (pointer) {
            pointer.remove(); // Remove the pointer
        }
    };

    function gcd(a, b) {
        return b === 0 ? a : gcd(b, a % b);
    }

    function simplifyFraction(numerator, denominator) {
        const divisor = gcd(numerator, denominator);
        return [numerator / divisor, denominator / divisor];
    }
});
function convertToFraction() {
    const decimalValue = document.getElementById('decimal-input').value;
    if (decimalValue) {
        // Implement the conversion logic here
        alert('Converting ' + decimalValue + ' to fraction...');
    } else {
        alert('Please paste a decimal value.');
    }
}
