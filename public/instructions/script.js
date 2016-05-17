$(document).ready(function(){
  $(window).keypress(function(e) {
    if (e.keyCode == 0 || e.keyCode == 32) {
      console.log('Space pressed');
    }
  });
})
