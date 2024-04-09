class World {

    character = new Character();
    endboss = new Endboss();
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
    enteredendBosArea = false;
    lastJump;
    deadAnimationPlayed = false;


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
            this.checkEndbossIsDead();
        }, 10);

        setInterval(() => {
            this.checkCharacterJumpOnChicken();
            this.ThrowableObjectAttack();
            this.checkBottleEndbossCollison();
            this.checkEndbossCollision();
            this.endbossAction();
        }, 50)

    }

    checkCollisionswithEndboss() {
        this.level.enemies.forEach((endboss) => {
            if (this.character.isColliding(endboss)) {
                this.character.hit();
                this.statusbar.setPercentage(this.character.energy);
            }
        });
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

    ThrowableObjectAttack() {
        this.throwableObject.forEach((thrObjct) => {
            this.level.enemies.forEach((enemy) => {
                if (thrObjct.isColliding(enemy)) {
                    enemy.deadChicken = true;
                    enemy.toBeRemoved = true;
                    thrObjct.toBeRemoved = true;

                    setTimeout(() => {
                        this.throwableObject = this.throwableObject.filter(obj => !obj.toBeRemoved);
                        this.level.enemies = this.level.enemies.filter(e => !e.toBeRemoved);
                    }, 270);
                }
            });
        });

    }

    checkEndbossCollision() {
        if (this.character.isColliding(this.endboss)) {
            this.character.hit();
            this.statusbar.setPercentage(this.character.energy);
        }
    }

    checkBottleEndbossCollison() {
        this.throwableObject.forEach((bottle, bottleIndex) => {
            if (bottle.isColliding(this.endboss)) {
                this.endboss.walkingAndJumping();
                this.endboss.endbossHit();
                bottle.breakAndSplash();
                this.endboss.ENDBOSS_GETS_HURT.play();
                this.endBossStatusbar.setPercentage(this.endboss.endbossEnergy);
                setTimeout(() => {
                    this.throwableObject.splice(bottleIndex, 1);
                }, 200);
            }
        });
    }


    checkEndbossIsDead() {
        if (this.endboss.endbossEnergy === 0) {
            this.endboss.endbossDead = true;
        }
    }

    endbossAction() {
        if (this.character.x >= 3325 && !this.enteredendBosArea) {
            this.enteredendBosArea = true;
            this.endboss.endbossArea = true;
            this.endboss.ENDBOSS_GETS_HURT_LONG_CROW.play();
        }
        if (this.enteredendBosArea) {
            this.endboss.alert();
            this.endboss.animateEnd();
        } else {
            this.endboss.dead();
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
        this.addToMapp(this.endboss);
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




