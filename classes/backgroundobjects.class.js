class BackgroundObjects extends MovableObject {

    height = 280;
    width = 980;
    x = 0;
    y = 200;

    constructor(imagePath) {
        super().loadImage(imagePath);
    }
}