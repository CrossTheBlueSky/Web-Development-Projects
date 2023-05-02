const buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let playerPattern = [];
let level = 0;
const redSound = new Audio('sounds/red.mp3');
const blueSound = new Audio('sounds/blue.mp3');
const greenSound = new Audio('sounds/green.mp3');
const yellowSound = new Audio('sounds/yellow.mp3');
const wrongSound = new Audio('sounds/wrong.mp3');


$(document).on("keydown", nextSequence);

$(".btn").on("mousedown", function() {
    $(this).addClass("pressed");
});

$(document).on("mouseup", function() {
    $(".btn").removeClass("pressed");
});

$(".btn").on("click", function() {
    playerPattern.push($(this).attr('id'));
    matchChecker();
});

function nextSequence() {

    playerPattern = [];
    randomNumber = Math.floor(Math.random() * 4);
    randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    level++
    $("#level-title").text("Level " + level);

    for (let i = 0; i < gamePattern.length; i++) {
        setTimeout(() => { sequenceAnimator(i); }, 1000 * i);
    }
}


function sequenceAnimator(currentColour) {


    switch (gamePattern[currentColour]) {

        case "red":
            redSound.play();
            $("#red").fadeOut(400).fadeIn(400);

            break;

        case "blue":

            blueSound.play();
            $("#blue").fadeOut(400).fadeIn(400);

            break;

        case "green":

            greenSound.play();
            $("#green").fadeOut(400).fadeIn(400);
            break;

        case "yellow":

            yellowSound.play();
            $("#yellow").fadeOut(400).fadeIn(400);
            break;

        default:
            wrongSound.play();
            alert("You broke the game. Somehow.");
            break;
    }
}

function matchChecker() {

    if (playerPattern[playerPattern.length - 1] != gamePattern[playerPattern.length - 1]) {
        wrongSound.play();
        alert("you lose, bub");
        resetGame();
    } else if (playerPattern.length === gamePattern.length) {
        soundPlayer(playerPattern[playerPattern.length - 1]);
        setTimeout(nextSequence, 1000);
    } else {
        soundPlayer(playerPattern[playerPattern.length - 1]);
    }



}

function soundPlayer(whichSound) {
    switch (whichSound) {
        case "red":
            redSound.play();
            break;
        case "blue":
            blueSound.play();
            break;
        case "green":
            greenSound.play();
            break;
        case "yellow":
            yellowSound.play();
            break;
        default:
            wrongSound.play();
            break;
    }
}

function resetGame() {
    gamePattern = [];
    playerPattern = [];
    nextSequence();
}