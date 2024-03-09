class BackgroundObjects extends MovableObject {

    height = 100;
    width = 100;
    x = 100;
    y = 100;

    constructor(imagePath) {
        super().loadImage(imagePath);
    }
}