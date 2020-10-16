var NUMBER_OF_COLUMNS = 7;
var NUMBER_OF_ROWS = 6;
var CONNECT_TO_WIN = 4;

var boardDOM = document.querySelector("main");
var boardArray = [
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
];

function addToken(column, row, player) {
    var token = document.createElement("DIV");

    if (player === "X") {
        token.classList.add("token", "playerX");
        token.innerHTML = "X";
        boardArray[column][row] = "X";
    } else if (player === "O") {
        token.classList.add("token", "playerO");
        token.innerHTML = "O";
        boardArray[column][row] = "O";
    }

    token.style.gridColumn = column + 1;
    token.style.gridRow = row + 1;
    boardDOM.append(token);
}

function checkHorizontally() {
    var counterX = 0;
    var counterO = 0;
    for (var j = 0; j < NUMBER_OF_ROWS; j++) {
        for (var i = 0; i < NUMBER_OF_COLUMNS; i++) {
            if (boardArray[i][j] === "X") {
                counterX++;
                counterO = 0;
                //console.log(`at ${i} ${j} counterO: ${counterO}, counterX: ${counterX}`);
            } else if (boardArray[i][j] === "O") {
                counterO++;
                counterX = 0;
                //console.log(`at ${i} ${j} counterO: ${counterO}, counterX: ${counterX}`);
            } else {
                counterX = 0;
                counterO = 0;
                //console.log(`at ${i} ${j} counterO: ${counterO}, counterX: ${counterX}`);
            }

            if (counterX >= CONNECT_TO_WIN) {
                console.log("horizontal Winner is X");
            }
            if (counterO >= CONNECT_TO_WIN) {
                console.log("horizontal Winner is O");
            }
        }
    }
}

function checkVertically() {
    var counterX = 0;
    var counterO = 0;
    for (var i = 0; i < NUMBER_OF_COLUMNS; i++) {
        for (var j = 0; j < NUMBER_OF_ROWS; j++) {
            if (boardArray[i][j] === "X") {
                counterX++;
                counterO = 0;
                //console.log(`at ${i} ${j} counterO: ${counterO}, counterX: ${counterX}`);
            } else if (boardArray[i][j] === "O") {
                counterO++;
                counterX = 0;
                //console.log(`at ${i} ${j} counterO: ${counterO}, counterX: ${counterX}`);
            } else {
                counterX = 0;
                counterO = 0;
                //console.log(`at ${i} ${j} counterO: ${counterO}, counterX: ${counterX}`);
            }

            if (counterX >= CONNECT_TO_WIN) {
                console.log("vertical Winner is X");
            }
            if (counterO >= CONNECT_TO_WIN) {
                console.log("vertical Winner is O");
            }
        }
    }
}

addToken(2, 0, "X");
addToken(2, 1, "X");
addToken(3, 1, "X");
addToken(4, 1, "X");
addToken(5, 1, "O");
addToken(6, 1, "X");
addToken(2, 2, "X");
addToken(3, 2, "X");
addToken(4, 2, "X");
addToken(2, 3, "X");
addToken(6, 2, "X");
addToken(5, 4, "O");
addToken(4, 4, "O");
addToken(3, 4, "O");
addToken(2, 4, "O");

checkHorizontally();
checkVertically();
