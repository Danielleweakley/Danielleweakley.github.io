let clickX = 0;
let clickY = 0;
let endX = 0;
let endY = 0;
const CIRCLE = 0;
const SQUARE = 1;
const CUSTOM = 2;
const PARTICLE = 3;
let curMode = CIRCLE;
let shapes = [];
let points = [];
let particles = [];
let gravity;

function setup() {
    createCanvas(500, 600);
    gravity = createVector(0, 0.05);
    rectMode(CENTER);

    button = createButton('circle');
    button.position(0, 0);
    button.mousePressed(setCircleMode);

    button = createButton('square');
    button.position(50, 0);
    button.mousePressed(setSquareMode);

    button = createButton('custom');
    button.position(110, 0);
    button.mousePressed(setCustomMode);

    button = createButton('particle');
    button.position(175, 0);
    button.mousePressed(setParticleMode);
}

function setCircleMode() {
    curMode = CIRCLE;
}

function setSquareMode() {
    curMode = SQUARE;
}

function setCustomMode() {
    curMode = CUSTOM;
    points = [];
    //if i dont clear my points array it makes wonky shapes
}

function setParticleMode() {
    curMode = PARTICLE;
}


    function draw() {
        background(255);
        stroke("black");
        noStroke();
        rect(20, 20, width, 40);
        text(`clickX: ${clickX.toFixed(2)}, clickY: ${clickY.toFixed(2)}`, 20, 20);
        text(`endX: ${endX.toFixed(2)}, endY: ${endY.toFixed(2)}`, 20, 40);

        for (let i = particles.length - 1; i >= 0; i--) {
            let p = particles[i];
            p.update();
            p.display();

            if (p.isDead()) {
                particles.splice(i, 1);
            }
        }

        for (let i = 0; i < shapes.length; i++) {
            stroke("black");
            let sh = shapes[i];
            if (sh.shape === SQUARE) {
                square(sh.x, sh.y, 2 * dist(sh.x, sh.y, sh.ex, sh.ey));
            } else if (sh.shape === CIRCLE) {
                circle(sh.x, sh.y, 2 * dist(sh.x, sh.y, sh.ex, sh.ey));
            }
        }

        if (curMode === CUSTOM) {
            noFill();
            stroke("black");
            beginShape();
            for (let point of points) {
                vertex(point.x, point.y);
            }
            endShape(CLOSE);
        }

        if (mouseIsPressed) {
            if (curMode === SQUARE) {
                square(clickX, clickY, 2 * dist(clickX, clickY, mouseX, mouseY));
            }
            else if (curMode === CIRCLE) {
                circle(clickX, clickY, 2 * dist(clickX, clickY, mouseX, mouseY));
            }
            else if (curMode === CUSTOM) {
                let newPoint = createVector(mouseX, mouseY);
                points.push(newPoint);

                if (points.length >= 2) {
                    let lastPoint = points[points.length - 2];
                    line(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y);
                }
            }
            else if (curMode === PARTICLE) {
                if (particles.length < 30) {
                    let p = new Particle(mouseX, mouseY);
                    particles.push(p);
                }
            }
        }
    }

    function mousePressed() {
        clickX = mouseX;
        clickY = mouseY;
        stroke("black");
        circle(clickX, clickY, 20);
    }

    function mouseReleased() {
        endX = mouseX;
        endY = mouseY;
        stroke("red");
        circle(endX, endY, 20);
        line(clickX, clickY, endX, endY);
        shapes.push({ x: clickX, y: clickY, ex: endX, ey: endY, shape: curMode });
    }

    class Particle {
        constructor(x, y) {
            this.position = createVector(x, y);
            this.velocity = createVector(random(-1, 1), random(-3, -1));
            this.color = color('red');
            this.lifespan = 255;
        }

        update() {
            this.velocity.add(gravity);
            this.position.add(this.velocity);
            this.lifespan -= 2;
        }

        display() {
            fill(this.color);
            noStroke();
            ellipse(this.position.x, this.position.y, 10, 10);
        }

        isDead() {
            return this.lifespan <= 0;
        }
    }
    