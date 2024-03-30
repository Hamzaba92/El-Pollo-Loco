class World {

    character = new Character();
    level = level1;
    ctx;
    canvas;
    keyboard;
    camera_x = 0;
    statusbar = new Statusbar();
    bottleStatusbar = new StatusbarBottle();
    coinStatusbar = new StatusbarCoins();
    endBossStatusbar = new endBossStatusbar();
    throwableObject = [new throwableObject()];



    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkthrowableObject();
        }, 200);

    }

    checkthrowableObject() {
        if (this.keyboard.D) {
            
            let bottle = new throwableObject(this.character.x + 60, this.character.y + 70);
            this.throwableObject.push(bottle);
            this.idleTime = new Date().getTime();
        }
    }


    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.statusbar.setPercentage(this.character.energy)//function damit die statusbar abnimmt
            }
        });
    }


    setWorld() {
        this.character.world = this;
    }


    draw() {

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMapp(this.level.backgroundObjects);
        this.addObjectsToMapp(this.throwableObject);
        this.addObjectsToMapp(this.level.enemies);
        this.addObjectsToMapp(this.level.clouds);
        this.addObjectsToMapp(this.level.coin);
        this.addObjectsToMapp(this.level.bottle)

        this.ctx.translate(-this.camera_x, 0);
        this.addToMapp(this.statusbar);
        this.addToMapp(this.bottleStatusbar);
        this.addToMapp(this.coinStatusbar);
        this.addToMapp(this.endBossStatusbar);


        this.ctx.translate(this.camera_x, 0);
        this.addToMapp(this.character);
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




