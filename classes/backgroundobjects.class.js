class BackgroundObjects extends MovableObject {

    height = 480;
    width = 980;
    x = 0;
    y = 0;

    constructor(imagePath) {
        super().loadImage(imagePath);
    }
}