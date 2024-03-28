class throwableObject extends MovableObject {

    character;
    

    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.x = x;
        this.y = y;
        this.width = 65;
        this.height = 75;
        this.throw();

    }

    throw() {
        this.speedY = 27;
        this.applyGravity();

        setInterval(() => {
            this.x += 10;
        }, 25);

    }




}
