var imageContainer = document.querySelector(".imageContainer");
var images = Array.from(imageContainer.querySelectorAll(".sliderimage"));

var dotContainer = document.querySelector(".dotContainer");
var dots = Array.from(dotContainer.querySelectorAll(".dot"));

var currentImage = 0;
var nextImage = 1;

var transitionRunning = false;
var timeout;

for (var dot of dots) {
    dot.addEventListener("click", function (event) {
        if (transitionRunning === true) {
            return;
        }

        slide(dots.indexOf(event.target));
    });
}

function slide(slideTo) {
    transitionRunning = true;
    clearTimeout(timeout);

    if (slideTo != undefined) {
        console.log("slide to", slideTo);

        /* for (var i = currentImage; i != slideTo; i = (i + 1) % 4) {
            console.log(i);
        } */

        sliderimages[0].classList.add("move");
        sliderimages[slideTo].classList.add("move");
    } else {
        images[currentImage].classList.add("move");
        images[nextImage].classList.add("move");

        imageContainer.addEventListener(
            "transitionend",
            function () {
                transitionRunning = false;

                for (var image of images) {
                    image.classList.remove("move");
                }

                imageContainer.append(images[currentImage]);

                dots[currentImage].classList.remove("filled");

                currentImage = (currentImage + 1) % 4;
                nextImage = (currentImage + 1) % 4;

                dots[currentImage].classList.add("filled");

                timeout = setTimeout(slide, 3000);
            },
            { once: true }
        );
    }
}

timeout = setTimeout(slide, 3000);
