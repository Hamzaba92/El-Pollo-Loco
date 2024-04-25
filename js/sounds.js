
let soundActive = false;
let audioEffectsActive = true;

let BACKGROUND_SOUND = new Audio('audio/pepe_background_sound2.mp3');
let COLLECTED_BOTTLE = new Audio('audio/collect_bottle.mp3');
let COLLECTED_COIN = new Audio('audio/collect_coin.mp3');

let WALKING_SOUND = new Audio('audio/Walking_pepe.mp3');
let JUMPING_SOUND = new Audio('audio/pepe_jump.mp3');
let HURT_SOUND = new Audio('audio/pepe_hurt.mp3');
let SNORING_SOUND = new Audio('audio/pepe_snoring.mp3');
let PEPE_LOSE = new Audio('audio/pepe_lost_sound.mp3');

let MIDDLE_CHICKEN_HURT = new Audio('audio/middle_chicken_hurt.mp3');
let LITTLE_CHICKEN_HURT = new Audio('audio/little_chicken_hurt.mp3');

let ENDBOSS_GETS_HURT_LONG_CROW = new Audio('audio/endboss_hurt.mp3');
let ENDBOSS_GETS_HURT = new Audio('audio/endboss_hurt2.mp3');
let ENDBOSS_DEFEATED = new Audio('audio/defeat_endboss.mp3');

let BOTTLE_BREAKS = new Audio('audio/breaking_bottle.mp3');
let THROW_BOTTLE_SOUND = new Audio('audio/throw_bottle.mp3');

BACKGROUND_SOUND.volume = 0.8;
BACKGROUND_SOUND.loop = true;
COLLECTED_BOTTLE.volume = 0.8;
COLLECTED_COIN.volume = 0.5;
WALKING_SOUND.volume = 0.4;
MIDDLE_CHICKEN_HURT.volume = 0.4;
LITTLE_CHICKEN_HURT.volume = 0.4;
PEPE_LOSE.playbackRate = 1.7;

/**
 * Toggles the background music and all sound effects on and off.
 * This function switches the global sound control flag, updates the music playback,
 * and the state of sound effects based on the current flag state.
 */
function toggleBackgroundMusic() {
    soundActive = !soundActive;
    audioEffectsActive = soundActive;
    updateBackgroundMusic();
    updateSoundEffects();
}

/**
 * Updates the background music playback and the sound icon on the UI based on the current sound state.
 * If sound is ON, it plays the background music and shows the "Sound-ON" icon.
 * If sound is OFF, it pauses the music and displays the "Sound-OFF" icon.
 */
function updateBackgroundMusic() {
    let toggleImg = document.getElementById('toggle_sound_btn');
    if (soundActive) {
        BACKGROUND_SOUND.play().catch(e => console.error("Error playing background music: ", e));
        toggleImg.src = './img/sound_on.png';
    } else {
        BACKGROUND_SOUND.pause();
        toggleImg.src = './img/sound_mute.png';
    }
}

/**
 * Plays an audio element if sound is enabled.
 * @param {HTMLAudioElement} audio - The audio element to play.
 * This function checks if both sound and audio effects are active. If so, it attempts to play the provided audio element
 * if it is currently paused. Errors during playback are logged to the console.
 */
function playAudio(audio) {
    if (soundActive && audioEffectsActive) {
        if (audio.paused) {
            audio.play().catch(e => console.error("Error playing the audio: ", e));
        }
    }
}

/**
 * Immediately stops all sound effects if the sound is inactive.
 * This function iterates through a list of predefined audio elements and pauses each one, effectively muting the game.
 */
function updateSoundEffects() {
    const allSounds = [
        COLLECTED_BOTTLE,
        COLLECTED_COIN,
        WALKING_SOUND,
        JUMPING_SOUND,
        HURT_SOUND,
        MIDDLE_CHICKEN_HURT,
        LITTLE_CHICKEN_HURT,
        ENDBOSS_GETS_HURT_LONG_CROW,
        ENDBOSS_GETS_HURT,
        SNORING_SOUND
    ];

    if (!soundActive) {
        allSounds.forEach(audio => {
            audio.pause();
        });
    }

    /**
    * Pauses the provided audio element if it is currently playing.
    * @param {HTMLAudioElement} audio - The audio element to pause.
    */
    function pauseAudio(audio) {
        if (!audio.paused) {
            audio.pause();
        }
    }

}
