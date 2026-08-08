const player = document.getElementById("player");
const enemies = document.querySelectorAll(".enemy");
const roadLines = document.querySelectorAll(".roadLine");

const scoreBox = document.getElementById("score");
const levelBox = document.getElementById("level");

const startScreen = document.getElementById("startScreen");
const gameOver = document.getElementById("gameOver");
const winner = document.getElementById("winner");

const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");

const leftBtn = document.getElementById("leftBtn");
const rightBtn = document.getElementById("rightBtn");

let game = {
    start: false,
    score: 0,
    level: 1,
    speed: 8,
    playerX: 125
};

player.style.left = game.playerX + "px";

// Enemy ki starting position
enemies[0].style.left = "40px";
enemies[0].style.top = "-200px";

enemies[1].style.left = "125px";
enemies[1].style.top = "-650px";

enemies[2].style.left = "210px";
enemies[2].style.top = "-1100px";

startBtn.onclick = startGame;

restartBtn.onclick = function () {
    location.reload();
};

function startGame() {

    startScreen.style.display = "none";
    gameOver.style.display = "none";
    winner.style.display = "none";

    game.start = true;
    game.score = 0;
    game.level = 1;
    game.speed = 8;
    game.playerX = 125;

    player.style.left = game.playerX + "px";

    requestAnimationFrame(playGame);
}
function playGame() {

    if (!game.start) return;

    moveRoad();
    moveEnemy();

    game.score++;

    scoreBox.innerHTML = "Score : " + game.score;
    levelBox.innerHTML = "Level : " + game.level;

    // Har 300 score par level aur speed badhegi
    if (game.score % 300 === 0) {
        game.level++;
        game.speed += 0.8;
    }

    if (game.level > 10) {
        game.start = false;
        winner.style.display = "flex";
        return;
    }

    requestAnimationFrame(playGame);
}

function moveRoad() {

    roadLines.forEach(function(line) {

        let top = parseInt(line.style.top);
        if (isNaN(top)) top = 0;

        top += game.speed;

        if (top >= 640) top = -120;

        line.style.top = top + "px";
    });

}

function moveEnemy() {

    enemies.forEach(function(enemy) {

        let top = parseInt(enemy.style.top);
        if (isNaN(top)) top = -500;

        top += game.speed;

        if (top >= 700) {

            // Enemy ko random distance se wapas bhejo
            top = -(350 + Math.floor(Math.random() * 500));

            // Random lane
            const lanes = ["40px", "125px", "210px"];
            enemy.style.left = lanes[Math.floor(Math.random() * lanes.length)];

            game.score += 20;
        }

        enemy.style.top = top + "px";

        let p = player.getBoundingClientRect();
        let e = enemy.getBoundingClientRect();

        if (
            p.left < e.right &&
            p.right > e.left &&
            p.top < e.bottom &&
            p.bottom > e.top
        ) {
            game.start = false;
            gameOver.style.display = "flex";
        }

    });

}
function moveLeft() {

    if (!game.start) return;

    if (game.playerX > 40) {
        game.playerX -= 85;
        player.style.left = game.playerX + "px";
    }

}

function moveRight() {

    if (!game.start) return;

    if (game.playerX < 210) {
        game.playerX += 85;
        player.style.left = game.playerX + "px";
    }

}

leftBtn.addEventListener("click", moveLeft);
rightBtn.addEventListener("click", moveRight);

leftBtn.addEventListener("touchstart", function(e) {
    e.preventDefault();
    moveLeft();
}, { passive: false });

rightBtn.addEventListener("touchstart", function(e) {
    e.preventDefault();
    moveRight();
}, { passive: false });

document.addEventListener("keydown", function(e) {

    if (!game.start) return;

    if (e.key === "ArrowLeft") {
        moveLeft();
    }

    if (e.key === "ArrowRight") {
        moveRight();
    }

});

window.addEventListener("resize", function() {
    player.style.left = game.playerX + "px";
});

console.log("Car Racing Challenge");
console.log("Developed by Keshav Pandey");