var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

$(document).keypress(function() {
  if (level === 0) {
    $("h1").text("Level " + level);
    nextSequence();
  }

});

$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);

});

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {

    console.log("success");

    if (userClickedPattern.length === gamePattern.length) {

      userClickedPattern=[];
      setTimeout(function() {
        nextSequence();
      }, 1000);

    }
    
  } else {
    console.log("wrong");

      $("h1").text("Game Over, Press Any Key to Restart");
      playSound("wrong");
      $("body").addClass("game-over");
      setTimeout(function(){
        $("body").removeClass("game-over");
      },200);
      startOver();
  }
}

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColors[randomNumber];
  gamePattern.push(randomChosenColour);


  //$("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  $("#" + randomChosenColour).addClass("pressed");
  setTimeout(function() {
    $("#" + randomChosenColour).removeClass("pressed");
  }, 100);

  playSound(randomChosenColour);

  level++;
  $("h1").text("Level " + level);

}





function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}


function startOver(){
  level=0;
  gamePattern=[];
  userClickedPattern=[];
}
