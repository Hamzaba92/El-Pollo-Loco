class Cloud extends MovableObject {

    y = 50;
    x = 50;
    height = 250;
    width = 350;

    constructor(imagePath, x, y,){
        super().loadImage(imagePath);
        this.x = 200 + Math.random() * 500;
        this.animate();
        this.x = x;
        this.y = y;
    }

    /**
     * animate a moving to the left 
     */
    animate(){
        this.moveLeft();
    }

} 