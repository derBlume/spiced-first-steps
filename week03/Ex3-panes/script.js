var panes = document.querySelector(".panes");
var image = document.querySelector("img:nth-child(2)");
var bar = document.querySelector(".bar");

var inPane;
var mouseDown;

panes.addEventListener("mousedown", function () {
    mouseDown = true;
});

panes.addEventListener("mouseup", function () {
    mouseDown = false;
});

function inPane() {
    event.PageX - panes.offsetLeft <= panes.style.offsetWidth;
}

panes.addEventListener("mousemove", function (event) {
    var position = event.pageX - panes.offsetLeft;
    if (mouseDown && position <= panes.offsetWidth - 5 && position >= 5) {
        bar.style.left = position + "px";
        image.style.clipPath = "inset(0 0 0 " + position + "px)";
    }
});

console.log(panes.offsetWidth);
