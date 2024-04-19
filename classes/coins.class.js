class Coins extends MovableObject {

    height = 150;
    width = 150;
    x = 200;
    y = 200;

    offset = {
        top: 50,
        left: 50,
        right: 50,
        bottom: 50
    };

    IMAGES_COIN = [
        './img/8_coin/coin_1.png',
        './img/8_coin/coin_2.png'
    ];

    constructor(x, y) {
        super().loadImage('./img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES_COIN);
        this.x = x;
        this.y = y;
        this.speed = 0.10 + Math.random() * 0.25;
        this.animateCoins();
    }

    animateCoins() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_COIN);
        }, 250);
    }

}