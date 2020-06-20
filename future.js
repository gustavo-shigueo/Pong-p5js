function Future() {
    
    this.update = function() {
        
        if(puck.xspeed > 0){// && !futureEval) {
            
            this.xcurrent = puck.x + puck.r;
            this.xpeed = puck.xspeed;
            this.yfuture = null;
            futureEval = true;
            this.ycurrent = puck.y;
            this.framecount = 0;
            this.xpeed = puck.xpeed;
            this.yspeedcurrent = puck.yspeed;
            while(this.x + this.framecount * this.xspeed < right.xShow){
            
                this.framecount++;
            
            }
            for(i = 0; i < this.framecount; i++){

                this.ycurrent += this.yspeedcurrent;
                if((this.ycurrent <= puck.r && this.yspeedcurrent < 0) || (this.ycurrent >= height - puck.r && this.yspeedcurrent > 0)){
                    this.yspeedcurrent *= -1;
                }

            }
            this.yfuture = this.ycurrent;
            return this.yfuture;

        } else{

            return futurePos;

        }
        
    }

}