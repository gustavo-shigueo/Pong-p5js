function paddle(isLeft) {

    this.speed = 10;
    this.h = 100;
    this.w = 10;
    this.y = height / 2 + 2 * this.h;
    this.ytop = (this.y - this.h) / 2;
    this.ybottom = (this.y + this.h) / 2;
    this.dir = 0;

    this.x = isLeft ? 10 : width - this.w;
    this.xhit = isLeft ? this.x + this.w : this.x;

    this.xShow = this.x - this.w / 2;

    this.show = function () {
        rect(this.xShow, this.ytop, this.w, this.h);
    }

    this.update = function () {
        this.y += this.speed * this.dir;
        this.ytop = (this.y - this.h) / 2;
        this.ybottom = (this.y + this.h) / 2;
        if (this.ybottom > height - 5 || this.ytop < 5) this.dir = 0;
    }

}