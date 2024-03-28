class StatusbarBottle extends DrawableObjects {
    bottleAmount = 0;
    percentage = 0;


    IMAGES_BOTTLES = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png'
    ];


    constructor() {
        super();
        this.loadImages(this.IMAGES_BOTTLES);
        this.x = 20;
        this.y = 50;
        this.width = 200;
        this.height = 60;
        
    }
}