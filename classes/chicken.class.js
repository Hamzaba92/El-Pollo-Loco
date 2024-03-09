class Chicken extends MovableObject {
    x = 120;
    y = 250;
    img;


    constructor() {
        super().loadImage('../img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        console.log('chicken wurden geladen')
    }


}