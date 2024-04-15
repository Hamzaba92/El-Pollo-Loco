class Chicken extends MovableObject {

    y = 355;
    height = 80;
    width = 65;
    img;
    deadChicken = false;

    offset = {
        top: 1,
        left: 2,
        right: 2,
        bottom: 3
    }

    MIDDLE_CHICKEN_HURT = new Audio('audio/middle_chicken_hurt.mp3');

    IMAGES_WALKING = [
        './img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        './img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        './img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    IMAGES_DEAD_MIDDLE_CHICKEN = [
        './img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];

    currentImage = 0;



    constructor(x) {
        super().loadImage('./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD_MIDDLE_CHICKEN);
        this.x = x;
        this.animate();
        this.speed = 0.15 + Math.random() * 0.7;
    }

    animate() {
        this.moveLeft();

        this.walkingInterval = setInterval(() => {
            if (!this.deadChicken) {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 200);

        this.middleChickenDied();
    }


    middleChickenDied() {
        let chickenInterval = setInterval(() => {
            if (this.deadChicken) {
                this.speed = 0;
                clearInterval(this.walkingInterval);
                this.MIDDLE_CHICKEN_HURT.play();
                this.playAnimation(this.IMAGES_DEAD_MIDDLE_CHICKEN);
                clearInterval(chickenInterval);
            }
        }, 180);
    }





}