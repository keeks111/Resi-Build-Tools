function convertInchesToMm() {
    const inches = document.getElementById('inchesInput').value;
    const mm = inches * 25.4; // 1 inch = 25.4 mm
    document.getElementById('mmOutput').innerText = `${inches} inches is ${mm.toFixed(2)} mm`;
}

function convertMmToInches() {
    const mm = document.getElementById('mmInput').value;
    const inches = mm / 25.4; // 1 mm = 0.0393701 inches
    document.getElementById('inchesOutput').innerText = `${mm} mm is ${inches.toFixed(2)} inches`;
}

function resetInches() {
    document.getElementById('inchesInput').value = ''; // Clear the inches input
    document.getElementById('mmOutput').innerText = ''; // Clear the mm output
}

function resetMm() {
    document.getElementById('mmInput').value = ''; // Clear the mm input
    document.getElementById('inchesOutput').innerText = ''; // Clear the inches output
}
