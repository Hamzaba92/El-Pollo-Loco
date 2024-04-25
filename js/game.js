let canvas;
let world;
let keyboard = new Keyboard();

activeIntervals = [];
activeTimeouts = [];

window.addEventListener('DOMContentLoaded', function () {
    initLevel();
});

function startGame() {
    init();
    let startScreenImg = document.getElementById('startScreen_img');
    let startGameButton = document.getElementById('start_game');
    let fullscreenBtn = document.getElementById('fullscreen');

    if (startScreenImg) {
        startScreenImg.style.display = 'none';
    }
    if (startGameButton) {
        startGameButton.style.display = 'none';
    }
    if (fullscreenBtn) {
        fullscreenBtn.style.display = 'flex';
    }
}

function setGameInterval(fn, delay) {
    const intervalId = setInterval(fn, delay);
    activeIntervals.push(intervalId);
    return intervalId;
}

function setGameTimeout(fn, delay) {
    const timeoutId = setTimeout(fn, delay);
    activeTimeouts.push(timeoutId);
    return timeoutId;
}

function clearGameTimers() {
    activeIntervals.forEach(clearInterval);
    activeTimeouts.forEach(clearTimeout);
    activeIntervals = [];
    activeTimeouts = [];
}

function tryAgain() {
    clearGameTimers();
    updateBackgroundMusic();
    init();
    document.getElementById('endScreen_img').style.display = 'none';
    document.getElementById('end_game').style.display = 'none';
    document.getElementById('when_pepe_died').style.display = 'none';
    this.whenPepeDiedDisplayed = false;
}

function gameOver() {
    clearGameTimers();
    document.getElementById('endScreen_img').style.display = 'block';
    document.getElementById('end_game').style.display = 'block';
}

function youLost() {
    if (!this.whenPepeDiedDisplayed) {
        this.whenPepeDiedDisplayed = true;
        playAudio(PEPE_LOSE);
        document.getElementById('when_pepe_died').style.display = 'block';
        document.getElementById('endScreen_img').style.display = 'none';
        clearGameTimers();
    }
}

function init() {
    initLevel();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    touchScreenButtons();
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

function touchScreenButtons() {
    let leftarrow = document.getElementById('btn_walk_left');
    let rightarrow = document.getElementById('btn_walk_right');
    let jump = document.getElementById('jump');
    let throwbottle = document.getElementById('throwbottle');

    leftarrow.addEventListener('touchstart', (event) => {
        event.preventDefault();
        keyboard.LEFT = true;
        leftarrow.classList.add('active');
    }, { passive: false });

    leftarrow.addEventListener('touchend', (event) => {
        event.preventDefault();
        keyboard.LEFT = false;
        leftarrow.classList.remove('active');
    }, { passive: false });

    rightarrow.addEventListener('touchstart', (event) => {
        event.preventDefault();
        keyboard.RIGHT = true;
        rightarrow.classList.add('active');
    }, { passive: false });

    rightarrow.addEventListener('touchend', (event) => {
        event.preventDefault();
        keyboard.RIGHT = false;
        rightarrow.classList.remove('active');
    }, { passive: false });

    jump.addEventListener('touchstart', (event) => {
        event.preventDefault();
        keyboard.SPACE = true;
        jump.classList.add('active');
    }, { passive: false });

    jump.addEventListener('touchend', (event) => {
        event.preventDefault();
        keyboard.SPACE = false;
        jump.classList.remove('active');
    }, { passive: false });

    throwbottle.addEventListener('touchstart', (event) => {
        event.preventDefault();
        keyboard.D = true;
        throwbottle.classList.add('active');
    }, { passive: false });

    throwbottle.addEventListener('touchend', (event) => {
        event.preventDefault();
        keyboard.D = false;
        throwbottle.classList.remove('active');
    }, { passive: false });

    document.querySelectorAll('.mobile-buttons img').forEach(button => {
        button.addEventListener('contextmenu', (event) => {
            event.preventDefault();
        }, false);
    });

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
        canvas.requestFullscreen().then(() => {
            touchScreenButtons();  // Aufruf nach erfolgreichem Wechsel
        }).catch(err => {
            alert("Error attempting to enable full-screen mode: " + err.message + " (the request was denied)");
        });
    } else if (canvas.webkitRequestFullScreen) {
        canvas.webkitRequestFullScreen();
        touchScreenButtons(); // WebKit browsers may not return a promise
    } else if (canvas.mozRequestFullScreen) {
        canvas.mozRequestFullScreen();
        touchScreenButtons(); // Firefox may not return a promise
    } else if (canvas.msRequestFullscreen) {
        canvas.msRequestFullscreen();
        touchScreenButtons(); // IE/Edge may not return a promise
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
    if (isInFullScreen()) {
        canvas.style.border = 'none';
        touchScreenButtons(); // Sicherstellen, dass die Funktion hier aufgerufen wird
    } else {
        canvas.style.border = "solid 3px grey";
    }
}
