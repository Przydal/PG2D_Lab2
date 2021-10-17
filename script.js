var canvas;
var ctx;

window.onload = function () {
    canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext("2d");

    draw();

}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillRect(canvas.width/2, canvas.height -20 , 50, 10);
    ctx.filStyle = 'black';
    ctx.fill();
}

function updatePositon() {

}