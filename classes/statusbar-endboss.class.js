class endBossStatusbar extends MovableObject{


    percentage = 150;

    IMAGES_ENDBOSS = [
        'img/7_statusbars/2_statusbar_endboss/blue/blue0.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue20.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue40.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue60.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue80.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue100.png'
    ];

    constructor(){
        super();
        this.loadImages(this.IMAGES_ENDBOSS);
        this.x = 743;
        this.y = 10;
        this.height = 60;
        this.width = 200;
        this.setPercentage(150);
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_ENDBOSS[this.resolveImageIndex(percentage)];
        this.img = this.imageCache[path];
    }


    resolveImageIndex(percentage) {
        if (percentage > 140) return 5;
        else if (percentage > 100) return 4;
        else if (percentage > 50) return 3;
        else if (percentage > 25) return 2;
        else if (percentage > 0) return 1;
        return 0;
    }

}