var figure = document.querySelector("#figure");
var figureCtx = figure.getContext("2d");

figureCtx.beginPath();
figureCtx.lineWidth = 5;
figureCtx.arc(50, 50, 45, 0, Math.PI * 2);
figureCtx.moveTo(50, 100);
figureCtx.lineTo(50, 250);
figureCtx.lineTo(0, 300);
figureCtx.moveTo(50, 250);
figureCtx.lineTo(100, 300);
figureCtx.moveTo(50, 200);
figureCtx.lineTo(0, 150);
figureCtx.moveTo(50, 200);
figureCtx.lineTo(100, 150);
figureCtx.stroke();

var playground = document.querySelector("#playground").getContext("2d");

var x = 10;
var y = 10;

playground.drawImage(figure, x, y);

document.body.addEventListener("keydown", function (event) {
    playground.clearRect(0, 0, 600, 600);
    if (event.key === "ArrowRight") {
        x += 10;
        playground.drawImage(figure, x, y);
    } else if (event.key === "ArrowLeft") {
        x -= 10;
        playground.drawImage(figure, x, y);
    } else if (event.key === "ArrowDown") {
        y += 10;
        playground.drawImage(figure, x, y);
    } else if (event.key === "ArrowUp") {
        y -= 10;
        playground.drawImage(figure, x, y);
    }
});
