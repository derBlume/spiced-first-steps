(function () {
    var headlineContainer = document.querySelector(".headlines");
    var positionLeft = headlineContainer.offsetLeft;
    var tickerMoves;

    function moveTicker() {
        var firstHeadline = document.querySelector(".headlines > a");
        //console.log(firstHeadline);
        if (positionLeft + firstHeadline.offsetWidth <= 0) {
            headlineContainer.append(firstHeadline);
            positionLeft = 0;
            //positionLeft = 0 works as long as increment is 1, otherwise jumps
        }
        positionLeft -= 3;
        headlineContainer.style.left = positionLeft + "px";
        tickerMoves = requestAnimationFrame(moveTicker);
    }

    headlineContainer.addEventListener("mouseenter", function () {
        cancelAnimationFrame(tickerMoves);
    });

    headlineContainer.addEventListener("mouseleave", function () {
        moveTicker();
    });

    $.ajax("./headlines.json")
        .done(function (headlines) {
            for (var headline of headlines) {
                console.log(headline.text);
                var hl = document.createElement("A");
                hl.innerHTML = headline.text;
                hl.setAttribute("href", headline.link);
                headlineContainer.appendChild(hl);
            }
            moveTicker();
        })
        .fail(function (e) {
            console.log(e);
        });
})();
