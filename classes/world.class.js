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
    throwableObject = [new throwableObject];
    splashHeight = 368;
    collectedBottles = 0;
    isShooted = false;


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

        setInterval(()=>{
            this.checkCollisionsWithGround();
            this.checkCollisionsWithBottles()
        }, 40);
            
        

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


    checkCollisionsWithGround() {
        this.throwableObject.forEach((throwableObject, index) => {
            if (throwableObject.y > this.splashHeight && !throwableObject.isBreaking) {
                throwableObject.breakAndSplash();
            }
            if (throwableObject.animationFinished()) {
                this.throwableObject.splice(index, 1);
            }
        });
    }

    checkCollisionsWithBottles() {
        this.level.bottle.forEach((bottle, index) => {
            if (this.character.isColliding(bottle) && this.collectedBottles < 12) {
                this.collectedBottles++;
                this.level.bottle.splice(index, 1);
                this.bottleStatusbar.setPercentage(this.collectedBottles * 10);
                playAudio(COLLECTED_BOTTLE);
            }
        });
    }


    checkThrowableObjects() {
        if (this.keyboard.D && this.collectedBottles > 0) {
            if (this.isShooted == false) {
                this.isShooted = true;
                setTimeout(() => {
                    this.isShooted = false;
                }, 2000);

                let throwableObject = new ThrowableObject(this.character.x, this.character.y, this.character.otherDirection);
                this.throwableObjects.push(throwableObject);
                this.lastThrown = Date.now();
                this.collectedBottles--;
                this.bottleBar.setPercentage(this.collectedBottles * 20);
            }
        }
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
        this.addObjectsToMapp(this.level.bottle);

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




