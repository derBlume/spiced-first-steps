var results = $("#results");

var offset = 0;
var idx = 1;
var currentQuery;

var params = new URLSearchParams(document.location.search);

var infinite_mode = params.get("scroll") === "infinite";

console.log("infinite mode:", infinite_mode);

function queryApi() {
    $.ajax("https://spicedify.herokuapp.com/spotify", {
        data: {
            q: $("input[name=query]").val(),
            type: $("select[name=type]").val(),
            limit: 15,
            offset: offset,
        },
        success: function (data) {
            displayResults(data);
        },
        error: function () {
            displaySearchInfo(`<p>${message}</p>`);
        },
    });
}

function displaySearchInfo(message) {
    $("#searchInfo").empty();
    $("#searchInfo").show();
    $("#searchInfo").append(`<p>${message}</p>`);
}

function displayResults(data) {
    var next = data[$("select[name=type]").val() + "s"].total > offset + 15;
    var items = data[$("select[name=type]").val() + "s"].items;

    if (items.length === 0) {
        displaySearchInfo(
            `<p>Sorry, nothing found for "${$("input[name=query]").val()}"</p>`
        );
        $("#more").hide();
        return;
    }
    displaySearchInfo(`Results for "${$("input[name=query]").val()}":`);

    for (var item of items) {
        var image;

        results.append(`<div class="description"><p>${idx}.</p></div>`);
        idx++;

        if (item.images.length) {
            image = item.images[0].url;
            results.append(`<img class="image" src="${image}" />`);
        } else {
            results.append(
                `<div class="image">Sorry, no image available</div>`
            );
        }
        results.append(
            `<div class="description"><p><a href="${item.external_urls.spotify}">${item.name}</a></p></div>`
        );
    }

    if (next) {
        if (infinite_mode) {
            checkScrollPosition();
        } else {
            $("#more").show();
        }
    } else {
        $("#more").hide();
    }
}

function checkScrollPosition() {
    var timer = setInterval(function () {
        if (
            $(document).scrollTop() + $(window).height() >=
            $(document).height() - 200
        ) {
            console.log("END");

            clearInterval(timer);

            offset += 15;

            queryApi();
        } else {
            console.log("NOT END YET");
        }
    }, 250);
}

$("#search").on("click", function () {
    if (currentQuery != $("input[name=query]").val()) {
        currentQuery = $("input[name=query]").val();
        results.empty();
        offset = 0;
        idx = 1;

        queryApi();
    }
});

$("#query").on("keydown", function (event) {
    if (event.key === "Enter") {
        if (currentQuery != $("input[name=query]").val()) {
            currentQuery = $("input[name=query]").val();
            results.empty();
            offset = 0;
            idx = 1;

            queryApi();
        }
    }
});

$("#more").on("click", function () {
    offset += 15;

    queryApi();
});
