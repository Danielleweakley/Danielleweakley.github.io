let car;
let obstacles = [];
let score = 0;
let gameOver = false;
let obstacleSpacing = 40;
let gameState = 'start';

function setup() {
  createCanvas(600, 500);
  car = new Car();
}

function draw() {
  background('grey');

  if (gameState === 'start') {
    showStartScreen();
  } else if (gameState === 'playing') {
    playGame();
  } else if (gameState === 'gameOver') {
    showGameOver();
  }
}

function keyPressed() {
  if (gameState === 'start' || gameState === 'gameOver') {
    startGame();
  } else if (gameState === 'playing') {
    if (keyCode === UP_ARROW) {
      car.moveUp();
    } else if (keyCode === DOWN_ARROW) {
      car.moveDown();
    }
  }
}

function keyReleased() {
  car.stopMovement();
}

function showStartScreen() {
  fill(0);
  textSize(64);
  textAlign(CENTER, CENTER);
  text('Car Game', width / 2, height / 2 - 50);
  textSize(32);
  text('Press any key to start', width / 2, height / 2 + 50);
}

function startGame() {
  gameState = 'playing';
  resetGame();
}

function playGame() {
  for (let i = obstacles.length - 1; i >= 0; i--) {
    obstacles[i].show();
    obstacles[i].update();

    if (obstacles[i].hits(car)) {
      console.log('HIT');
      gameState = 'gameOver';
    }

    if (obstacles[i].offscreen()) {
      obstacles.splice(i, 1);
      score++;
    }
  }

  car.update();
  car.show();

  if (frameCount % obstacleSpacing === 0) {
    obstacles.push(new Obstacle());
  }

  showScore();
}

function showGameOver() {
  fill(255, 0, 0);
  textSize(64);
  textAlign(CENTER, CENTER);
  text('Game Over', width / 2, height / 2);
  textSize(32);
  text('Press any key to try again', width / 2, height / 2 + 50);
}

function showScore() {
  fill(0);
  textSize(32);
  text('Score: ' + score, 500, 30);
}

function resetGame() {
  car = new Car();
  obstacles = [];
  score = 0;
  gameOver = false;
}

class Car {
  constructor() {
    this.y = height / 2;
    this.x = 64;
    this.speed = 5;
    this.maxSpeed = 20;
    this.height = 20;
    this.upPressed = false;
    this.downPressed = false;
  }


  show() {
    fill('black');
    rect(this.x + 5, this.y + 18, 10, 5); 
    rect(this.x + 25, this.y + 18, 10, 5);
    rect(this.x + 5, this.y + -3, 10, 5); 
    rect(this.x + 25, this.y + -3, 10, 5); 
  
    fill('red');
    rect(this.x, this.y, 40, this.height);
    
    fill('skyblue');
    rect(this.x + 7, this.y + 0, 6, 20); 
    rect(this.x + 27, this.y + 0, 6, 20);
  }

  moveUp() {
    this.upPressed = true;
  }

  moveDown() {
    this.downPressed = true;
  }

  stopMovement() {
    this.upPressed = false;
    this.downPressed = false;
  }

  update() {
    if (!gameOver) {
      if (this.upPressed) {
        this.y -= this.speed;
        this.speed = min(this.speed + 0.2, this.maxSpeed);
      } else if (this.downPressed) {
        this.y += this.speed;
        this.speed = min(this.speed + 0.2, this.maxSpeed);
      } else {
        this.speed = 5;
      }

      this.y = constrain(this.y, 0, height - this.height);
    }
  }
}

class Obstacle {
  constructor() {
    this.top = random(height / 2);
    this.bottom = random(height / 2);
    this.x = width;
    this.w = 30;
    this.speed = 5;
  }

  show() {
    fill('blue');
    rect(this.x, 0, this.w, this.top);
    rect(this.x, height - this.bottom, this.w, this.bottom);
  }

  update() {
    if (!gameOver) {
      this.x -= this.speed;
    }
  }

  offscreen() {
    return this.x < -this.w;
  }

  hits(car) {
    if (car.y < this.top || car.y > height - this.bottom) {
      if (car.x > this.x && car.x < this.x + this.w) {
        return true;
      }
    }
    return false;
  }
}
