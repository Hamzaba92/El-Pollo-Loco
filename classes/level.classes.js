class Level {
    enemies;
    clouds;
    backgroundObjects;
    level_end_x = 4000;
    coin;
    bottle;

    constructor(enemies, clouds, backgroundObjects, coin, bottle) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coin = coin;
        this.bottle = bottle;
    }

}