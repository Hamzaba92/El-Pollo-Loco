
let soundActive = false;


let BACKGROUND_SOUND = new Audio('audio/pepe_background_sound2.mp3');
let COLLECTED_BOTTLE = new Audio('audio/collect_bottle.mp3');
let COLLECTED_COIN = new Audio('audio/collect_coin.mp3');

let LITTLE_CHICKEN_HURT = new Audio('audio/little_chicken_hurt.mp3');
let ENDBOSS_HURT_1 = new Audio('audio/endboss_hurt.mp3');
let ENDBOSS_HURT_2 = new Audio('audio/endboss_hurt2.mp3');















function playAudio(audio) {
    if (!soundActive && audio) {
        audio.play();
    }
}