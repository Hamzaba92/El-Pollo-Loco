class MovableObject {
  
    img;

    

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    moveRight() {
        console.log('Caracter is moving right', this);
    }
}