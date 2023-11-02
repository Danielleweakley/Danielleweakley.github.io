
let rotationAngle1 = 0;
let rotationAngle2 = 0;

function setup() {
    createCanvas(800, 800);
    background(255);
}

function draw() {

    let wheelX1 = width / 4;
    let wheelX2 = (3 * width) / 4;
    let wheelY = height / 2;
    let wheelRadius = 100;
    let numSpokes = 12;


    rotationAngle1 += 0.02;
    rotationAngle2 += 0.02;

    //Left Wheel
    stroke(0, 0, 255);
    push();
    translate(wheelX1, wheelY);
    rotate(rotationAngle1);
    ellipse(0, 0, wheelRadius * 2);

    stroke(255, 0, 0);
    for (let i = 0; i < numSpokes; i++) {
        let angle = TWO_PI / numSpokes * i;
        let x1 = cos(angle) * wheelRadius;
        let y1 = sin(angle) * wheelRadius;
        let x2 = 0;
        let y2 = 0;
        line(x1, y1, x2, y2);
    }
    pop();

    //Right Wheel
    stroke(0, 0, 225);
    push();
    translate(wheelX2, wheelY);
    rotate(rotationAngle2);
    ellipse(0, 0, wheelRadius * 2);


    stroke(255, 0, 0);
    for (let i = 0; i < numSpokes; i++) {
        let angle = TWO_PI / numSpokes * i;
        let x1 = cos(angle) * wheelRadius;
        let y1 = sin(angle) * wheelRadius;
        let x2 = 0;
        let y2 = 0;
        line(x1, y1, x2, y2);
    }
    pop();

    //bike frame
    push();

    let angle = PI / 3;

    rectMode(CENTER)

    fill('black')
    stroke('black')

    rect(300, 200, 80, 20). //seat
        rect(310, 400, 240, 20)  // low bar
    rect(400, 245, 240, 20) // top bar
    rect(300, 300, 20, 200) // seat post
    rect(510, 220, 15, 40) // handle post
    circle(510, 195, 30) // handle

    translate(width / 2, height / 2);

    rotate(angle);
    rect(15, -175, 200, 20);

    pop();

    push();

    //back slant bar
    fill('black')
    stroke('black')

    let angle2 = PI / 2;

    rectMode(CENTER)

    translate(width / 2, height / 2);

    rotate(angle * 2);
    rect(15, 175, 200, 20);

    //front right slant bar
    rect(-100, -20, 200, 20);

    pop();
}