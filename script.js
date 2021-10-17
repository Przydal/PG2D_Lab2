const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
var moveLeft = false;
var moveRight = false;

const speed = 3;
const left = 'ArrowLeft';
const right = 'ArrowRight';

const player = {
    x: canvas.width / 2,
    y: canvas.height - 20,
    paddleLength: 50,
    speed: 10
}

document.onkeydown = (event) => { setDirection(event, true) };
document.onkeyup = (event) => { setDirection(event, false) };

function draw() {
    ctx.fillRect(player.x, player.y, player.paddleLength, 10);
    ctx.filStyle = 'black';
    ctx.fill();
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function setDirection(event, down) {
    if (event.key === left && moveLeft !== down) {
        moveLeft = down;
    }
    else if (event.key === right && moveRight !== down) {
        moveRight = down;
    }
}

function move() {
    if (moveRight && player.x < canvas.width - player.paddleLength) {
        player.x += speed;
    } else if (moveLeft && player.x > 0) {
        player.x -= speed;
    }
}


setInterval(updateCanvas, 10);

function updateCanvas() {
    clearCanvas();
    draw();
    move();
}