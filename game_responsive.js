var gamePattern = [];
var userPattern = [];
var key = false;
var level = 0;

var buttonColor  = ["red", "blue", "green", "yellow"];


// Press a key to start
// $(document).keydown(function() {
//   if (!key) {
//     $("#level-title").text("Level " + level);
//     nextSeq();
//     key = true;
//   }
// });


// Touch the screen to start
$("#icon").on("touchend",function() {
  if (!key) {
    $("#level-title").text("Level " + level);
    nextSeq();
    key = true;
  }
});



// To start the first sequence and continue the next sequences
function nextSeq(){
  userPattern = [];
  level++;
  $("#level-title").text("Level " + level);

  var randNum = Math.random()*4;
  randNum = Math.floor(randNum);

  var randomColor = buttonColor[randNum];
  gamePattern.push(randomColor);

  $("#" + randomColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomColor);
}


//Calling animation, sounds and adding the color to userPattern[] when user clicks button
// $(".btn").click(function(){
//   var userChosen = this.id;
//   userPattern.push(userChosen);
//   animatePress(userChosen);
//   playSound(userChosen);
//
//   checkSeq(userPattern.length-1);
// });


// Touching next buttons
$(".btn").on("touchend", function(){
  var userChosen = this.id;
  userPattern.push(userChosen);
  animatePress(userChosen);
  playSound(userChosen);

  checkSeq(userPattern.length-1);
});


//To check user and game pattern
function checkSeq(currLevel){
  if (gamePattern[currLevel] === userPattern[currLevel]){
    console.log("W");
    if(gamePattern.length === userPattern.length)
    {
      setTimeout(function () {
          nextSeq();
        }, 1000);
    }
  }
  else{
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    },200);
    $("#level-title").text("Game Over, Click Again to Start");
    restart();
  }
}



//Restart game
function restart(){
  gamePattern = [];
  level = 0;
  key = false;
}

//Sounds and animation on clicking
function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}


function animatePress(currentColor){
  $("#" + currentColor).addClass("pressed");

  setTimeout(function(){
    $("#" + currentColor).removeClass("pressed");
  },100);
}
