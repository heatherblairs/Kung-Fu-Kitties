$(document).ready(function(){
   $('#usernameSubmit').submit(function(event) {
     event.preventDefault();
     var username = $('#username').val();
     $("p").append("USERNAME SAVED");
    localStorage.setItem('username', username);
    localStorage.setItem('score', score);
    });

  $('.catClass').click(function(event) {
    event.preventDefault();
    selectedCat = $(this).val();
    localStorage.setItem('selectedCat', selectedCat);
    window.location = "/instructions/index.html";
  });
});
