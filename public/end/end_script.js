$(document).ready(function(){
  var username = localStorage.getItem("username");
  var finalScore = localStorage.getItem("score");

  $('h1').append(username + ", you earned " + finalScore + " points!");
  console.log(finalScore);
});
