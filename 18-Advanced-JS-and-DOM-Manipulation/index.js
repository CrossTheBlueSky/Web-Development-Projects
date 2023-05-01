const allButtons = document.querySelectorAll(".drum");
var drumSound = new Audio('sounds/tom-1.mp3');

for (i = 0; i < allButtons.length; i++) {
    allButtons[i].addEventListener("mousedown", function() {
        var buttonInnerHTML = this.innerHTML;
        makeSound(buttonInnerHTML);
        buttonAnimation(buttonInnerHTML);
    });

    allButtons[i].addEventListener("mouseup", function() {
        var buttonInnerHTML = this.innerHTML;
        buttonReset(buttonInnerHTML);
    });

}

document.addEventListener("keydown", function(event) {

    var whichKeyPressed = event.key;
    makeSound(whichKeyPressed);
    buttonAnimation(whichKeyPressed);
});


document.addEventListener("keyup", function(event) {

    var whichKeyPressed = event.key;
    buttonReset(whichKeyPressed);
});

function makeSound(key) {



    switch (key) {
        case "w":
            var crashSound = new Audio('sounds/crash.mp3');
            crashSound.play();
            break;
        case "a":
            var kickSound = new Audio('sounds/kick-bass.mp3');
            kickSound.play();
            break;
        case "s":
            var snareSound = new Audio('sounds/snare.mp3');
            snareSound.play();
            break;
        case "d":
            var tom1Sound = new Audio('sounds/tom-1.mp3');
            tom1Sound.play();
            break;
        case "j":
            var tom2Sound = new Audio('sounds/tom-2.mp3');
            tom2Sound.play();
            break;
        case "k":
            var tom3Sound = new Audio('sounds/tom-3.mp3');
            tom3Sound.play();
            break;
        case "l":
            var tom4Sound = new Audio('sounds/tom-4.mp3');
            tom4Sound.play();
            break;

        default:
            console.log(this);
            break;
    }
}



function buttonAnimation(currentKey) {

    var activeButton = document.querySelector("." + currentKey);
    activeButton.classList.add("pressed");



}

function buttonReset(currentKey) {

    var activeButton = document.querySelector("." + currentKey);
    activeButton.classList.remove("pressed");



}
/*allButtons.forEach(addEventListener("click", function() {
    this.style.color = "green";

    drumSound.play();
}))


var drumSound = new Audio('sounds/tom-1.mp3');
drumSound.play();*/