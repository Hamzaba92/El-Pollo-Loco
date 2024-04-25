class littleChickens extends Chicken {

    isDead = false;
    height = 55;
    width = 45;
    img;
    y = 377;
    deadChicken = false;

    offset = {
        top: 2,
        left: -3,
        right: -3,
        bottom: 1
    };

    LITTLE_CHICKENS = [
        './img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        './img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        './img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    LITTLE_CHICKENS_DEAD = [
        './img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];

    LITTLE_CHICKEN_HURT = new Audio('audio/little_chicken_hurt.mp3');

    constructor(x) {
        super().loadImage('./img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.LITTLE_CHICKENS);
        this.loadImages(this.LITTLE_CHICKENS_DEAD);
        this.x = x;
        this.speed = 0.05 + Math.random() * 0.10;
        this.animate();
    }

    /**
     * Orchestrates the animation of the chicken by calling appropriate animation functions.
     */
    animate() {
        this.moveChickenToLeft();
        this.playAliveChicken();
        this.playDeadChickenAnimation()
    }

    /**
     * Initiates the animation loop for the alive chicken.
     */
    playAliveChicken() {
        this.walkingIntervalLittleChicken = setGameInterval(() => {
            if (!this.deadChicken) {
                this.playAnimation(this.LITTLE_CHICKENS);
            }
        }, 200);
    }

    /**
     * Initiates the animation loop for the dead chicken.
     */
    playDeadChickenAnimation() {
        let chickenInterval = setGameInterval(() => {
            if (this.deadChicken) {
                this.speed = 0;
                clearInterval(this.walkingIntervalLittleChicken);
                this.LITTLE_CHICKEN_HURT.volume = 0.5;
                playAudio(LITTLE_CHICKEN_HURT);
                this.playAnimation(this.LITTLE_CHICKENS_DEAD);
                clearInterval(chickenInterval);
            }
        }, 250);
    }

    /**
     * Moves the chicken to the left.
     */
    moveChickenToLeft() {
        this.moveLeft();
    }












}