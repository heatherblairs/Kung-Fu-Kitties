var request = new XMLHttpRequest();
request.onreadystatechange = function(){
 if (request.readyState == 4 && request.status == 200) {
var parse =   JSON.parse(request.responseText);
   console.log(parse);
     var quote =(parse.contents.quotes[0].quote);
 $(".scroll").append(quote);
     console.log(quote);
 JSON.parse(request.responseText);
 }
};

request.open("GET", "http://quotes.rest/qod.json");

request.send();
