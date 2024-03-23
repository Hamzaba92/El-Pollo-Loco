let canvas;
let world;
let keyboard = new Keyboard();


function init() {

    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    console.log('My Character is', world.character);
    playBackgroundMusic();
}

window.addEventListener('keydown', (e) => {
    if (e.keyCode == 39) {
        keyboard.RIGHT = true;
    }

    if (e.keyCode == 37) {
        keyboard.LEFT = true;
    }

    if (e.keyCode == 38) {
        keyboard.UP = true;
    }

    if (e.keyCode == 40) {
        keyboard.DOWN = true;
    }

    if (e.keyCode == 32) {
        keyboard.SPACE = true;
    }



});

window.addEventListener('keyup', (e) => {
    if (e.keyCode == 39) {
        keyboard.RIGHT = false;
    }

    if (e.keyCode == 37) {
        keyboard.LEFT = false;
    }

    if (e.keyCode == 38) {
        keyboard.UP = false;
    }

    if (e.keyCode == 40) {
        keyboard.DOWN = false;
    }

    if (e.keyCode == 32) {
        keyboard.SPACE = false;
    }


})


let toggle = true;


function playBackgroundMusic() {

    let toggleImg = document.getElementById('toggle_sound_btn');
    BACKGROUND_SOUND.loop = true;
    if (toggle) {
        BACKGROUND_SOUND.play();
        toggleImg.src = './img/sound_on.png';
    } else {
        BACKGROUND_SOUND.pause();
        toggleImg.src = './img/sound_mute.png';
    }

    toggle = !toggle;
}



//Fullscreen
canvas = document.getElementById('canvas');

const isInFullScreen = (document.fullscreenElement && document.fullscreenElement !== null) ||
    (document.webkitFullscreenElement && document.webkitFullscreenElement !== null) ||
    (document.mozFullScreenElement && document.mozFullScreenElement !== null) ||
    (document.msFullscreenElement && document.msFullscreenElement !== null);


function toggleFullScreen(){
    if(canvas.RequestFullScreen){
        canvas.RequestFullScreen();
    }else if(canvas.webkitRequestFullScreen){
        canvas.webkitRequestFullScreen();
    }else if(canvas.mozRequestFullScreen){
        canvas.mozRequestFullScreen();
    }else if(canvas.msRequestFullscreen){
        canvas.msRequestFullscreen();
    }else{
        
        alert("This browser doesn't supporter fullscreen");
    }
    canvas.style.border = 'none';
}

// Exit fullscreen
function exitfullscreen(){
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }else{
        alert("Exit fullscreen doesn't work");
    }
}