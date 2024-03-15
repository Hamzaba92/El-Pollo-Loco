class MovableObject {
    height = 50;
    width = 50;
    img;
    imageCache = {};
    speed = 0.15;
    currentImage = 0;
    otherDirection = false;
    speedY = 0;
    accelaration = 1;
    energy = 100;

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.accelaration;
            }
        }, 1000 / 60);
    }

    isAboveGround() {
        return this.y < 205;
    }

    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }


    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(iterieren) {
        iterieren.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
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
        this.speedY = 18;
    }


    isColliding(mo) {
        return this.x + this.width > mo.x &&
            this.y + this.height > mo.y &&
            this.x < mo.x &&
            this.y < mo.y + mo.height;
    }



}