var textarea = document.querySelector(".userInputJSON");
var buttonCheckJSON = document.querySelector(".checkJSON");
var number = document.querySelector(".userInputNumber");
var buttonTranslateNumber = document.querySelector(".translateNumber");

//store input in localStorage

try {
    textarea.value = localStorage.getItem("localCopyOfUserInput");
} catch (error) {
    alert("Couldn't access local storage. Too bad!", error);
}

textarea.addEventListener("input", function () {
    try {
        localStorage.setItem("localCopyOfUserInput", textarea.value);
    } catch (error) {
        alert("Couldn't access local storage. Too bad!", error);
    }
});

// check if input is valid JSON

buttonCheckJSON.addEventListener("click", function () {
    try {
        JSON.parse(textarea.value);
        buttonCheckJSON.value = "VALID!";
        buttonCheckJSON.style.backgroundColor = "mediumseagreen";
        setTimeout(function () {
            buttonCheckJSON.value = "Check JSON";
        }, 3000);
    } catch (error) {
        buttonCheckJSON.value = "INVALID!";
        buttonCheckJSON.style.backgroundColor = "tomato";
        setTimeout(function () {
            buttonCheckJSON.value = "Check JSON";
        }, 3000);
    }
});

//translate Number to German

function askForNumber() {
    //var num = prompt("Please enter a number between 1 and 10");
    var num = number.value;
    if (num >= 1 && num <= 10 && num == parseInt(num)) {
        return num;
    }
    throw new Error("VERBOTEN! Enter a number between 1 and 10");
}

function translateNumberToGerman(number) {
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
    return germanNumbers[number];
}

buttonTranslateNumber.addEventListener("click", function () {
    try {
        buttonTranslateNumber.value = translateNumberToGerman(askForNumber());
    } catch (error) {
        buttonTranslateNumber.value = error;
        //translateNumberToGerman(askForNumber());
    }
});

console.log(number);
