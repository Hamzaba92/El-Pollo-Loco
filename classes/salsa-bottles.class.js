class SalsaBottles extends MovableObject {

    height = 70;
    width = 70;
    y = 368;
    moveSpeed = 0.5;
    moveDistance = 100;
    currentImageIndex = 0;
    character;

    offset = {
        top: 15,
        left: 58,
        right: 50,
        bottom: 10
    }

    IMAGE_SALSABOTTLES_ONGROUND = [
        './img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        './img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];

    constructor(x) {
        super().loadImage(this.IMAGE_SALSABOTTLES_ONGROUND[0]);
        this.loadImages(this.IMAGE_SALSABOTTLES_ONGROUND);
        this.x = x;
        this.bottlesRotate();
        
    }

    bottlesRotate() {
        setInterval(() => {
            this.playAnimation(this.IMAGE_SALSABOTTLES_ONGROUND)
        }, 400);
    }

}



