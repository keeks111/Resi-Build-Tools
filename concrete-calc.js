function calculate() {
    const length = parseFloat(document.getElementById('length').value);
    const width = parseFloat(document.getElementById('width').value);
    const thickness = parseFloat(document.getElementById('thickness').value);

    if (isNaN(length) || isNaN(width) || isNaN(thickness)) {
        alert('Please enter valid inputs');
        return;
    }

    // Calculate the total cubic feet
    const cubicFeet = (length * width * (thickness / 12)).toFixed(2);

    // Convert cubic feet to cubic yards
    const cubicYards = (cubicFeet / 27).toFixed(2);

    // Display the result
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `<h3>Results</h3>
                           <p>Total Cubic Feet: ${cubicFeet}</p>
                           <p>Total Cubic Yards: ${cubicYards}</p>`;
}

function resetForm() {
    document.getElementById('length').value = '';
    document.getElementById('width').value = '';
    document.getElementById('thickness').value = '';
    document.getElementById('result').innerHTML = '';
}