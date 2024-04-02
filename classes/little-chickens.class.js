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

        setInterval(()=>{
            if(this instanceof littleChickens && !this.deadChicken){
                this.deadChicken = true;
                this.speed = 0;
                this.playAnimation(this.LITTLE_CHICKENS_DEAD);
            }
        }, 2000)

        setInterval(() => {
            if (!this.deadChicken) {
                this.playAnimation(this.LITTLE_CHICKENS);
            }
        }, 150);
        
    }

    

    moveChickenToLeft() {
        this.moveLeft();
    }










    

}