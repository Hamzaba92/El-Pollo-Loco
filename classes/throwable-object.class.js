class throwableObject extends MovableObject{




    constructor(x, y){
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.x = x;
        this.y = y;
        this.width = 65;
        this.height = 75;
        this.throw(90, 100);
        
    }

    throw(){
      
        this.speedY = 30;
        this.applyGravity();
        setInterval(()=>{
            this.x += 10;
        }, 25);
    }
}