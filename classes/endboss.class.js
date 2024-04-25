class Endboss extends MovableObject {

    y = 15;
    height = 450;
    width = 240;
    x = 3800;
    endbossArea = false;
    endbossDead = false;
    alertInterval;
    checkEndbossAreaInterval;
    walkingAndJumpingInterval;
    gravityEnd = 100;
    endbossEnergy = 100;
    speedX = 0;

    offset = {
        top: 55,
        left: 0,
        right: 0,
        bottom: 10
    };

    IMAGES_IDLE = [
        './img/4_enemie_boss_chicken/2_alert/G5.png',
        './img/4_enemie_boss_chicken/2_alert/G6.png',
        './img/4_enemie_boss_chicken/2_alert/G7.png',
        './img/4_enemie_boss_chicken/2_alert/G8.png',
        './img/4_enemie_boss_chicken/2_alert/G9.png',
        './img/4_enemie_boss_chicken/2_alert/G10.png',
        './img/4_enemie_boss_chicken/2_alert/G11.png',
        './img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    IMAGES_WALK = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    IMAGES_ATTACK = [
        './img/4_enemie_boss_chicken/3_attack/G13.png',
        './img/4_enemie_boss_chicken/3_attack/G14.png',
        './img/4_enemie_boss_chicken/3_attack/G15.png',
        './img/4_enemie_boss_chicken/3_attack/G16.png',
        './img/4_enemie_boss_chicken/3_attack/G17.png',
        './img/4_enemie_boss_chicken/3_attack/G18.png',
        './img/4_enemie_boss_chicken/3_attack/G19.png',
        './img/4_enemie_boss_chicken/3_attack/G20.png'
    ];

    IMAGES_HURT = [
        './img/4_enemie_boss_chicken/4_hurt/G21.png',
        './img/4_enemie_boss_chicken/4_hurt/G22.png',
        './img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    IMAGES_DEATH = [
        './img/4_enemie_boss_chicken/5_dead/G24.png',
        './img/4_enemie_boss_chicken/5_dead/G25.png',
        './img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    constructor() {
        super().loadImage(this.IMAGES_IDLE[0]);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_WALK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEATH);
        this.x = 4250;
        this.idleTime = null;
        this.moveLeftInterval = null;
        this.isAboveGround = true;
    }

    /**
    * Initiates an alert animation loop for the endboss.
    * Stops the animation loop when entering the endboss area.
    */
    alert() {
        this.alertInterval = setGameInterval(() => {
            this.playAnimation(this.IMAGES_WALK);
        }, 600);

        this.checkEndbossAreaInterval = setGameInterval(() => {
            if (this.endbossArea) {
                clearInterval(this.alertInterval);
                clearInterval(this.checkEndbossAreaInterval);
                clearInterval(this.idleTime);
            }
        }, 300);
    }

    /**
    * Initiates the end animation sequence for the character based on game state.
    * Moves the character towards the endboss if it's alive and not in the endboss area,
    * otherwise, initiates the walking and jumping animation.
    */
    animateEnd() {
        if (!this.endbossDead) {
            if (!this.endbossArea) {
                this.moveLeftEndboss();
            } else {
                this.walkingAndJumping();
            }
        } else {
            this.dead();
        }
    }

    /**
    * Initiates the walking and jumping animation sequence for the endboss character.
    * Moves the endboss character left, adjusts its moving speed, and clears the idle time.
    */
    walkingAndJumping() {
        this.moveLeftEndboss();
        this.movingSpeedEndboss();
        clearInterval(this.idleTime);
        this.idleTime = null;
    }

    /**
     * Moves the endboss character to the left at a constant interval, triggering a walking animation. 
     */
    moveLeftEndboss() {
        if (this.moveLeftInterval === null) {
            this.moveLeftInterval = setInterval(() => {
                this.x -= 42;
                this.playAnimation(this.IMAGES_WALK);
            }, 380);
        }
    }

    /**
     * Sets the moving speed of the endboss character and resets it after a specified time. 
     */
    movingSpeedEndboss() {
        this.speedX = 30;
        setTimeout(() => {
            this.speedX = 0;
        }, 1000);
    }

    /**
    * Initiates the death sequence for the endboss character.
    * Sets the endboss character as dead, stops its movement, cleans up intervals,
    * plays the death animation, and schedules the display of the last dead image.
    */
    dead() {
        this.endbossDead = true;
        this.speed = 0;
        this.cleanUpIntervalls();
        this.playAnimation(this.IMAGES_DEATH);
        setGameTimeout(() => {
            this.showLastDeadImage();
        }, 550);

    }

    /**
    * Displays the last frame of the death animation.
    * Loads and displays the last dead image, then schedules the end of the game.
    */
    showLastDeadImage() {
        const lastDeadImage = this.IMAGES_DEATH[this.IMAGES_DEATH.length - 1];
        this.loadImage(lastDeadImage);
        setGameTimeout(() => {
            this.gameEnd();
        }, 550);
    }

    /**
    * Initiates the end of the game.
    * Stops all sounds, triggers the game over function, and cleans up intervals.
    */
    gameEnd() {
        this.stopAllSounds();
        gameOver();
        this.cleanUpIntervalls();
    }

    /**
    * Cleans up all active intervals used in the game.
    * Clears intervals related to alert animations, endboss area checks, endboss movement,
    * and idle time tracking.
    */
    cleanUpIntervalls() {
        clearInterval(this.alertInterval);
        clearInterval(this.checkEndbossAreaInterval);
        clearInterval(this.moveLeftInterval);
        clearInterval(this.idleTime);
    }

    /**
    * Stops playback of all active sounds used in the game.
    * Pauses all sounds in the game's audio library to ensure silence.
    */
    stopAllSounds() {
        const allSounds = [
            BACKGROUND_SOUND,
            COLLECTED_BOTTLE,
            COLLECTED_COIN,
            WALKING_SOUND,
            JUMPING_SOUND,
            HURT_SOUND,
            MIDDLE_CHICKEN_HURT,
            LITTLE_CHICKEN_HURT,
            ENDBOSS_GETS_HURT_LONG_CROW,
            ENDBOSS_GETS_HURT,
            BOTTLE_BREAKS,
            THROW_BOTTLE_SOUND,
            SNORING_SOUND
        ];

        allSounds.forEach(audio => {
            if (!audio.paused) {
                audio.pause();
            }
        });
    }




}

