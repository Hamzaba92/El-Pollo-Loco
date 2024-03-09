class Character extends MovableObject {

    x = 100;
    y = 180;
    height = 150;
    width = 100;
    img;


    constructor() {
        super().loadImage('../img/2_character_pepe/1_idle/idle/I-2.png');
        console.log('pepe wurde geladen')
    }

}