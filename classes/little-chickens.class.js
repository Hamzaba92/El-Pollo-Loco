class littleChickens extends Chicken {

    isDead = false;
    height = 55;
    width = 45;
    img;
    y = 377;
    deadChicken = false;

    offset = {
        top: -5,
        left: -15,
        right: -15,
        bottom: 0
    };

    LITTLE_CHICKENS = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    LITTLE_CHICKENS_DEAD = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];

    LITTLE_CHICKEN_HURT = new Audio('audio/little_chicken_hurt.mp3');

    constructor(x) {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.LITTLE_CHICKENS);
        this.loadImages(this.LITTLE_CHICKENS_DEAD);
        this.x = x;
        this.speed = 0.05 + Math.random() * 0.10;
        this.animate();

    }

    animate() {
        this.moveChickenToLeft();
        this.playAliveChicken();
        this.playDeadChickenAnimation()
    }

    playAliveChicken() {
        this.walkingIntervalLittleChicken = setInterval(() => {
            if (!this.deadChicken) {
                this.playAnimation(this.LITTLE_CHICKENS);
            }
        }, 200);
    }

    playDeadChickenAnimation() {
        let chickenInterval = setInterval(() => {
            if (this.deadChicken) {
                this.speed = 0;
                clearInterval(this.walkingIntervalLittleChicken);
                this.LITTLE_CHICKEN_HURT.play();
                this.playAnimation(this.LITTLE_CHICKENS_DEAD);
                clearInterval(chickenInterval);
            }
        }, 250);
    }



    moveChickenToLeft() {
        this.moveLeft();
    }












}