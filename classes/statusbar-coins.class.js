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

    /**
   * Sets the percentage value and updates the image based on the calculated index.
   * @param {number} - The percentage value to set, typically influencing the image selection.
   */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_COINS[this.resolveImageIndex()];
        this.img = this.imageCache[path];

    }

    /**
    * Increases the coin amount by 10.
    * If the resulting coin amount exceeds 100, sets it to 100.
    */
    collectCoin() {
        this.coinAmount += 10;
        if (this.coinAmount > 100) {
            this.coinAmount = 100;
        }
    }

    /**
     * 
     * @returns {number} The index of the image to be displayed, based on the current percentage.
     */
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