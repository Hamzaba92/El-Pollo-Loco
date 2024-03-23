
let soundActive = false;


BACKGROUND_SOUND = new Audio('audio/pepe_background_sound2.mp3');


















function playAudio(audio) {
    if (!soundActive && audio) {
        audio.play();
    }
}