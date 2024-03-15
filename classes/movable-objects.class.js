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


    moveLeft() {
        setInterval(() => {
            this.x -= this.speed;
        }, 60);
    }



}