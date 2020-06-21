var edge = true;
var frames = 0;
var digits = 1;
var pause = false;
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

        puck.future();
        if (puck.futurey + puck.r < right.ytop && right.ytop > 5) {
            right.dir = -1;
        } else if (puck.futurey - puck.r > right.ybottom && right.ybottom <= height - 5) {
            right.dir = 1;
        } else {
            right.dir = 0;
        }

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
    while(Math.floor(rightScore / Math.pow(10,  digits)) >= 1){
        digits++;
    }
    textSize(32);
    text(leftScore, 20, 40);
    text(rightScore, width - 20 - (digits * 16), 40);

}

function keyPressed() {
    if ((key == 'w' || key == 'W' || keyCode === UP_ARROW) && left.ytop > 5) {
        left.dir = -1;
    } else if ((key == 's' || key == 'S' || keyCode === DOWN_ARROW) && left.ybottom <= height - 5) {
        left.dir = 1;
    } else if (keyCode === ESCAPE){
        pause ? loop() : noLoop();
        pause = !pause;
    }
}

function keyReleased() {
    if (key == 'w' || key == 'W' || key == 's' || key == 'S' || keyCode === UP_ARROW || keyCode === DOWN_ARROW) {
        left.dir = 0;
    }
}
