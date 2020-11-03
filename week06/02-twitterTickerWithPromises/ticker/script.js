(function () {
    var headlineContainer = $(".headlines");
    var positionLeft = headlineContainer.offset().left;

    var tickerMoves;

    function moveTicker() {
        var firstHeadline = $(".headlines > a:first-child");
        //console.log(firstHeadline);
        if (positionLeft + firstHeadline.outerWidth() <= 0) {
            console.log(firstHeadline);
            headlineContainer.append(firstHeadline);
            positionLeft = 0;
            //positionLeft = 0 works as long as increment is 1, otherwise jumps
        }
        positionLeft -= 3;
        headlineContainer.css("left", positionLeft + "px");
        tickerMoves = requestAnimationFrame(moveTicker);
    }

    headlineContainer.on("mouseenter", function () {
        cancelAnimationFrame(tickerMoves);
    });

    headlineContainer.on("mouseleave", function () {
        moveTicker();
    });

    $.ajax("./headlines.json")
        .done(function (headlines) {
            for (var headline of headlines) {
                headlineContainer.append(
                    `<a href="${headline.link}">${headline.text}</a>`
                );
            }
            moveTicker();
        })
        .fail(function (e) {
            console.log(e);
        });
})();
