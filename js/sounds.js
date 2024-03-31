
let soundActive = false;


let BACKGROUND_SOUND = new Audio('audio/pepe_background_sound2.mp3');
let COLLECTED_BOTTLE = new Audio('audio/collect_bottle.mp3');
let COLLECTED_COIN = new Audio('audio/collect_coin.mp3');

















function playAudio(audio) {
    if (!soundActive && audio) {
        audio.play();
    }
}