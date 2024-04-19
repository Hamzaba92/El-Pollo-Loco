let soundActive = false;  
let audioEffectsActive = true;  

let BACKGROUND_SOUND = new Audio('audio/pepe_background_sound2.mp3');
let COLLECTED_BOTTLE = new Audio('audio/collect_bottle.mp3');
let COLLECTED_COIN = new Audio('audio/collect_coin.mp3');

BACKGROUND_SOUND.volume = 0.8;
BACKGROUND_SOUND.loop = true;
COLLECTED_BOTTLE.volume = 0.8;
COLLECTED_COIN.volume = 0.5;

function toggleBackgroundMusic() {
    soundActive = !soundActive;
    updateBackgroundMusic();
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
    if (audioEffectsActive && audio.paused) {
        audio.play().catch(e => console.error("Fehler beim Abspielen des Sounds: ", e));
    }
}

