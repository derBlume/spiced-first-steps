(function () {
    var images = document.querySelectorAll(".image");
    var dots = Array.from(document.querySelectorAll(".dot"));

    var currentImage = 0;

    var transitionRunning = false;
    var timeout;

    for (var dot of dots) {
        dot.addEventListener("click", function (event) {
            if (transitionRunning === true) {
                return;
            }

            animate(dots.indexOf(event.target));
        });
    }

    function animate(slideTo) {
        transitionRunning = true;
        clearTimeout(timeout);

        var nextImage;

        if (slideTo === undefined) {
            nextImage = (currentImage + 1) % 4;
        } else {
            nextImage = slideTo;
        }

        images[currentImage].classList.remove("onscreen");
        images[currentImage].classList.add("offscreen");

        images[nextImage].classList.add("onscreen");

        images[currentImage].addEventListener(
            "transitionend",
            function () {
                transitionRunning = false;

                images[currentImage].classList.remove("offscreen");

                dots[currentImage].classList.remove("filled");
                dots[nextImage].classList.add("filled");

                currentImage = nextImage;

                timeout = setTimeout(animate, 5000);
            },
            {
                once: true,
            }
        );
    }

    timeout = setTimeout(function () {
        animate();
    }, 5000);
})();
