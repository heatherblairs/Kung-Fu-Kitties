$(document).ready(function(){
   $('#usernameSubmit').submit(function(event) {
     event.preventDefault();
     var username = $('#username').val();
    console.log(username);
    localStorage.setItem('username', username);
    localStorage.setItem('score', score);
  });
});
