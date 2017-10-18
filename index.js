var express = require ('express');
var app = express();

var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(2017, function(){
  console.log("server port 2017");
  io.on('connection', function (socket) {
    console.log("There is a client's connection");
    socket.on('Name',function(data){
      console.log(data)
      data = "Received: "+data
      socket.emit('Data',data)
    })
    });
})
