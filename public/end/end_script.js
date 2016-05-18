$(document).ready(function(){
  var username = localStorage.getItem("username");
  var finalScore = localStorage.getItem("score");

  $('body').append(username + ", you have earned " + finalScore + " points!");
  console.log(finalScore);
});
