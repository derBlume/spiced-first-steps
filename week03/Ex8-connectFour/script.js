var board = $(".board");
var messageArea = $(".messageArea");
messageArea.text("Let's play!");

var player = "player-1";

var victory = false;

var numMoves = 0;

function switchPlayer() {
    player = player === "player-1" ? "player-2" : "player-1";
}

function getColumnIdx(slotIdx) {
    return slotIdx % 7;
}

function getRowIdx(slotIdx) {
    return Math.floor(slotIdx / 7);
}

for (var i = 0; i < 42; i++) {
    var column = getColumnIdx(i);
    var row = getRowIdx(i);

    board.append(`
    <div class="slot column-${column} row-${row}">
      <div class="hole"></div>
    </div>`);
}

function checkVictory(slots) {
    var count = 0;

    for (var i = 0; i < slots.length; i++) {
        if ($(slots[i]).hasClass(player)) {
            count++;

            if (count === 4) return true;
        } else {
            count = 0;
        }
    }

    return false;
}

function resetBoard() {
    console.log("reset click");
    $(".slot").removeClass("player-1");
    $(".slot").removeClass("player-2");
    victory = false;
    numMoves = 0;
    messageArea.text("Let's play!");
}

$(".slot").on("click", function (e) {
    if (victory || numMoves >= 42) {
        resetBoard();
        return;
    }

    numMoves++;

    var slot = $(e.currentTarget);

    var slotIdx = slot.index();

    var columnIdx = getColumnIdx(slotIdx);

    var columnSlots = $(`.column-${columnIdx}`);

    var freeSlotFound = false;

    var rowSlots;

    var diagSlots1 = [];
    var diagSlots2 = [];

    for (var rowIdx = columnSlots.length - 1; rowIdx >= 0; rowIdx--) {
        if (
            !columnSlots.eq(rowIdx).hasClass("player-1") &&
            !columnSlots.eq(rowIdx).hasClass("player-2")
        ) {
            columnSlots.eq(rowIdx).addClass(player);
            freeSlotFound = true;

            rowSlots = $(`.row-${rowIdx}`);
            getDiagSlots(columnIdx, rowIdx);
            break;
        }
    }

    function getDiagSlots(columnIdx, rowIdx) {
        var diagId1 = columnIdx + rowIdx;
        var diagId2 = columnIdx - rowIdx;

        for (var slotIdx = 0; slotIdx < 42; slotIdx++) {
            if (getColumnIdx(slotIdx) + getRowIdx(slotIdx) === diagId1) {
                diagSlots1.push($(".slot")[slotIdx]);
            }
            if (getColumnIdx(slotIdx) - getRowIdx(slotIdx) === diagId2) {
                diagSlots2.push($(".slot")[slotIdx]);
            }
        }
    }

    if (freeSlotFound) {
        victory =
            checkVictory(columnSlots) ||
            checkVictory(rowSlots) ||
            checkVictory(diagSlots1) ||
            checkVictory(diagSlots2);

        if (victory) {
            console.log("VICTORY FOR", player);
            var playerPretty = player === "player-1" ? "Player 1" : "Player 2";
            messageArea.text(`${playerPretty} wins! Click to play again.`);
        } else if (numMoves >= 42) {
            console.log("It's a tie");
            messageArea.text("It's a tie! Click to start over.");
            switchPlayer();
        } else {
            switchPlayer();
        }
    }
});
