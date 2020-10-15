(function () {
    var headlines = document.querySelector(".headlines");
    var positionLeft = headlines.offsetLeft;
    var tickerMoves;

    function moveTicker() {
        var firstHeadline = document.querySelector(".headlines > a");
        if (positionLeft + firstHeadline.offsetWidth <= 0) {
            headlines.append(firstHeadline);
            positionLeft = 0;
            //positionLeft = 0 works as long as increment is 1, otherwise jumps
        }
        positionLeft -= 1;
        headlines.style.left = positionLeft + "px";
        tickerMoves = requestAnimationFrame(moveTicker);
    }

    $.ajax("/headlines.json")
        .done(function (data) {
            for (var headline of data) {
                headlines.append(
                    '<a href="' + headline.link + '">' + headline.text + "</a>"
                );
            }
            moveTicker();
        })
        .fail(function (e) {
            console.log(e);
        });

    headlines.addEventListener("mouseenter", function () {
        cancelAnimationFrame(tickerMoves);
    });

    headlines.addEventListener("mouseleave", function () {
        moveTicker();
    });
})();
