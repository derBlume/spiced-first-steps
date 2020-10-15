(function () {
    var headlines = $(".headlines");

    var positionLeft = headlines.offset().left;
    var tickerMoves;

    function moveTicker() {
        var firstHeadline = $(".headlines > a:first-child");
        if (positionLeft + firstHeadline.offsetWidth <= 0) {
            headlines.append(firstHeadline);
            positionLeft = 0;
            //positionLeft = 0 works as long as increment is 1, otherwise jumps
        }
        positionLeft -= 1;

        headlines.css({ left: positionLeft + "px" });
        tickerMoves = requestAnimationFrame(moveTicker);
    }

    moveTicker();

    headlines.on("mouseenter", function () {
        cancelAnimationFrame(tickerMoves);
    });

    headlines.on("mouseleave", function () {
        moveTicker();
    });
})();
