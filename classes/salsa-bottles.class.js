class SalsaBottles extends MovableObject {

    height = 70;
    width = 70;
    y = 368;
    moveSpeed = 0.5;
    moveDirection = 1;
    moveDistance = 100;
    currentImageIndex = 0;


    IMAGE_SALSABOTTLES_ONGROUND = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];



    constructor(x) {
        super().loadImage(this.IMAGE_SALSABOTTLES_ONGROUND[0]);
        this.loadImages(this.IMAGE_SALSABOTTLES_ONGROUND);
        this.x = x;
        this.bottlesRotate();

    }



    bottlesRotate() {

        setInterval(() => {
            this.currentImageIndex = (this.currentImageIndex + 1) % this.IMAGE_SALSABOTTLES_ONGROUND.length;
            this.loadImage(this.IMAGE_SALSABOTTLES_ONGROUND[this.currentImageIndex]);
        }, 300);

    }


}



