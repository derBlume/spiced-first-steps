(function () {
    var slider = document.querySelector(".slider");
    var sliderimages = Array.from(document.querySelectorAll(".sliderimage"));

    var index = 0;
    var dotcontainer = document.querySelector(".dotcontainer");

    for (var i = 1; i < sliderimages.length; i++) {
        var addedDot = document.createElement("DIV");
        addedDot.classList.add("dot");
        dotcontainer.append(addedDot);
    }

    var sliderdots = Array.from(document.querySelectorAll(".dot"));

    for (var dot of sliderdots) {
        dot.addEventListener("click", function (event) {
            if (transitionRunning === true) return;
            slide(sliderdots.indexOf(event.target));
        });
    }

    var transitionRunning = false;

    function slide(slideTo) {
        transitionRunning = true;

        sliderimages = Array.from(document.querySelectorAll(".sliderimage"));

        if (slideTo != undefined) {
            console.log("slide to", slideTo);
            sliderimages[index].classList.add("move");
            sliderimages[slideTo].classList.add("move");
        } else {
            sliderimages[0].classList.add("move");
            sliderimages[1].classList.add("move");
        }

        slider.addEventListener(
            "transitionend",
            function () {
                transitionRunning = false;

                for (var image of sliderimages) {
                    image.classList.remove("move");
                }

                slider.append(sliderimages[0]);

                sliderdots[index].classList.remove("filled");

                index = (index + 1) % sliderimages.length;

                sliderdots[index].classList.add("filled");

                setTimeout(slide, 3000);
            },
            { once: true }
        );
    }

    setTimeout(slide, 3000);
})();
