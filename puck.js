function puck() {

    this.r = 10;
    this.velocity = 10;

    this.reset = function () {
        this.x = Math.floor(width / 2);
        this.y = Math.floor(height / 2);

        this.range = PI / 8;
        this.angle = random(-this.range, this.range);

        this.xspeed = this.velocity * Math.cos(this.angle);
        this.yspeed = this.velocity * Math.sin(this.angle);

        this.l = (random(1) > 0.5);
        if(this.l) this.xspeed *= -1;
    }

    this.update = function () {
        this.x += this.xspeed;
        this.y += this.yspeed;
        this.ytop = (this.y - this.r) + this.yspeed;
        this.ybottom = (this.y + this.r) + this.yspeed;
    }

    this.show = function () {
        fill(255);
        circle(this.x, this.y, this.r);
    }

    this.edges = function () {
        if ((this.y <= this.r && this.yspeed < 0) || (this.y >= height - this.r && this.yspeed > 0))
            this.yspeed *= -1;
        if (this.x < this.r || this.x > width) edge = true;
        if (this.x < this.r) rightScore++;
        if (this.x > width) leftScore++;
        if (edge) this.reset();
    }

    this.checkPaddle = function (p, isLeft) {
        this.testytop = this.y - this.r < p.ybottom;
        this.testybottom = this.y + this.r > p.ytop;

        this.diff = this.y - p.ytop;
        this.rad = 45 * PI / 180;
        this.hitAngle = map(this.diff, 0, p.h, -this.rad, this.rad);
        if (isLeft && this.l) {
            this.testx = this.x - this.r <= p.xhit;
            if (this.testx && this.testybottom && this.testytop) {
                this.l = false;
                this.xspeed = this.velocity * cos(this.hitAngle);
                this.yspeed = this.velocity * sin(this.hitAngle);
            }
        } else if (!isLeft && !this.l) {
            this.testx = this.x + this.r >= p.xShow;
            if (this.testx && this.testybottom && this.testytop) {
                this.l = true;
                this.xspeed = -this.velocity * cos(this.hitAngle);
                this.yspeed = this.velocity * sin(this.hitAngle);
            }
        }
    }

    this.future = function() {

        if(this.xspeed > 0){
            this.framecount = 0;
            while(this.x + this.xspeed * this.framecount < right.xShow) this.framecount++;
            this.futurey = this.y;
            this.yspeedcopy = this.yspeed;
            for(i = 0; i < this.framecount; i++){
                this.futurey += this.yspeedcopy;
                if ((this.futurey <= this.r && this.yspeedcopy < 0) || (this.futurey >= height - this.r && this.yspeedcopy > 0))
                    this.yspeedcopy *= -1;
            }
        } else{
            this.times = (right.ybottom < height / 2 + right.h / 2) ? 1 : -1;
            this.futurey = height / 2 + ((this.times * right.h) / 2);
        }
    }
}