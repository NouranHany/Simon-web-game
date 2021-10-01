var beatSeq = [];
var currBeat = 0;
var gameIsOver = true;
var currLevel = 0;

$(".btn").click(function(e) {
  if (!gameIsOver) {
    animateButton(this.getAttribute("id"));

    if (currBeat < beatSeq.length) {
      if (beatSeq[currBeat] == this.getAttribute("id")) {
        currBeat++;
        if(currBeat == beatSeq.length){
          setTimeout(generateNewBeat,400);
          updateLevel();
          currBeat = 0;
        }
      } else {
        currBeat = 0;
        gameOver();
      }
    }
  } else {
    toggleClass(100,"game-over","body");
    playSound("sounds/wrong.mp3");
  }
});

$(document).keydown(function() {
  if (gameIsOver) {
    gameIsOver = false;
    generateNewBeat(); //generate the first beat
    updateLevel();
  }
});

function updateLevel() {
  currLevel++;
  $("h1").text("Level " + currLevel);
}

function gameOver() {
  $("h1").text("Game Over, Press Any Key to Restart");
  toggleClass(100,"game-over","body");
  playSound("sounds/wrong.mp3");
  resetGameData();
}


function generateNewBeat() {
  var nextBeat = Math.floor(Math.random() * 4) + 1;
  switch (nextBeat) {
    case 1:
      animateButton("green");
      beatSeq.push("green");
      break;
    case 2:
      animateButton("red");
      beatSeq.push("red");
      break;
    case 3:
      animateButton("blue");
      beatSeq.push("blue");
      break;
    case 4:
      animateButton("yellow");
      beatSeq.push("yellow");
      break;
    default:
      console.log("error in switch case");
  }
}

function animateButton(color) {
  toggleClass(100,"pressed","." + color);
  playSound("sounds/" + color + ".mp3");
}

function resetGameData(){
  currBeat = 0;
  gameIsOver = true;
  currLevel = 0;
  beatSeq = [];
}

function toggleClass(milliseconds,className,selector){
  $(selector).addClass(className);
  setTimeout(function() {
    $(selector).removeClass(className);
  }, milliseconds);
}

function playSound(path){
  var audio = new Audio(path);
  audio.play();
}
