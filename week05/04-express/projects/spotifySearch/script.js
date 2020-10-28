//HANDLEBARS SETUP
Handlebars.templates = Handlebars.templates || {};

var templates = document.querySelectorAll(
    'script[type="text/x-handlebars-template"]'
);

Array.prototype.slice.call(templates).forEach(function (script) {
    Handlebars.templates[script.id] = Handlebars.compile(script.innerHTML);
});
//HANDLEBARS SETUP

var results = $("#results");

var NO_IMG =
    "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg";

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
            console.log(data);
            displayResults(data);
        },
        error: function () {
            displaySearchInfo(`<p>Something went wrong!</p>`);
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
        var image = item.images.length ? item.images[0].url : NO_IMG;

        if ($("select[name=type]").val() === "artist") {
            results.append(
                Handlebars.templates.resultsTemplateArtists({
                    idx: idx,
                    image: image,
                    item: item,
                })
            );
        } else {
            results.append(
                Handlebars.templates.resultsTemplateAlbums({
                    idx: idx,
                    image: image,
                    item: item,
                })
            );
        }

        idx++;
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
    if (
        currentQuery !=
        $("input[name=query]").val() + $("select[name=type]").val()
    ) {
        currentQuery =
            $("input[name=query]").val() + $("select[name=type]").val();
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
