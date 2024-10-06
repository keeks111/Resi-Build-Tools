function calculate() {
    const wallLength = parseFloat(document.getElementById('wall-length').value);
    const studSpacing = parseFloat(document.getElementById('stud-spacing').value);
    const wallEnds = parseInt(document.getElementById('wall-ends').value);
    const plateLength = parseFloat(document.getElementById('plate-length').value);

    if (isNaN(wallLength) || isNaN(studSpacing) || isNaN(wallEnds) || isNaN(plateLength)) {
        alert('Please enter valid inputs');
        return;
    }

    // Calculate the number of studs
    let studs = Math.ceil((wallLength * 12) / studSpacing) + 1;

    
    if (wallEnds === 2) {
        studs += 2;
    } else if (wallEnds === 3) {
        studs += 4; 
    }

    // Calculate the number of wall plate boards
    const plates = Math.ceil((wallLength * 3) / plateLength);

    // Display the result
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `<h3>Results</h3>
                           <p>Number of studs needed: ${studs}</p>
                           <p>Number of wall plate boards needed: ${plates}</p>`;
}

function resetForm() {
    document.getElementById('wall-length').value = '';
    document.getElementById('stud-spacing').value = '16';
    document.getElementById('wall-ends').value = '1';
    document.getElementById('plate-length').value = '8';
    document.getElementById('result').innerHTML = '';
}