class MovableObject {
    height = 50;
    width = 50;
    img;

    

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    moveRight() {
        
    }
}