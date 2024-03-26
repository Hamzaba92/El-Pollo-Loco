class MovableObject extends DrawableObjects {


    speed = 0.15;

    otherDirection = false;
    speedY = 0;
    accelaration = 2;
    energy = 100;
    lastHit = 0;

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.accelaration;
            }
        }, 1000 / 39);
    }

    hit() {
        this.energy -= 2;
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

    isAboveGround() {
        if(this instanceof throwableObject){
            return true;
        }else{
        return this.y < 205;
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
        
    }


    isColliding(mo) {
        return this.x + this.width > mo.x &&
            this.y + this.height > mo.y &&
            this.x < mo.x &&
            this.y < mo.y + mo.height;
    }



}