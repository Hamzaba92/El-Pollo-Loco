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
        new BackgroundObjects('img/5_background/layers/3_third_layer/1.png')
    ]
    ctx;
    canvas;

    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.draw();

    }


    draw() {

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.addObjectsToMapp(this.backgroundObjects);
        this.addToMapp(this.character);
        this.addObjectsToMapp(this.enemies);
        this.addObjectsToMapp(this.clouds);
        

       
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });

    }

    addObjectsToMapp(objects){
        objects.forEach(o => {
            this.addToMapp(o);
        });
    }

    addToMapp(mo) {
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
    }

}




