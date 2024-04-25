class Statusbar extends DrawableObjects {

    IMAGES = [
        './img/7_statusbars/1_statusbar/2_statusbar_health/orange/0.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/orange/20.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/orange/40.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/orange/60.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/orange/80.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/orange/100.png'
    ];

    percentage = 100;

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.setPercentage(100);
        this.x = 30;
        this.y = 0;
        this.height = 50;
        this.width = 145;
    }

    /**
    * Sets the percentage value and updates the image based on the calculated index.
    * @param {number} - The percentage value to set, typically influencing the image selection.
    */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * 
     * @returns {number} The index of the image to be displayed, based on the current percentage.
     */
    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage > 20) {
            return 1;
        } else {
            return 0;
        };
    }
}