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
    deadAnimationPlayed = false;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

/**
* Initializes and manages all game intervals, orchestrating various game mechanics like collision checks,
* object updates, and interactions. It sets different intervals for checking collisions, updating thrown objects,
* and handling specific game interactions to ensure responsive and accurate gameplay dynamics.
*/
    run() {
        setGameInterval(() => {
            this.checkCollisions();
        }, 270);

        setGameInterval(() => {
            this.UpdateThrowObjects();
        }, 100);

        setGameInterval(() => {
            this.checkCollisionsWithGround();
            this.checkCollisionsWithBottles()
            this.checkCollisionsWithCoins();
        }, 15);

        setGameInterval(() => {
            this.ThrowableObjectAttack();
            this.checkBottleEndbossCollison();
            this.checkCharacterJumpOnChicken();
            this.checkEndbossCollision();
        }, 10);

        setGameInterval(() => {
            this.endbossAction();
        }, 190);

        setGameInterval(() => {
            this.checkEndbossIsDead();
        }, 220);
    }

    /**
    *Manages the throwing mechanics of objects by the character. It checks if the 'D' key is pressed,
    *ensures the character has bottles to throw, and verifies that the character is not already in a throwing state.
    *A new throwable object is created and tracked, and the bottle count is decremented. The status bar is updated
    *accordingly. If conditions aren't met, it resets the character's throwing state.
    */
    UpdateThrowObjects() {
        if (this.keyboard.D && this.collectedBottles > 0 && !this.character.isThrowing) {
            this.character.isThrowing = true;
            let bottle = new throwableObject(this.character.x + 60, this.character.y + 70, this.character.otherDirection, this.character);
            this.throwableObject.push(bottle);
            this.bottleStatusbar.setPercentage(this.collectedBottles * 10);
            this.collectedBottles--;
        } else {
            this.character.isThrowing = false;
        }
    }

    /**
    * Checks for collisions between the character and enemies. If a collision is detected and the character
    * has not already been hit, the function processes the hit: the character's hit method is called, 
    * and the character's energy level is updated on the status bar accordingly.
    */
    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && !this.character.hit()) {
                this.character.hit();
                this.statusbar.setPercentage(this.character.energy)
            }
        });
    }

    /**
    * Evaluates each throwable object's position to determine if it has hit the ground based on a defined splash height.
    * If the object is on the ground and not already breaking, it triggers the break and splash animation.
    * Once the animation is finished, the object is removed from the array of throwable objects.
    */
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

    /**
     * Detects and handles collisions between the character and bottles on the ground. When a collision occurs,
     * and if the character has not yet reached the maximum collection limit of 13 bottles, this function:
     * - Increments the count of collected bottles.
     * - Removes the collided bottle from the level to prevent re-collection.
     * - Updates the bottle status bar to reflect the new count.
     * - Plays an audio clip to signal the successful collection of a bottle.
     */
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

    /**
     * Detects and manages collisions between the character and coins on the ground. If a coin is collected,
     * and the total collected coins are fewer than 10, this function:
     * - Increments the coin count.
     * - Removes the coin from the game to prevent re-collection.
     * - Updates the coin status bar to reflect the new count and visualizes the collection.
     * - Plays a sound effect to indicate the coin has been collected.
     */
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

    /**
     * Evaluates interactions between the character and chicken enemies. If the character collides with a chicken
     * and is currently above the ground (indicating a jump), this function:
     * - Marks the chicken as defeated.
     * - Triggers a character jump as a responsive action.
     * - Removes the defeated chicken from the enemies list after a short delay, simulating the enemy being knocked out.
     */
    checkCharacterJumpOnChicken() {
        this.level.enemies.forEach((enemy, enemyIndex) => {
            if (this.character.isColliding(enemy) && !enemy.deadChicken && this.character.isAboveGround()) {
                enemy.deadChicken = true;
                this.character.jump();
                setGameTimeout(() => {
                    this.level.enemies.splice(enemyIndex, 1);
                }, 220);
            }
        });
    }

    /**
     * Detect and manage collisions between the throwing-object and the enemies Chicken.
     */
    ThrowableObjectAttack() {
        this.throwableObject.forEach((thrObjct) => {
            this.level.enemies.forEach((enemy) => {
                if (thrObjct.isColliding(enemy)) {
                    enemy.deadChicken = true;
                    enemy.toBeRemoved = true;
                    thrObjct.toBeRemoved = true;

                    setGameTimeout(() => {
                        this.throwableObject = this.throwableObject.filter(obj => !obj.toBeRemoved);
                        this.level.enemies = this.level.enemies.filter(e => !e.toBeRemoved);
                    }, 270);
                }
            });
        });

    }

    /**
    * Checks for collisions between the character and the endboss. If a collision occurs,
    * the character takes damage:
    * - The character's 'hit' method is triggered, affecting their health.
    * - The health status is then updated on the status bar to reflect the new energy level.
    */
    checkEndbossCollision() {
        if (this.character.isColliding(this.endboss)) {
            this.character.hit();
            this.statusbar.setPercentage(this.character.energy);
        }
    }

    /**
    * Detects collisions between throwable objects (bottles) and the endboss. If a collision occurs:
    * - Triggers specific actions for the endboss, such as changing its behavior and reducing its energy.
    * - Initiates visual and audio effects to indicate the endboss taking damage.
    * - Updates the endboss's energy level on the status bar.
    * - Removes the collided bottle after a short delay to simulate its impact.
    */
    checkBottleEndbossCollison() {
        this.throwableObject.forEach((bottle, bottleIndex) => {
            if (bottle.isColliding(this.endboss)) {
                this.endboss.walkingAndJumping();
                this.endboss.endbossHit();
                bottle.breakAndSplash();
                playAudio(ENDBOSS_GETS_HURT);
                this.endBossStatusbar.setPercentage(this.endboss.endbossEnergy);
                setGameTimeout(() => {
                    this.throwableObject.splice(bottleIndex, 1);
                }, 200);
            }
        });
    }

    /**
    * Checks if the endboss's energy level has depleted to zero, indicating its defeat. If so:
    * - Marks the endboss as dead.
    * - Triggers a sound effect to signify the endboss's defeat.
    * - Initiates visual effects to indicate the endboss's defeat.
    */
    checkEndbossIsDead() {
        if (this.endboss.endbossEnergy === 0) {
            this.endboss.endbossDead = true;
            setGameTimeout(() => {
                playAudio(ENDBOSS_DEFEATED);
            }, 40)
            this.endboss.dead();
        }
    }

    /**
    * Manages the behavior of the endboss based on the character's position in the game world:
    * - If the character enters the endboss area for the first time, triggers special actions
    *   such as setting up the endboss's area and playing a specific audio.
    * - Once the character is in the endboss area, continuously updates the endboss's actions
    *   such as its alertness and animation, and checks if it is defeated.
    */
    endbossAction() {
        if (this.character.x >= 3325 && !this.enteredendBosArea) {
            this.enteredendBosArea = true;
            this.endboss.endbossArea = true;
            playAudio(ENDBOSS_GETS_HURT_LONG_CROW);
        }

        if (this.enteredendBosArea) {
            this.endboss.alert();
            this.endboss.animateEnd();
            this.checkEndbossIsDead();
        }
    }

    setWorld() {
        this.character.world = this;
    }

    /**
    * Draw's all game object's onto the canvas, managing the camera position and rendering order.
    * - Clear's the canvas.
    * - Translate's the canvas to the camera position for scrolling.
    * - Render's background objects, throwable objects, enemies, clouds, coins, and bottles.
    * - Render's status bars for health, bottle count, coin count, and endboss health.
    * - Render's the endboss and character sprites.
    * - Continuously updates the canvas using requestAnimationFrame for smooth animation.
    */
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

    /**
    * Adds multiple objects to the rendering map for drawing on the canvas.
    * @param {Array} objects - Array of objects to be added to the rendering map.
    */
    addObjectsToMapp(objects) {
        objects.forEach(o => {
            this.addToMapp(o);
        });
    }

    /**
    * Adds a movable object (mo) to the rendering map for drawing on the canvas.
    * If the object is facing the opposite direction, it's flipped before drawing.
    * @param {Array} mo - The movable object to be added to the rendering map.
    */
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

    /**
    * Flips the image of a movable object horizontally.
    * @param {*} mo - The movable object whose image is to be flipped.
    */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0)
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
    * Restores the canvas to its previous state after flipping the image of a movable object horizontally.
    * @param {*} mo - The movable object whose image was flipped and needs to be restored.
    */
    flipImageBack(mo) {
        this.ctx.restore();
        mo.x = mo.x * -1;
    }

}




