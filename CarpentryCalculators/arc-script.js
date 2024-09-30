function calculateRadius() {
    const width = parseFloat(document.getElementById('width').value);
    const height = parseFloat(document.getElementById('height').value);
    const resultElement = document.getElementById('result');

    if (isNaN(width) || isNaN(height)) {
        resultElement.textContent = "Please enter valid numbers for width and height.";
        return;
    }

    // Calculate radius using the given formula
    const radius = (height * height + (width / 2) * (width / 2)) / (2 * height);
    resultElement.textContent = `Radius: ${radius.toFixed(2)}`;
}

function resetFields() {
    document.getElementById('width').value = '';
    document.getElementById('height').value = '';
    document.getElementById('result').textContent = '';
}
