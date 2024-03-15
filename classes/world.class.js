class World {

    character = new Character();
    level = level1;

    ctx;
    canvas;
    keyboard;
    camera_x = 0;



    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.checkCollision();
    }

    checkCollision() {
        setInterval(() => {
            this.level.enemies.forEach((enemy) => {
                if (this.character.isColliding(enemy)) {
                    this.character.energy -= 2;
                    console.log('is colliding, energy =', this.character.energy)
                }
            });
        }, 200);
    }

    setWorld() {
        this.character.world = this;
    }


    draw() {

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMapp(this.level.backgroundObjects);
        this.addToMapp(this.character);
        this.addObjectsToMapp(this.level.enemies);
        this.addObjectsToMapp(this.level.clouds);
        this.ctx.translate(-this.camera_x, 0);


        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });

    }

    addObjectsToMapp(objects) {
        objects.forEach(o => {
            this.addToMapp(o);
        });
    }

    addToMapp(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo)
        }
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
        mo.drawFrame(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }


    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0)
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        this.ctx.restore();
        mo.x = mo.x * -1;
    }

}




