(function () {
    var MAX_NUMBER_OF_RESULTS = 4;

    var inputField = $("input[name=country]");
    var resultsContainer = $(".results");
    var highlighted;
    var timeout;

    inputField.on("input", function () {
        var input = inputField.val();
        clearTimeout(timeout);

        if (input !== "") {
            function fetchData() {
                $.ajax("https://spicedworld.herokuapp.com/", {
                    data: { q: input },
                })
                    .done(function (results) {
                        if (inputField.val() === input) {
                            resultsContainer.empty();
                            console.log(results);
                            for (var result of results) {
                                resultsContainer.append(
                                    "<p>" + result + "</p>"
                                );
                            }
                        }
                    })
                    .fail(function (e) {
                        console.log(e);
                    });
            }
            timeout = setTimeout(fetchData, 250);
        } else {
            resultsContainer.empty();
        }
    });
    // mousedown fires before blur, click fires after
    $(resultsContainer).on("mousedown", "p", function (event) {
        inputField.val($(event.target).text());
        resultsContainer.empty();
    });

    $(resultsContainer).on("mouseover", "p", function (event) {
        $(resultsContainer).children().removeClass("highlighted");
        $(event.target).addClass("highlighted");
        highlighted = $(event.target).text();
    });

    $(inputField).on("blur", function () {
        //resultsContainer.slideUp(200);
        resultsContainer.hide();
    });

    $(inputField).on("focus", function () {
        //resultsContainer.slideDown(200);
        resultsContainer.show();
    });

    $(inputField).on("keydown", function (event) {
        var idx = $("p.highlighted").index();
        highlighted = resultsContainer.children().eq(idx).text();

        if (event.key === "Enter") {
            inputField.val(highlighted);
            resultsContainer.empty();
        } else if (event.key === "ArrowDown") {
            resultsContainer.children().eq(idx).removeClass("highlighted");
            resultsContainer
                .children()
                .eq((idx + 1) % MAX_NUMBER_OF_RESULTS)
                .addClass("highlighted");
        } else if (event.key === "ArrowUp") {
            resultsContainer.children().eq(idx).removeClass("highlighted");
            resultsContainer
                .children()
                .eq((idx - 1) % MAX_NUMBER_OF_RESULTS)
                .addClass("highlighted");
        }
    });
})();
