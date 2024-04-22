
let soundActive = false;
let audioEffectsActive = true;

let BACKGROUND_SOUND = new Audio('audio/pepe_background_sound2.mp3');
let COLLECTED_BOTTLE = new Audio('audio/collect_bottle.mp3');
let COLLECTED_COIN = new Audio('audio/collect_coin.mp3');

let WALKING_SOUND = new Audio('audio/Walking_pepe.mp3');
let JUMPING_SOUND = new Audio('audio/pepe_jump.mp3');
let HURT_SOUND = new Audio('audio/pepe_hurt.mp3');
let SNORING_SOUND = new Audio('audio/pepe_snoring.mp3');

let MIDDLE_CHICKEN_HURT = new Audio('audio/middle_chicken_hurt.mp3');
let LITTLE_CHICKEN_HURT = new Audio('audio/little_chicken_hurt.mp3');

let ENDBOSS_GETS_HURT_LONG_CROW = new Audio('audio/endboss_hurt.mp3');
let ENDBOSS_GETS_HURT = new Audio('audio/endboss_hurt2.mp3');

let BOTTLE_BREAKS = new Audio('audio/breaking_bottle.mp3');
let THROW_BOTTLE_SOUND = new Audio('audio/throw_bottle.mp3');

BACKGROUND_SOUND.volume = 0.8;
BACKGROUND_SOUND.loop = true;
COLLECTED_BOTTLE.volume = 0.8;
COLLECTED_COIN.volume = 0.5;
WALKING_SOUND.volume = 0.7;
MIDDLE_CHICKEN_HURT.volume = 0.5;
LITTLE_CHICKEN_HURT.volume = 0.5;

function toggleBackgroundMusic() {
    soundActive = !soundActive;
    audioEffectsActive = soundActive;
    updateBackgroundMusic();
    updateSoundEffects();
}

function updateBackgroundMusic() {
    let toggleImg = document.getElementById('toggle_sound_btn');
    if (soundActive) {
        BACKGROUND_SOUND.play().catch(e => console.error("Fehler beim Abspielen der Hintergrundmusik: ", e));
        toggleImg.src = './img/sound_on.png';
    } else {
        BACKGROUND_SOUND.pause();
        toggleImg.src = './img/sound_mute.png';
    }
}

function playAudio(audio) {
    if (soundActive && audioEffectsActive) {
        if (audio.paused) {
            audio.play().catch(e => console.error("Fehler beim Abspielen des Sounds: ", e));
        }
    }
}

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
        ENDBOSS_GETS_HURT
    ];

    if (!soundActive) {
        allSounds.forEach(audio => {
            audio.pause();
        });
    }

    function pauseAudio(audio) {
        if (!audio.paused) {
            audio.pause();
        }
    }

}
