const canvas = document.getElementById("myCanvas"),
    ctx = canvas.getContext("2d");
var moveLeft = false,
    moveRight = false,
    shootTarget = false,
    bullet = null,
    score = 0;

const speed = 3,
    bulletSpeed = 25,
    leftKey = 'ArrowLeft',
    rightKey = 'ArrowRight',
    shootKey = ' ',
    targets = [],
    player = {
        x: canvas.width / 2,
        y: canvas.height - 20,
        paddleLength: 50,
        paddleHeight: 10,
        speed: 10
    }

generateTargetLocations();
drawTargets();
document.onkeydown = (event) => { setDirection(event, true) };
document.onkeyup = (event) => { setDirection(event, false) };
setInterval(move, 10);
setInterval(shoot, 5);

function draw() {
    drawPlayer();
    drawTargets();
    drawBullet();
    drawScore();
}

function setDirection(event, down) {
    if (event.key === leftKey && moveLeft !== down) {
        moveLeft = down;
    } else if (event.key === rightKey && moveRight !== down) {
        moveRight = down;
    } else if (event.key === shootKey && shootTarget !== down) {
        shootTarget = down;
    }
}

function move() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    checkCollision();
    checkTargets();
    if (moveRight && player.x < canvas.width - player.paddleLength) {
        player.x += speed;
    } else if (moveLeft && player.x > 0) {
        player.x -= speed;
    }
    if (bullet) {
        if (bullet.y > 0) {
            bullet.y -= bulletSpeed;
        } else {
            bullet = null;
        }
    }
    draw();
}

function drawPlayer() {
    ctx.fillStyle = 'black';
    ctx.fillRect(player.x, player.y, player.paddleLength, player.paddleHeight);
    ctx.closePath();
}

function generateTargetLocations() {
    function extraItems(val) {
        return val % 2 === 0 ? 1 : 0;
    }
    for (var j = 1; j < 4; j++) {
        for (var i = 1; i < 15 + extraItems(j); i++) {
            targets.push({
                x: i * 50 + j % 2 * 20,
                y: j * 50,
                radius: 20,
                visible: true
            });
        }
    }
}

function drawTargets() {
    ctx.beginPath();
    targets.forEach((target) => {
        if (target.visible) {
            ctx.fillStyle = 'green';
            ctx.moveTo(target.x, target.y);
            ctx.arc(target.x, target.y, target.radius, 0, 2 * Math.PI);
        }
    });
    ctx.fill();
    ctx.closePath();
}

function shoot() {
    if (shootTarget && !bullet) {
        bullet = {
            x: player.x + player.paddleLength / 2,
            y: player.y,
            radius: 10
        };
    }
}

function drawBullet() {
    if (bullet) {
        ctx.beginPath();
        ctx.fillStyle = 'red';
        ctx.arc(bullet.x, bullet.y, bullet.radius, 0, Math.PI * 2, false);
        ctx.fill();
    }
}

function checkCollision() {
    if (bullet) {
        var aim = targets.find((target) => {
            if (target.visible) {
                return parseInt(Math.sqrt(((target.x - bullet.x) *
                        (target.x - bullet.x)) +
                    ((target.y - bullet.y) *
                        (target.y - bullet.y)))) < target.radius + bullet.radius;
            }
        });
    }
    if (aim) {
        targets[targets.indexOf(aim)].visible = false;
        setTimeout(() => {
            targets[targets.indexOf(aim)].visible = true;
        }, 10000);
        bullet = null;
        score++;
        console.log(score);
    }
}

function checkTargets() {
    if (score % targets.length === 0) {
        targets.forEach(target => target.visible = true);
    }
}

function drawScore() {
    ctx.font = "24px Arial";
    ctx.fillStyle = "black";
    ctx.fillText("Wynik: " + score, canvas.width - 150, canvas.height - 25);
}