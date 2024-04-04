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
    collectedCoins = 0;
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
            this.UpdateThrowObjects();
        }, 250);

        setInterval(() => {
            this.checkCollisionsWithGround();
            this.checkCollisionsWithBottles()
            this.checkCollisionsWithCoins();
            this.checkCharacterJumpOnChicken();
        }, 10);

        setInterval(() => {
            this.checkCharacterJumpOnChicken();
        }, 10)

    }


    UpdateThrowObjects() {
        if (this.keyboard.D && this.collectedBottles > 0) {

            let bottle = new throwableObject(this.character.x + 60, this.character.y + 70, this.character.otherDirection);
            this.throwableObject.push(bottle);
            this.bottleStatusbar.setPercentage(this.collectedBottles * 10);
            this.collectedBottles--;
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
            if (this.character.isColliding(bottle) && this.collectedBottles < 13) {
                this.collectedBottles++;
                this.level.bottle.splice(index, 1);
                this.bottleStatusbar.setPercentage(this.collectedBottles * 10);
                playAudio(COLLECTED_BOTTLE);
            }
        });
    }

    checkCollisionsWithCoins() {
        this.level.coin.forEach((coins, index) => {
            if (this.character.isColliding(coins) && this.collectedCoins < 10) {
                this.collectedCoins++;
                this.level.coin.splice(index, 1);
                this.coinStatusbar.collectCoin();
                this.coinStatusbar.setPercentage(this.coinStatusbar.coinAmount);
                playAudio(COLLECTED_COIN);
            }
        });
    }


    checkCharacterJumpOnChicken() {
        this.level.enemies.forEach((enemy, enemyIndex) => {
            if (this.character.isColliding(enemy) && !enemy.deadChicken && this.character.isAboveGround()) {
                enemy.deadChicken = true;
                this.character.jump();
                setTimeout(() => {
                    this.level.enemies.splice(enemyIndex, 1);
                }, 270);
                
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




