function askForNumber() {
    var num = prompt("Please enter a number between 1 and 10");
    if (num >= 1 && num <= 10 && num == parseInt(num)) {
        return num;
    }
    throw new Error("VERBOTEN! Enter a number between 1 and 10");
}

function translateNumberToGerman() {
    var germanNumbers = [
        "Null",
        "Eins",
        "Zwei",
        "Drei",
        "Vier",
        "Fünf",
        "Sechs",
        "Sieben",
        "Acht",
        "Neun",
        "Zehn",
    ];

    try {
        alert("auf Deutsch: " + germanNumbers[askForNumber()]);
    } catch (e) {
        alert(e);
        translateNumberToGerman();
    }
}

translateNumberToGerman();
