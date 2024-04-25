class DrawableObjects {
    img;
    imageCache = {};
    currentImage = 0;
    height = 50;
    width = 50;
    
    /**
    * Loads an image from the given path.
    * @param {string} path - The path to the image file.
    */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
    * Plays an animation using the provided array of image paths.
    * @param {Array} images - An array of image paths representing the frames of the animation.
    */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;

    }

    /**
    * Loads multiple images into the image cache.
    * @param {Array} iterieren - An array of image paths to load into the cache.
    */
    loadImages(iterieren) {
        iterieren.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    /**
    * Draws a frame for certain game objects on the canvas context.
    * @param {CanvasRenderingContext2D} ctx - The canvas context on which to draw the frame.
    */
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