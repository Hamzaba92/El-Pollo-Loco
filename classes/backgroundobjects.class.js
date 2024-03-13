class BackgroundObjects extends MovableObject {

    height = 480;
    width = 980;
    

    constructor(imagePath, x, y) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = y;
    }
}