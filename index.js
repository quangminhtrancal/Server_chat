var express = require ('express');
var app = express();

var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(2016, function(){
  console.log("server port 2016");
  io.on('connection', function (socket) {
    console.log("There is a client's connection");
    socket.emit('news', { hello: 'world' });
    socket.on('my other event', function (data) {
    console.log(data);
  });
});
})
