let canvas;
let world;
let keyboard = new Keyboard();

window.addEventListener('DOMContentLoaded', function() {
    initLevel();
});


function startGame() {
        init();
        let startScreenImg = document.getElementById('startScreen_img');
        let startGameButton = document.getElementById('start_game');
    
        if (startScreenImg){
            startScreenImg.remove();
        } 
        if (startGameButton){
            startGameButton.remove();
        } 
    }

    function removeAllAudioSources() {
        document.querySelectorAll('audio, source').forEach(element => {
            element.remove();
        });
    }

function tryAgain() {
    document.getElementById('endScreen_img').remove();
    document.getElementById('end_game').remove();
    window.location.reload();

}

function gameOver() {
    removeAllAudioSources();
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
    document.getElementById('endScreen_img').style.display = 'block';
    document.getElementById('end_game').style.display = 'block';
}



function init() {
    initLevel();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
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


let toggle = false;


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
