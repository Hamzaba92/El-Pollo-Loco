class StatusbarCoins extends MovableObject {

    coinAmount = 0;
    percentage = 0;

    IMAGES_COINS = [
        './img/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/orange/60.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/orange/80.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.png'
    ]

    constructor() {
        super();
        this.loadImages(this.IMAGES_COINS);
        this.height = 50;
        this.width = 145;
        this.x = 30;
        this.y = 86;
        this.setPercentage(0);
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_COINS[this.resolveImageIndex()];
        this.img = this.imageCache[path];

    }

    collectCoin() {
        this.coinAmount += 10;
        if (this.coinAmount > 100) {
            this.coinAmount = 100;
        }
    }

    resolveImageIndex() {
        if (this.percentage == 0) {
            return 0;
        } else if (this.percentage == 20) {
            return 1;
        } else if (this.percentage == 40) {
            return 2;
        } else if (this.percentage == 60) {
            return 3;
        } else if (this.percentage == 80) {
            return 4;
        } else if (this.percentage == 100) {
            return 5;
        }
        return Math.min(Math.floor(this.percentage / 20), this.IMAGES_COINS.length - 1);

    }

}