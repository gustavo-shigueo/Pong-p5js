let edge = true;
let frames = 0;
let digits = 1;
let pause = false;
function setup() {

    createCanvas(800, 450);
    puck = new puck();
    left = new paddle(true);
    right = new paddle(false);
    leftScore = 0;
    rightScore = 0;
    puck.reset();
    frameRate(60);

}

function draw() {

    background(0);
    fill(255);
    stroke(255);
    strokeWeight(2);
    line(width / 2 - 1, 0, width / 2 - 1, height);
    noStroke();
    left.show();
    right.show();
    if (!edge) {

        const goingUP = ((keyIsDown(UP_ARROW) || keyIsDown('W') || keyIsDown('w')) && left.ytop > 5);
        const goingDOWN = ((keyIsDown(DOWN_ARROW) || keyIsDown('S') || keyIsDown('s')) && left.ybottom <= height - 5);
        const stopped = !(goingUP || goingDOWN);
        if (goingUP) left.dir = -1;
        if (goingDOWN) left.dir = 1;
        if (stopped) left.dir = 0;
        
        puck.future();
        if (puck.futurey + puck.r < right.ytop && right.ytop > 5) right.dir = -1;
        else if (puck.futurey - puck.r > right.ybottom && right.ybottom <= height - 5) right.dir = 1;
        else right.dir = 0;

        left.update();
        right.update();

        puck.show();
        puck.update();

        puck.checkPaddle(left, true);
        puck.checkPaddle(right, false);

        puck.edges();

    } else{
        
        frames++;
        background(0);
        stroke(255);
        strokeWeight(2);
        line(width / 2 - 1, 0, width / 2 - 1, height);
        noStroke();
        puck.x = width / 2;
        puck.y = height / 2;
        left.y = height / 2 + 2 * left.h;
        right.y = height / 2 + 2 * right.h;
        left.show();
        right.show();
        puck.show();
        if(frames < 3) {   
            left.update();
            right.update();
        }
        if(frames > 90){
            edge = false;
            frames = 0;
        }

    }
    while(Math.floor(rightScore / Math.pow(10,  digits)) >= 1) digits++;
    textSize(32);
    text(leftScore, 20, 40);
    text(rightScore, width - 20 - (digits * 16), 40);
    
}

function keyPressed() {
    if (keyCode === ESCAPE){
        pause = !pause;
        pause ? noLoop() : loop();
    }
}