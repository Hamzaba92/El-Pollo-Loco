class Character extends MovableObject {

    x = 100;
    y = 205;
    height = 235;
    width = 130;
    img;
    speed = 15;


    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    world;

    currentImage = 0;
    WALKING_SOUND = new Audio('audio/walking_pepe.mp3');

    constructor() {
        super().loadImage('../img/2_character_pepe/1_idle/idle/I-2.png');
        this.loadImages(this.IMAGES_WALKING);
        this.animate();
    }

    animate() {

        setInterval(() => {
                this.WALKING_SOUND.pause();
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.x += this.speed;
                this.otherDirection = false;
                this.WALKING_SOUND.play();
            };

            if (this.world.keyboard.LEFT && this.x > 0) {
                this.x -= this.speed;
                this.otherDirection = true;
                this.WALKING_SOUND.play();
            };
            this.world.camera_x = -this.x + 100;

         }, 1000 / 60);


        setInterval(() => {

            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {

                let i = this.currentImage % this.IMAGES_WALKING.length;
                let path = this.IMAGES_WALKING[i];
                this.img = this.imageCache[path];
                this.currentImage++;
            };
        }, 70);
    }

}