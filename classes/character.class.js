class Character extends MovableObject {

    x = 100;
    y = 170;
    height = 235;
    width = 130;
    img;
    speed = 5.5;
    accaccelaration = 2;
    gravityEnd = 205;
    isJumping = false;
    hasJumped = false;

    offset = {
        top: 90,
        left: 15,
        right: 20,
        bottom: 2
    }

    IMAGES_WALKING = [
        './img/2_character_pepe/2_walk/W-21.png',
        './img/2_character_pepe/2_walk/W-22.png',
        './img/2_character_pepe/2_walk/W-23.png',
        './img/2_character_pepe/2_walk/W-24.png',
        './img/2_character_pepe/2_walk/W-25.png',
        './img/2_character_pepe/2_walk/W-26.png'
    ];

    IMAGES_JUMPING = [
        './img/2_character_pepe/3_jump/J-31.png',
        './img/2_character_pepe/3_jump/J-32.png',
        './img/2_character_pepe/3_jump/J-33.png',
        './img/2_character_pepe/3_jump/J-34.png',
        './img/2_character_pepe/3_jump/J-35.png',
        './img/2_character_pepe/3_jump/J-36.png',
        './img/2_character_pepe/3_jump/J-37.png',
        './img/2_character_pepe/3_jump/J-38.png',
        './img/2_character_pepe/3_jump/J-39.png'
    ];

    IMAGES_DEAD = [
        './img/2_character_pepe/5_dead/D-51.png',
        './img/2_character_pepe/5_dead/D-52.png',
        './img/2_character_pepe/5_dead/D-53.png',
        './img/2_character_pepe/5_dead/D-54.png',
        './img/2_character_pepe/5_dead/D-55.png',
        './img/2_character_pepe/5_dead/D-56.png',
        './img/2_character_pepe/5_dead/D-57.png'
    ];

    IMAGES_HURT = [
        './img/2_character_pepe/4_hurt/H-41.png',
        './img/2_character_pepe/4_hurt/H-42.png',
        './img/2_character_pepe/4_hurt/H-43.png'
    ];

    IMAGES_IDLE = [
        './img/2_character_pepe/1_idle/idle/I-1.png',
        './img/2_character_pepe/1_idle/idle/I-2.png',
        './img/2_character_pepe/1_idle/idle/I-3.png',
        './img/2_character_pepe/1_idle/idle/I-4.png',
        './img/2_character_pepe/1_idle/idle/I-5.png',
        './img/2_character_pepe/1_idle/idle/I-6.png',
        './img/2_character_pepe/1_idle/idle/I-7.png',
        './img/2_character_pepe/1_idle/idle/I-8.png',
        './img/2_character_pepe/1_idle/idle/I-9.png',
        './img/2_character_pepe/1_idle/idle/I-10.png'
    ];

    IMAGES_SLEEPING = [
        './img/2_character_pepe/1_idle/long_idle/I-11.png',
        './img/2_character_pepe/1_idle/long_idle/I-12.png',
        './img/2_character_pepe/1_idle/long_idle/I-13.png',
        './img/2_character_pepe/1_idle/long_idle/I-14.png',
        './img/2_character_pepe/1_idle/long_idle/I-15.png',
        './img/2_character_pepe/1_idle/long_idle/I-16.png',
        './img/2_character_pepe/1_idle/long_idle/I-17.png',
        './img/2_character_pepe/1_idle/long_idle/I-18.png',
        './img/2_character_pepe/1_idle/long_idle/I-19.png',
        './img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];

    world;
    idleTime = new Date().getTime();
    currentImage = 0;

    constructor() {
        super().loadImage('./img/2_character_pepe/1_idle/idle/I-2.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_SLEEPING);
        this.applyGravity();
        this.setupMovementControls();
        this.setupAnimationLoop();
    }

    setupMovementControls() {
        setInterval(() => {
            this.pauseAudio(WALKING_SOUND);
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.moveRight();
                playAudio(WALKING_SOUND);
            }
            if (this.world.keyboard.LEFT && this.x > 0) {
                this.x -= this.speed;
                this.otherDirection = true;
                playAudio(WALKING_SOUND);
            }
            if (this.world.keyboard.SPACE && !this.isAboveGround()) {
                this.jump();
                playAudio(JUMPING_SOUND);
            }
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);

    }

    setupAnimationLoop() {
        this.checkState();
    }
    
    checkState() {
        const currentTime = new Date().getTime();
        const timeSinceLastMove = currentTime - this.idleTime;
    
        if (this.isDead()) {
            this.handleDeadState();
        } else if (this.isHurt()) {
            this.handleHurtState();
        } else if (this.isAboveGround()) {
            this.handleJumpingState();
        } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
            this.handleWalkingState(currentTime);
        } else if (timeSinceLastMove > 5000) {
            this.handleIdleStates(currentTime);
        } else {
            this.handleDefaultIdleState();
        }
    }
    
    handleDeadState() {
        this.playAnimation(this.IMAGES_DEAD);
        this.pauseAudio(WALKING_SOUND);
        this.stopAllSounds();
        setTimeout(() => this.checkState(), 100); 
        gameOver();
    }
    
    handleHurtState() {
        this.playAnimation(this.IMAGES_HURT);
        playAudio(HURT_SOUND);
        setTimeout(() => this.checkState(), 220);   
    }
    
    handleJumpingState() {
        if (this.isAboveGround()) {
            this.playAnimation(this.IMAGES_JUMPING);
        }
        setTimeout(() => this.checkState(), 116);   
    }
    
    handleWalkingState(currentTime) {
        this.playAnimation(this.IMAGES_WALKING);
        this.idleTime = currentTime;
        setTimeout(() => this.checkState(), 82);  
    }
    
    handleIdleStates(currentTime) {
        if (this.world.keyboard.D) {
            this.playAnimation(this.IMAGES_IDLE);
            this.idleTime = currentTime;
        } else {
            this.playAnimation(this.IMAGES_SLEEPING);
            playAudio(SNORING_SOUND);
        }
        setTimeout(() => this.checkState(), 170); 
    }
    
    handleDefaultIdleState() {
        this.playAnimation(this.IMAGES_IDLE);
        setTimeout(() => this.checkState(), 145);    
        this.pauseAudio(SNORING_SOUND);
    }
    
    pauseAudio(audio) {
        if (!audio.paused) {
            audio.pause();
        }
    }

    playAudio(audio) {
        if (this.soundActive && this.audioEffectsActive) {
            if (audio.paused) {
                audio.play().catch(e => console.error("Fehler beim Abspielen des Sounds: ", e));
            }
        }
    }

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
            THROW_BOTTLE_SOUND
        ];

        allSounds.forEach(audio => {
            if (!audio.paused) {
                audio.pause();
            }
        });
    }

}
