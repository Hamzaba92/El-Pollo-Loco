class endBossStatusbar extends MovableObject{


    percentage = 100;

    IMAGES_ENDBOSS = [
        './img/7_statusbars/2_statusbar_endboss/blue/blue0.png',
        './img/7_statusbars/2_statusbar_endboss/blue/blue20.png',
        './img/7_statusbars/2_statusbar_endboss/blue/blue40.png',
        './img/7_statusbars/2_statusbar_endboss/blue/blue60.png',
        './img/7_statusbars/2_statusbar_endboss/blue/blue80.png',
        './img/7_statusbars/2_statusbar_endboss/blue/blue100.png'
    ];

    constructor(){
        super();
        this.loadImages(this.IMAGES_ENDBOSS);
        this.x = 595;
        this.y = 10;
        this.height = 50;
        this.width = 145;
        this.setPercentage(100);
    }

    /**
    * Sets the percentage value and updates the image based on the calculated index.
    * @param {number} - The percentage value to set, typically influencing the image selection.
    */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_ENDBOSS[this.resolveImageIndex(percentage)];
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