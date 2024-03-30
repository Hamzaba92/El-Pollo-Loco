class Coins extends MovableObject {



    height = 150;
    width = 150;
    x = 200;
    y = 200;

    IMAGES_COIN = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];



    constructor(x) {
        super().loadImage('img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES_COIN);
        this.x = x;
        this.speed = 0.10 + Math.random() * 0.25;
        this.animateCoins();
    }

    animateCoins() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_COIN);
        }, 500);
    }

}