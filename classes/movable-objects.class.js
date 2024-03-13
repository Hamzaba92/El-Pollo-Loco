class MovableObject {
    height = 50;
    width = 50;
    img;
    imageCache = {};
    speed = 0.15;
    otherDirection = false;
    

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(iterieren){
        iterieren.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    moveLeft(){
        setInterval(()=>{
            this.x -= this.speed;
        }, 60);
    }
  
}