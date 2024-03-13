class World {

    character = new Character();


    enemies = [
        new Chicken(),
        new Chicken(),
        new Chicken(),
    ];

    clouds = [
        new Cloud()
    ];

    backgroundObjects = [

        new BackgroundObjects('img/5_background/layers/air.png', -979, 0),
        new BackgroundObjects('img/5_background/layers/3_third_layer/2.png', -979, 0),
        new BackgroundObjects('img/5_background/layers/2_second_layer/2.png', -979, 0),
        new BackgroundObjects('img/5_background/layers/1_first_layer/1.png', -979, 0),


        new BackgroundObjects('img/5_background/layers/air.png', 0, 0),
        new BackgroundObjects('img/5_background/layers/3_third_layer/1.png', 0, 0),
        new BackgroundObjects('img/5_background/layers/2_second_layer/1.png', 0, 0),
        new BackgroundObjects('img/5_background/layers/1_first_layer/2.png', 0, 0),


        new BackgroundObjects('img/5_background/layers/air.png', 979, 0),
        new BackgroundObjects('img/5_background/layers/3_third_layer/2.png', 979, 0),
        new BackgroundObjects('img/5_background/layers/2_second_layer/2.png', 979, 0),
        new BackgroundObjects('img/5_background/layers/1_first_layer/1.png', 979, 0),


        new BackgroundObjects('img/5_background/layers/air.png', 979*2, 0),
        new BackgroundObjects('img/5_background/layers/3_third_layer/1.png', 979*2, 0),
        new BackgroundObjects('img/5_background/layers/2_second_layer/1.png', 979*2, 0),
        new BackgroundObjects('img/5_background/layers/1_first_layer/2.png', 979*2, 0),
        


    ]

    ctx;
    canvas;
    keyboard;
    camera_x = 0;



    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
    }

    setWorld() {
        this.character.world = this;
    }


    draw() {

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMapp(this.backgroundObjects);
        this.addToMapp(this.character);
        this.addObjectsToMapp(this.enemies);
        this.addObjectsToMapp(this.clouds);
        this.ctx.translate(-this.camera_x, 0);


        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });

    }

    addObjectsToMapp(objects) {
        objects.forEach(o => {
            this.addToMapp(o);
        });
    }

    addToMapp(mo) {
        if (mo.otherDirection) {
            this.ctx.save();
            this.ctx.translate(mo.width, 0)
            this.ctx.scale(-1, 1);
            mo.x = mo.x * -1;
        }
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);

        if (mo.otherDirection) {
            this.ctx.restore();
            mo.x = mo.x * -1;
        }
    }

}




