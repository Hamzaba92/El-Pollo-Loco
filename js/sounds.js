
let soundActive = false;

WALKING_SOUND = new Audio('audio/walking_pepe.mp3');
JUMPING_SOUND = new Audio('audio/pepe_jump.mp3');
BACKGROUND_SOUND = new Audio('audio/pepe_background_sound2.mp3');


















function playAudio(audio) {
    if (!soundActive && audio) {
        audio.play();
    }
}