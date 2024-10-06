function calculateBoardFootage() {
    const thicknessInches = parseFloat(document.getElementById("thickness").value);
    const width = parseFloat(document.getElementById("width").value);
    const length = parseFloat(document.getElementById("length").value);
    const pricePerBF = parseFloat(document.getElementById("price").value);
    const quantity = parseFloat(document.getElementById("quantity").value);
    const wastePercentage = parseFloat(document.getElementById("waste").value);
    
    // Calculate Board Feet for one piece
    const boardFeetPerPiece = (thicknessInches * width * length) / 12;

    // Calculate total Board Feet for all pieces
    const totalBoardFeet = boardFeetPerPiece * quantity;

    // Calculate waste in Board Feet
    const wasteBoardFeet = totalBoardFeet * (wastePercentage / 100);

    // Calculate total Board Feet including waste
    const totalWithWaste = totalBoardFeet + wasteBoardFeet;

    // Calculate total cost considering waste
    const totalCost = totalWithWaste * pricePerBF;

    // Display results
    document.getElementById("result").innerHTML = `
        <h2>Calculation Results:</h2>
        <p>Board Footage: ${totalBoardFeet.toFixed(2)} BF</p>
        <p>Waste: ${wasteBoardFeet.toFixed(2)} BF</p>
        <p>Total Board Footage (including waste): ${totalWithWaste.toFixed(2)} BF</p>
        <p>Total Cost: $${totalCost.toFixed(2)}</p>
    `;
}

function resetForm() {
    document.getElementById("thickness").value = '1';
    document.getElementById("width").value = '';
    document.getElementById("length").value = '';
    document.getElementById("quantity").value = '';
    document.getElementById("price").value = '';
    document.getElementById("waste").value = '';
    document.getElementById("result").innerHTML = '';
}