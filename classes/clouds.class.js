class Cloud extends MovableObject {

    y = 50;
    x = 50;
    height = 250;
    width = 350;
   

    constructor(){
        super().loadImage('../img/5_background/layers/4_clouds/1.png');
        this.x = 200 + Math.random() * 500;
        this.animate();
    }

    animate(){
        this.moveLeft();
    }

  


} 