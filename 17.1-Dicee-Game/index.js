var player1Score;
var player2Score;

function diceRoller() {
    diceRoll = Math.floor((Math.random() * 6) + 1);

    return diceRoll;
}


function playGame(playerSelect) {
    if (playerSelect = 1) {
        diceRoller();
        player1Score = diceRoll;
        imageSetter(1);
    }
    if (playerSelect = 2) {
        diceRoller();
        player2Score = diceRoll;
        imageSetter(2);
    }

}

function imageSetter(whichPlayer) {
    whichDie = "images/dice" + diceRoll + ".png";
    diePicker = "#die-result-" + whichPlayer;
    document.querySelector(diePicker).src = whichDie;


}



function whoWon() {

    if (player1Score > player2Score) {
        document.querySelector("h1").innerHTML = "Player 1 Wins!"
    } else if (player1Score < player2Score) {
        document.querySelector("h1").innerHTML = "Player 2 Wins!"
    } else {
        document.querySelector("h1").innerHTML = "It's a tie!"
    }

}

playGame(1);
playGame(2);
whoWon();