function toggleOutsideBeamWidth() {
    const outsideBeams = document.getElementById('outside_beams').checked;
    const container = document.getElementById('outside_beam_width_container');
    container.style.display = outsideBeams ? 'block' : 'none';
}

function calculate() {
    const length = parseFloat(document.getElementById('length').value);
    const numberOfBeams = parseFloat(document.getElementById('number_of_beams').value);
    const widthOfBeams = parseFloat(document.getElementById('width_of_beams').value);
    const outsideBeams = document.getElementById('outside_beams').checked;
    const widthOfOutsideBeams = parseFloat(document.getElementById('width_of_outside_beams').value);

    if (isNaN(length) || isNaN(numberOfBeams) || isNaN(widthOfBeams) || (outsideBeams && isNaN(widthOfOutsideBeams))) {
        document.getElementById('result').textContent = 'Please enter valid numbers.';
        return;
    }

    let total;
    if (outsideBeams) {
        const subTotal = length - (2 * widthOfOutsideBeams) - ((numberOfBeams - 2) * widthOfBeams);
        total = subTotal / (numberOfBeams - 1);
    } else {
        const subTotal = length - (numberOfBeams * widthOfBeams);
        total = subTotal / (numberOfBeams + 1);
    }

    document.getElementById('result').textContent = `Total space between beams: ${total.toFixed(4)}`;
}