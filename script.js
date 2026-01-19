function calculate() {
    const risk = parseFloat(document.getElementById("risk").value);
    const entry = parseFloat(document.getElementById("entry").value);
    const stop = parseFloat(document.getElementById("stop").value);

    if (!risk || !entry || !stop) {
      alert("Please fill in all fields");
      return;
    }

    const positionSize =
      (risk * entry) / Math.abs(entry - stop);


    document.getElementById("result").innerHTML = `
      <strong>Position Size:</strong> $${positionSize.toFixed(2)}<br>
    `;
}