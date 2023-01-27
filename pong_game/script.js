//check if keys are down instead of calling an event
let canvas;
let ctx;
let count = 0;
let keyMap;
let p1ScoreText;
let p2ScoreText;
let p1Score = 0;
let p2Score = 0;
let play;
let ball;
let leftPaddle;
let rightPaddle;
let isGameGoing = false;
let keyBoard = {};
let countBounces = 0;
window.addEventListener("load", setup, false);

/**
 * This function creates the canvas as well as three consts, leftpaddle, rightpaddle, and the ball
 * it then calls a function to draw the 3 elements
 * adds event listeners for w,a,upArrow,downArrow to move paddles
 * sets the players scores
 * then call for the game to start being played
 */
function setup() {
  canvas = document.getElementById("myCanvas"); //width 800,height 400
  ctx = canvas.getContext("2d");
  play = document.getElementById("button");

  onkeydown = onkeyup = function (e) {
    e = e || event;
    keyBoard[e.keyCode] = e.type == "keydown";
  };

  leftPaddle = {
    x: 20,
    y: 225,
    velocityY: 400,
    width: 10,
    height: 50,
    draw() {
      ctx.fillStyle = "#FFFFFF"; // red
      ctx.fillRect(this.x, this.y, this.width, this.height); //x,y,width,height
    },
  };
  rightPaddle = {
    x: 770,
    y: 225,
    velocityY: 400,
    width: 10,
    height: 50,
    draw() {
      ctx.fillStyle = "#FFFFFF"; // red
      ctx.fillRect(this.x, this.y, this.width, this.height); //x,y,width,height
    },
  };
  ball = {
    x: 400,
    y: 250,
    radius: 7,
    velocityX: 400,
    velocityY: 0,
    draw() {
      ctx.beginPath();
      ctx.fillStyle = "#FFFF00";
      ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI); //x,y,r, The starting angle, in radians (0 is at the 3 o'clock position of the arc's circle),The ending angle, in radians
      ctx.fill();
    },
  };
  drawElements();
  p1ScoreText = document.getElementById("p1Score");
  p2ScoreText = document.getElementById("p2Score");

  play.addEventListener("click", start, false);
}

function start() {
  if (isGameGoing) return;
  isGameGoing = true;
  p1Score = 0;
  p2Score = 0;
  playGame();
}

async function finishGame() {
  playSound("win.mp3", 0.1);
  ball.x = 400;
  ball.y = 250;
  ball.velocityX = 400;
  ball.velocityY = 0;
  rightPaddle.x = 770;
  rightPaddle.y = 225;
  leftPaddle.x = 20;
  leftPaddle.y = 225;
  clearCanvas();
  drawElements();
  countBounces = 0;
  isGameGoing = false;
  while (!isGameGoing) {
    printWinner();
    await sleep(1);
  }
}

function printWinner() {
  ctx.font = "100px Impact";
  let time = window.performance.now() / 500;
  let r = (Math.cos(time * Math.PI + Math.PI) + 1) / 2;
  let g = (Math.cos(time * Math.PI + Math.PI / 2) + 1) / 2;
  let b = (Math.cos(time * Math.PI + Math.PI * 2) + 1) / 2;
  ctx.fillStyle = "rgb(" + r * 255 + "," + g * 255 + "," + b * 255 + ")";
  ctx.textAlign = "center";
  if (p1Score > p2Score) {
    ctx.fillText("PLAYER 1", canvas.width / 2, canvas.height / 3);
    ctx.fillText("WINS!", canvas.width / 2, canvas.height / 2 + 15);
  } else {
    ctx.fillText("PLAYER 2", canvas.width / 2, canvas.height / 3);
    ctx.fillText("WINS!", canvas.width / 2, canvas.height / 2 + 15);
  }
}

/**
 * plays 1 frame of the game.
 * appropriatly moves the ball a certain distance
 * clears and redraws the canvas elements
 * checks if the ball is touching a paddle or is out of bounds
 * waits 10 ms
 * runs again
 */
async function playGame() {
  let startTime = window.performance.now() / 1000;
  while (p1Score < 3 && p2Score < 3) {
    let dt = window.performance.now() / 1000 - startTime; // makes it in px per second
    let fps = Math.round(1 / dt);
    startTime = window.performance.now() / 1000;
    ball.x += ball.velocityX * dt;
    ball.y += ball.velocityY * dt;
    clearCanvas();
    drawElements();
    movePaddles(dt);
    checkTouchingPaddle();
    checkInBoundsY();
    checkInBoundsX();
    ctx.font = "30px Comic Sans MS";
    ctx.fillStyle = "yellow";
    ctx.textAlign = "left";
    ctx.fillText("fps " + fps, 10, 50);
    await sleep(1);
  }
  finishGame();
}

function movePaddles(dt) {
  if (keyBoard[38])
    //a up
    movePaddle(rightPaddle, -1, dt);
  if (keyBoard[40])
    //a down
    movePaddle(rightPaddle, +1, dt);
  if (keyBoard[87])
    //w
    movePaddle(leftPaddle, -1, dt);
  if (keyBoard[83])
    //s
    movePaddle(leftPaddle, +1, dt);
}
//calls another function to see if the ball is touching the paddle
//if it is then it changes the balls y velocity apporpriatley
function checkTouchingPaddle() {
  if (isBallTouchingPaddle(ball, rightPaddle, leftPaddle, rightPaddle)) {
    //right paddle
    ball.velocityY =
      ((ball.y - (rightPaddle.y + rightPaddle.height / 2)) /
        (rightPaddle.height / 2)) *
      (ball.velocityX / 1.5);
    playSound("bounce.mp3", 0.1);
    ball.velocityX *= -1;

    ++countBounces;
    if (countBounces % 5 == 0) {
      ball.velocityX -= 100;
      console.log("right");
    }
  } else if (isBallTouchingPaddle(ball, leftPaddle, leftPaddle, rightPaddle)) {
    //left paddle
    ball.velocityY =
      -(
        (ball.y - (leftPaddle.y + leftPaddle.height / 2)) /
        (leftPaddle.height / 2)
      ) *
      (ball.velocityX / 1.5);
    playSound("bounce.mp3", 0.1);
    ball.velocityX *= -1;

    ++countBounces;
    if (countBounces % 5 == 0) {
      ball.velocityX += 100;
      console.log("left");
    }
  }
}

/**
 * @param {pong ball} ball
 * makes sure the ball is still in bounds vertically
 * if not bounces it off the top or bottom
 */
function checkInBoundsY() {
  if (ball.y - ball.radius < 0 && ball.velocityY < 0) {
    //ball out of bound through the top
    ball.velocityY *= -1;
    playSound("bounce.mp3", 0.1);
  }

  if (ball.y + ball.radius > canvas.height && ball.velocityY > 0) {
    //ball out of bound through the bottom
    ball.velocityY *= -1;
    playSound("bounce.mp3", 0.1);
  }
}

//dry
/**
 * checks the ball is in bounds horizontally
 * if not replaces the ball in the center and send it in the opposite direction with 0 y velocity
 * and adds to the appropriate players score
 */
function checkInBoundsX() {
  if (
    ball.x - ball.radius < leftPaddle.x + leftPaddle.width &&
    ball.velocityX < 0
  ) {
    //left paddle
    ball.velocityX = 300;
    ball.velocityY = 0;
    countBounces = 0;
    ball.x = 400;
    ball.y = 250;
    ++p2Score;
    displayScore(2);
    playSound("score.mp3", 0.1);
  } else if (ball.x + ball.radius > rightPaddle.x && ball.velocityX > 0) {
    ball.velocityX = -300;
    ball.velocityY = 0;
    countBounces = 0;
    ball.x = 400;
    ball.y = 250;
    ++p1Score;
    displayScore(1);
    playSound("score.mp3", 0.1);
  }
}

function displayScore(player) {
  // param is 1 for player 1 and 2 for player 2
  ctx.font = "40px Impact";
  ctx.textAlign = "center";

  if (player == 1) {
    ctx.fillText(p1Score, canvas.width / 2 - 50, canvas.height / 8);
  } else {
    ctx.fillText(p2Score, canvas.width / 2 + 50, canvas.height / 8);
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawElements() {
  drawDashedLine([20, 10]);
  ball.draw();
  rightPaddle.draw();
  leftPaddle.draw();
  displayScore(1);
  displayScore(2);
}

function drawDashedLine(pattern) {
  ctx.strokeStyle = "#ffffff";
  ctx.beginPath();
  ctx.setLineDash(pattern);
  ctx.moveTo(canvas.width / 2, 0);
  ctx.lineTo(canvas.width / 2, canvas.height);
  ctx.lineWidth = 5;
  ctx.stroke();
  ctx.closePath();
}

/**
 * @param {the paddle being moves} paddle
 * @param {the direction the paddle is moving} direction
 */
function movePaddle(paddle, direction, dt) {
  //function needs to be worked on to be more precise
  if (direction == -1) {
    // up
    if (paddle.y == 0) {
      return;
    }
    if (paddle.y - paddle.velocityY * dt < 0) {
      paddle.y = 0;
      return;
    } else {
      paddle.y -= paddle.velocityY * dt;
    }
  } else if (direction == 1) {
    //down
    if (paddle.y == canvas.height) return;
    if (paddle.y + paddle.velocityY * dt + paddle.height > canvas.height) {
      paddle.y = canvas.height - paddle.height;
      return;
    } else {
      paddle.y += paddle.velocityY * dt;
    }
  }
}

/**
 * @param {pong ball} ball
 * @param {right paddles} rightPaddle
 * @param {left paddle} leftPaddle
 * How this function works
 * first part makes sure the y values of the ball are between the paddle that was passed to the function
 * the second part does the x, which compares the velocity to 0 to know what paddle it is heading towards.
 */
function isBallTouchingPaddle(ball, paddle, leftPaddle, rightPaddle) {
  let bMaxY = ball.y + ball.radius;
  let bMinY = ball.y - ball.radius;
  let bMaxX = ball.x + ball.radius;
  let bMinX = ball.x - ball.radius;

  if (paddle === leftPaddle) {
    if (ball.velocityX < 0) {
      // stops spazing
      if (bMaxY >= paddle.y && bMinY <= paddle.y + paddle.height) {
        if (bMinX <= paddle.x + paddle.width) {
          return true;
        }
      }
    }
  } else if (paddle === rightPaddle) {
    //probably dont need this condition but leaving it for now anyway
    if (ball.velocityX > 0) {
      // stops spazing
      if (bMaxY >= paddle.y && bMinY <= paddle.y + paddle.height) {
        if (bMaxX >= paddle.x) {
          return true;
        }
      }
    }
  }

  return false;
}

function playSound(file, volume) {
  let audio = new Audio(file);
  audio.volume = volume;
  audio.play();
}

/**
 * could add difficulties with an ai
 */
