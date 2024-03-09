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
        this.ctx.drawImage(this.character.img, this.character.x, this.character.y, this.character.width, this.character.height);

        this.enemies.forEach(enemy =>{
            this.ctx.drawImage(enemy.img, enemy.x, enemy.y, enemy.width, enemy.height)
        });

        this.clouds.forEach(cloud =>{
            this.ctx.drawImage(cloud.img, cloud.x, cloud.y, cloud.width, cloud.height)
        });

        this.backgroundObjects.forEach(bg =>{
            this.ctx.drawImage(bg.img, bg.x, bg.y, bg.width, bg.height)
        });

        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }


}