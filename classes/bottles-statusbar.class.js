class StatusbarBottle extends DrawableObjects {
    bottleAmount = 0;
    percentage = 0;


    IMAGES_BOTTLES = [
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png'
    ];


    constructor() {
        super();
        this.loadImages(this.IMAGES_BOTTLES);
        this.setPercentage(0);
        this.x = 30;
        this.y = 42;
        this.width = 145;
        this.height = 50;
        
    }

    collectBottle() {
        if (this.bottleAmount < 12) {
            this.bottleAmount++;
        }
        this.updatePercentage();
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_BOTTLES[this.resolveImageIndex(percentage)];
        this.img = this.imageCache[path];
    }

    updatePercentage() {
        this.percentage = this.bottleAmount * 20;
        this.setPercentage(this.percentage);
    }

      resolveImageIndex() {
        return Math.min(Math.floor(this.percentage / 20), this.IMAGES_BOTTLES.length -1);
        
    }

   



}