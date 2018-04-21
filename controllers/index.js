// var express = require('express');

var mongoose = require('mongoose');

// Socket.io stuff
var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

http.listen( port, function () {
  console.log('LISTENING PORT: ', port);
})

app.use(express.static(__dirname + '/public'));
app.set('views','./views');


app.get('/',(req, res) => {
  res.render('index')
})



io.on('connection', function(socket){
  console.log('BROWSER CONNECTED');
})
























