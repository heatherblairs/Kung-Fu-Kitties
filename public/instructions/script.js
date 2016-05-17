$(document).ready(function(){
  $(window).keypress(function(e) {
    if (e.keyCode == 0 || e.keyCode == 32) {
      console.log('iagooooo!');
      window.location = "/main_game/index.html";
      // $(document).location.pathName = "/main_game/index.html"
    }
  });
});
