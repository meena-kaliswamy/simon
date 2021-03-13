var buttonColors = ["green", "red", "yellow", "blue"];
var gamePattern = [];
var userClickedPattern = [];
var randomNumber, randomChosenColor, userChosenColor, audio;
var level = 0;



// Begin Game - If game has not started (level=0), document awaits a keyboard press. Next color in sequence is shown and game begins.

$(document).on("keydown", function() {
  if (level === 0) {
    nextInSequence();
  }
});



// Game Play - After game begins and nextInSequence shown, btn waits to be clicked on. User's color selection is recorded in userClickedPattern. We check to see if selection matches gamePattern.

$(".btn").on("click", function() {
  if (level !== 0) {
    userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animate("#" + userChosenColor, 100, "pressed");

    checkAnswer((userClickedPattern.length) - 1);
  }
});



// Check User's Pattern - If user's currently pressed color matches the corresponding color of the same index in gamePattern, continue.

function checkAnswer(currIndex) {
  if (userClickedPattern[currIndex] === gamePattern[currIndex]) {

    // If userClickedPattern = gamePattern entirely, then go to next sequence.

    if (userClickedPattern.length === gamePattern.length) {
      userClickedPattern = [];

      setTimeout(function() {
        nextInSequence();
      }, 1000);
    }
  }

  // Game Over - If user's color choice does not match matching index color of gamePattern, reset level, userClickedPattern, and gamePattern.

  else {
    $("h1").text("Game Over, Press Any Key to Restart");

    playSound("wrong");
    animate("body", 200, "game-over");

    level = 0;
    userClickedPattern = [];
    gamePattern = [];
  }
}



// Next Color in Sequence - Random color selected, appended to gamePattern, corresponding box flashed and sound played.

function nextInSequence() {
  randomNumber = Math.floor(Math.random() * 4);
  randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  flash(randomChosenColor);
  playSound(randomChosenColor);

  $("h1").text("Level " + (++level));
}



// Flashing Button - When computer shows next color in gamePattern, it fades in and out the button of said color.

function flash(color) {
  $("#" + color).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
}



// Sound of Button - When computer shows next color in gamePattern and when user clicks on a button, the corresponding audio for said color is played.

function playSound(sound) {
  audio = new Audio("sounds/" + sound + ".mp3");
  audio.play();
}



// Animated Button - When user clicks button, a shadow and box color class titled "pressed" from styles.css is temporarily applied to visualize user's press.

function animate(whereToApply, sec, className) {
  $(whereToApply).addClass(className).delay(sec).queue(function(next) {
    $(whereToApply).removeClass(className);
    next();
  });
}
