class throwableObject extends MovableObject {

    character;
    isBreaking = false;
    isShooted = false;
    deletable = false;
    
    SALSA_BOTTLES_IN_THE_AIR = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];
    
    IMAGES_BOTTLE_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];

    offset = {
        top: 20,
        left: 52,
        right: 52,
        bottom: 20
    };

    constructor(x, y, direction) {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.SALSA_BOTTLES_IN_THE_AIR);
        this.loadImages(this.IMAGES_BOTTLE_SPLASH);
        this.x = x;
        this.y = y;
        this.width = 65;
        this.height = 75;
        this.otherDirection = direction;
        this.throw();
        this.throwedBottleInTheAir();
    }

    THROW_BOTTLE_SOUND = new Audio('audio/throw_bottle.mp3');
    BOTTLE_BREAKS = new Audio('audio/breaking_bottle.mp3');

    throw() {
        this.speedY = 27;
        this.applyGravity();
        this.THROW_BOTTLE_SOUND.play();
        setInterval(() => {
            this.x += 10;
        }, 25);


        let moveInterval = setInterval(() => {
            if (this.otherDirection) {
                this.x += -40;
                if (this.deletable) {
                    clearInterval(moveInterval);
                }
            }
        }, 50);
        
    }


    breakAndSplash() {
        this.isBreaking = true;
        this.playAnimation(this.IMAGES_BOTTLE_SPLASH); 
        this.BOTTLE_BREAKS.play();
        this.speedY = 6.5;
    }

    animationFinished() {
        if (this.IMAGES_BOTTLE_SPLASH && this.IMAGES_BOTTLE_SPLASH.length > 0) {
            return this.currentImageIndex === this.IMAGES_BOTTLE_SPLASH.length - 1;
        }
        return false;
    }


    throwedBottleInTheAir() {
       let resetAnimation = setInterval(() => {
            if (!this.isBreaking) {
                this.playAnimation(this.SALSA_BOTTLES_IN_THE_AIR);
            } else {
               clearInterval(resetAnimation);
            }
        }, 60);
    }

}
