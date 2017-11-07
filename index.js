var express = require ('express');
var app = express();

var server = require('http').Server(app);
var io = require('socket.io')(server);

// 1. require mongoose
const  mongoose = require('mongoose')
//  2. connect
mongoose.connect('mongodb://localhost/myDatabase1')
//  3. schema
const userSchema = new mongoose.Schema({
  name: String,
  age: Number
})
//  4.model
const user = mongoose.model('user',userSchema)
//  5.CRUD

server.listen(2017, function(){
  console.log("server port 2017");
  io.on('connection', function (socket) {
    console.log("There is a client's connection");
    socket.emit('Data',"Server received connection")
    socket.on('Name',function(data){
      console.log(data)
      data = "Received: "+data
      socket.emit('Data',data)
      socket.emit('Data',args)
      console.log("socket id: "+socket.id)
    })

    socket.on('create',function(data1){
      var array=data1.split(",")
      user.create({
        name: array[0],
        age: array[1]
      })

    })
    socket.on('find',function(data1){
      user.find().exec((err, users))
      socket.emit('find',users)
      console.log(users)

    })
    socket.on('insert',function(data1){
      var array=data1.split(",")
      user.insert({name:array[0],age:array[1]})
      socket.emit('insert',"Done insertion")
    })
    socket.on('update',function(data1){
      var array=data1.split(",")
      user.update({name: array[0]},{name: array[1]},function(err,result){
        if (err) throw err
        console.log(result);
        socket.emit('update',"Done update");
      })

    })
    socket.on('remove',function(data1){
      user.remove({name:data1})
      socket.emit('remove',"Done remove")

    })





});
})
