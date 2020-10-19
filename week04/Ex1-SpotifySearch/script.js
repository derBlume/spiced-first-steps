var results = $("#results");

var offset = 0;
var idx = 1;

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

            var next =
                data[$("select[name=type]").val() + "s"].total > offset + 15;
            var items = data[$("select[name=type]").val() + "s"].items;

            if (items.length === 0) {
                $("#searchInfo").empty();
                $("#searchInfo").show();
                $("#searchInfo").append(
                    `<p>Sorry, nothing found for "${$(
                        "input[name=query]"
                    ).val()}"</p>`
                );
                return;
            }

            $("#searchInfo").empty();
            $("#searchInfo").show();
            $("#searchInfo").append(
                `<p>Results for "${$("input[name=query]").val()}":</p>`
            );

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
                $("#more").show();
            } else {
                $("#more").hide();
            }
        },
        error: function () {
            $("#searchInfo").empty();
            $("#searchInfo").show();
            $("#searchInfo").append(`<p>Something went wrong. Sorry!</p>`);
        },
    });
}

$("#search").on("click", function () {
    results.empty();
    offset = 0;
    idx = 1;

    queryApi();
});

$("#query").on("keydown", function (event) {
    if (event.key === "Enter") {
        results.empty();
        offset = 0;
        idx = 1;

        queryApi();
    }
});

$("#more").on("click", function () {
    offset += 15;

    queryApi();
});
