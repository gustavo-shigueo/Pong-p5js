function Future(p) {

    this.xcurrent = puck.x + puck.r;
    this.ycurrent = puck.y;
    
    this.yspeedcurrent;
    
    this.yfuture;
    this.update = function() {
        
        if(puck.xpeed > 0 && !futureEval) {

            futureEval = true;
            this.framecount = 0;
            this.xpeed = puck.xpeed;
            while(this.x + this.framecount * puck.xspeed < right.xShow){
            
                this.framecount++;
            
            }
            for(i = 0; i < this.framecount; i++){

                this.ycurrent += this.yspeedcurrent;
                if(this.ycurrent >= height - puck.r || this.ycurrent <= puck.r){
                    this.yspeedcurrent *= -1;
                }

            }
            this.yfuture = this.ycurrent;
            return this.yfuture;

        } else{

            return (height / 2);

        }
        
    }

}