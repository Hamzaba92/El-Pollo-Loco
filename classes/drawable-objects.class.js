class DrawableObjects {
    img;
    imageCache = {};
    currentImage = 0;
    height = 50;
    width = 50;
    

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;

    }

    loadImages(iterieren) {
        iterieren.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    drawFrame(ctx) {

        if (this instanceof Character || this instanceof Chicken || this instanceof littleChickens || this instanceof Coins || this instanceof SalsaBottles || this instanceof throwableObject || this instanceof Endboss) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'transparent';
            ctx.rect(this.x + this.offset.left, this.y + this.offset.top,this.width -this.offset.right - this.offset.left , this.height - this.offset.bottom -this.offset.top);
            ctx.stroke();
        }
    };
    



}