class MovableObject extends DrawableObjects {


    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    accelaration = 2;
    energy = 100;
    lastHit = 0;
    offset;
    lastShoot;
    sleeping = true;
    gravityEnd;
    
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    }

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.accelaration;
            }
            
        }, 1000 / 39);
    }

    hit() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isDead() {
        return this.energy == 0;
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 0.4;
    }

    endbossHit() {
        let currentTime = new Date().getTime();
        let timePassed = currentTime - this.lastHit; 
        if (timePassed >= 500) { 
            this.endbossEnergy -= 20;
            if (this.endbossEnergy <= 0) {
                this.endbossEnergy = 0;
            }
            this.lastHit = currentTime; 
        }
    }

  
    isAboveGround() {
        if (this instanceof throwableObject) {
            return true;
        } else if (this.y < 205) {
            return true;
        } else {
            if (this.y > this.gravityEnd) {
                this.y = this.gravityEnd;
            }
            return this.y < this.gravityEnd;
        }
    }
    
   
 


    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }



    moveRight() {
        this.x += this.speed;
        this.otherDirection = false;
    }


    moveLeft() {
        setInterval(() => {
            this.x -= this.speed;
        }, 60);
    }


    jump() {
        this.speedY = 30;
        this.idleTime = new Date().getTime();
    }


    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }


}