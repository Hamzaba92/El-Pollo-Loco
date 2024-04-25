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

    /**
    * Simulates gravity by adjusting the position and speed of the object vertically.
    * If the object is above ground or moving upwards, it adjusts its position and speed accordingly.
    */
    applyGravity() {
        setGameInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.accelaration;
            }
        }, 1000 / 39);
    }

    /**
    * Handles the event of the object being hit.
    * Decreases the energy of the object if it's not above ground, and updates the last hit timestamp.
    */
    hit() {
        if (!this.isAboveGround()) {
            this.energy -= 10;
            if (this.energy < 0) {
                this.energy = 0;
            } else {
                this.lastHit = new Date().getTime();
            }
        }
    }

    /**
    * Checks if the object is dead based on its energy level.
    * @returns {boolean} True if the object's energy is zero, indicating death; otherwise, false.
    */
    isDead() {
        return this.energy == 0;
    }

    /**
    * Checks if the object has been hurt recently.
    * @returns {boolean} True if the object has been hurt within the last 0.4 seconds; otherwise, false.
    */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 0.4;
    }

    /**
    * Simulates the endboss being hit.
    * If the end boss has not been hit within the last 500 milliseconds,
    * reduces its energy by 20. If the energy becomes less than or equal to 0, sets it to 0.
    * Updates the last hit timestamp.
    */
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

    /**
    * Checks if the object is above the ground level.
    * @returns {boolean} True if the object is above the ground level; otherwise, false.
    */
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

    /**
    * Plays an animation by updating the object's image from a given array of image paths.
    * @param {Array} images - An array of image paths representing the frames of the animation.
    */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
    * Moves the object to the right by its speed.
    */
    moveRight() {
        this.x += this.speed;
        this.otherDirection = false;
    }

    /**
     * Moves the object to the left by its speed, with a set interval for smooth movement.
     */
    moveLeft() {
        setGameInterval(() => {
            this.x -= this.speed;
        }, 60);
    }

    /**
     * Initiates a jump by setting the vertical speed to a specified value and updating the idle time. 
     */
    jump() {
        this.speedY = 30;
        this.idleTime = new Date().getTime();
    }

    /**
    * Checks if the current object is colliding with another movable object.
    * @param {Object} mo - The movable object to check for collision with.
    * @returns {boolean} True if a collision is detected; otherwise, false.
    */
    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }

}