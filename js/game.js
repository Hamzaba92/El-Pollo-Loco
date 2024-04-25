let canvas;
let world;
let keyboard = new Keyboard();

activeIntervals = [];
activeTimeouts = [];

window.addEventListener('DOMContentLoaded', function () {
    initLevel();
});

/**
 * Initializes the game environment, hides the start screen and start button, and shows the fullscreen button after Starting the Game.
 */
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

/**
 * Sets up a repeated interval to execute a specified function at defined time delays.
 * for the game loop and recurring tasks within the game.
 * @param {Function} fn - The function to be executed repeatedly.
 * @param {number} delay - The time delay between function executions in milliseconds.
 * @returns {number} The interval ID, for clearing the interval later.
 */
function setGameInterval(fn, delay) {
    const intervalId = setInterval(fn, delay);
    activeIntervals.push(intervalId);
    return intervalId;
}

/**
 * Sets a timeout to execute a specified function after a delay.
 * Is used to schedule a single future execution of a function within the game.
 * @param {Function} fn - The function to be executed after the delay.
 * @param {number} delay - The time delay before the function is executed, in milliseconds.
 * @returns {number} The timeout ID, for cancelling the timeout if needed.
 */
function setGameTimeout(fn, delay) {
    const timeoutId = setTimeout(fn, delay);
    activeTimeouts.push(timeoutId);
    return timeoutId;
}

/**
 * Clears all active intervals and timeouts, resetting their respective tracking arrays.
 * This function ensures that all scheduled tasks are stopped and the resources are freed,
 * preventing any unintended actions from occurring after this call.
 */
function clearGameTimers() {
    activeIntervals.forEach(clearInterval);
    activeTimeouts.forEach(clearTimeout);
    activeIntervals = [];
    activeTimeouts = [];
}

/**
 * Resets the game environment by clearing timers, updating background music, and reinitializing game settings.
 * Also hides endgame-screens and related elements, setting the state for a new game start.
 */
function tryAgain() {
    clearGameTimers();
    updateBackgroundMusic();
    init();
    document.getElementById('endScreen_img').style.display = 'none';
    document.getElementById('end_game').style.display = 'none';
    document.getElementById('when_pepe_died').style.display = 'none';
    this.whenPepeDiedDisplayed = false;
}

/**
 * Ends the current game session after the Character killed the Endboss.
 * This function stops all game-related timers and displays the gameover-screen.
 */
function gameOver() {
    clearGameTimers();
    document.getElementById('endScreen_img').style.display = 'block';
    document.getElementById('end_game').style.display = 'block';
}

/**
 * Handles the specific scenario when the player loses due to Pepe's defeat.
 * It ensures that the loss scenario is processed only once per game session, plays a specific audio,
 * displays a related message, hides the end screen image, and stops all game timers.
 */
function youLost() {
    if (!this.whenPepeDiedDisplayed) {
        this.whenPepeDiedDisplayed = true;
        playAudio(PEPE_LOSE);
        document.getElementById('when_pepe_died').style.display = 'block';
        document.getElementById('endScreen_img').style.display = 'none';
        clearGameTimers();
    }
}

/**
 * Initializes the game by setting up the level, creating the game world,
 * and configuring touch screen controls.
 * - A canvas element is retrieved and used to instantiate a new game world.
 * - Touch screen buttons are configured to respond to user interactions.
 */
function init() {
    initLevel();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    touchScreenButtons();
}

/**
 * This event listener handles `keydown` events. It sets the corresponding boolean value to `true`
 */
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

/**
 * This event listener handles `keyup` events. It sets the corresponding boolean value to `false` when the keyboard button isn't pressed anymore.
 */
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

/**
 * Configures touch event listeners for on-screen controls, enabling interactive gameplay on touchscreen devices.
 * - 'touchstart' and 'touchend' events to buttons for left and right movement, jumping, and throwing a bottle.
 * - Prevents the default touch behavior to ensure that interactions are responsive and not interrupted by typical mobile browser gestures.
 * - Activates corresponding keyboard actions and visually updates button states by adding or removing 'active' class based on touch events.
 * - Also disables the context menu on button elements to prevent interference with gameplay.
 */
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

/**
 * This function is to switch between fullscreen and exit-fullscreen
 */
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
        canvas.requestFullscreen().catch(err => {
            alert("Error attempting to enable full-screen mode: " + err.message + " (the request was denied)");
        });
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

document.addEventListener('fullscreenchange', fullscreenChange);
document.addEventListener('webkitfullscreenchange', fullscreenChange);
document.addEventListener('mozfullscreenchange', fullscreenChange);
document.addEventListener('MSFullscreenChange', fullscreenChange);

function fullscreenChange() {
    if (isInFullScreen()) {
        canvas.style.border = 'none';
        touchScreenButtons();
    } else {
        canvas.style.border = "solid 3px grey";
    }
}
