// var express = require('express');

var mongoose = require('mongoose');

// Socket.io stuff
var express = require('express');
var app = express();
var http = require('http').createServer(app);
//var http = app.listen(1337);
var io = require('socket.io')(http);
var port = process.env.PORT || 3001;


app.set('view engine', 'ejs');

http.listen( port, function () {
  console.log('LISTENING PORT: ', port);
})

// Connection from user
io.on('connection', function (socket) {
  console.log('NEW CONNECTION');

  socket.on('my other event', function (data) {
    console.log('asdfasdfa');
    console.log(data);
  });
});
