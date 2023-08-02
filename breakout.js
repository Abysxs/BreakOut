// Game variables
const canvas = document.createElement("canvas");
const context = canvas.getContext("2d");
const width = 480;
const height = 320;
const paddleHeight = 10;
const paddleWidth = 75;
const ballRadius = 10;
let x = (width - paddleWidth) / 2;
let y = height - paddleHeight - ballRadius;
let dx = 2;
let dy = -2;
let paddleX = (width - paddleWidth) / 2;
let rightPressed = false;
let leftPressed = false;

// Set up the canvas
canvas.width = width;
canvas.height = height;
document.body.appendChild(canvas);

// Paddle movement event listeners
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

// Keydown event handler
function keyDownHandler(event) {
  if (event.keyCode === 39) {
    rightPressed = true;
  } else if (event.keyCode === 37) {
    leftPressed = true;
  }
}

// Keyup event handler
function keyUpHandler(event) {
  if (event.keyCode === 39) {
    rightPressed = false;
  } else if (event.keyCode === 37) {
    leftPressed = false;
  }
}

// Collision detection
function collisionDetection() {
  if (y + dy < ballRadius) {
    dy = -dy; // Reverse the vertical velocity if the ball hits the top
  } else if (y + dy > height - ballRadius) {
    // Check for collision with the bottom edge
    if (x > paddleX && x < paddleX + paddleWidth) {
      dy = -dy; // Reverse the vertical velocity if the ball hits the paddle
    } else {
      // Game over logic
      alert("Game over");
      document.location.reload();
    }
  }

  if (x + dx > width - ballRadius || x + dx < ballRadius) {
    dx = -dx; // Reverse the horizontal velocity if the ball hits the side walls
  }
}


// Game loop
function draw() {
  // Clear the canvas
  context.clearRect(0, 0, width, height);

  // Draw the paddle
  context.beginPath();
  context.rect(paddleX, height - paddleHeight, paddleWidth, paddleHeight);
  context.fillStyle = "#0095DD";
  context.fill();
  context.closePath();

  // Draw the ball
  context.beginPath();
  context.arc(x, y, ballRadius, 0, Math.PI * 2);
  context.fillStyle = "#0095DD";
  context.fill();
  context.closePath();

  // Move the paddle
  if (rightPressed && paddleX < width - paddleWidth) {
    paddleX += 7;
  } else if (leftPressed && paddleX > 0) {
    paddleX -= 7;
  }

  // Move the ball
  x += dx;
  y += dy;

  // Collision detection
  collisionDetection();

  // Request animation frame
  requestAnimationFrame(draw);
}

// Start the game loop
draw();
