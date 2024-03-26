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

    if (e.keyCode == 68) {
        keyboard.D = true;
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

    if (e.keyCode == 68) {
        keyboard.D = false;
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






canvas = document.getElementById('canvas');

function toggleFullScreen() {
    if (isInFullScreen()) {
        exitFullscreen();
    } else {
        enterFullscreen();
    }
}

function isInFullScreen() {
    return document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement;
}

function enterFullscreen() {
    if (canvas.requestFullscreen) {
        canvas.requestFullscreen();
    } else if (canvas.webkitRequestFullScreen) {
        canvas.webkitRequestFullScreen();
    } else if (canvas.mozRequestFullScreen) {
        canvas.mozRequestFullScreen();
    } else if (canvas.msRequestFullscreen) {
        canvas.msRequestFullscreen();
    } else {
        alert("This browser doesn't support fullscreen");
    }
    canvas.style.border = 'none';
}

function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    } else {
        alert("Exit fullscreen doesn't work");
    }
}

// Event-Listener für fullscreenchange
document.addEventListener('fullscreenchange', fullscreenChange);
document.addEventListener('webkitfullscreenchange', fullscreenChange);
document.addEventListener('mozfullscreenchange', fullscreenChange);
document.addEventListener('MSFullscreenChange', fullscreenChange);

function fullscreenChange() {
    if (!isInFullScreen()) {
        canvas.style.border = "solid 3px grey";
    } else {
        canvas.style.border = 'none';
    }
}
