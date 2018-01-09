// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

app.use(express.static('public'));

app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/whoami",function(req,res){
  var myip = req.headers['x-forwarded-for'].split(',')[0] || 
     req.connection.remoteAddress || 
     req.socket.remoteAddress ||
     (req.connection.socket ? req.connection.socket.remoteAddress : null);
    
  var o = { 
    ip       : myip, 
    software : req.headers['user-agent'],
    language : req.headers['accept-language'].split(';')[0]
  };
  
  res.send(o);
});

// listen for requests 
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
