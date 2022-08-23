var app = require('express')();
const express = require("express");
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 80;

let message = [];
let idlist = [];
let Rid=0;

app.use(express.static(__dirname + "/public"), (_, res, next) => {
    res.status(200)
    res.sendFile(__dirname + "/public/index.html")
  });


io.on('connection', function(socket){
//  const ipAddress = socket.handshake.address
  idlist.push({
    id:Rid,
//    ip:ipAddress,
  });

  console.log(idlist)

  io.emit('connection ID', Rid);
    let datalong = Object.keys(message).length;
    io.emit('reset chat', 'message updated');
    for(let i=0;i<datalong;i++){
        console.log(message[i].message);
        io.emit('chat message', message[i]);
    }
  socket.on('chat message', function(msg){
    message.push({message:msg});
    let datalong = Object.keys(message).length;
    io.emit('reset chat', 'message updated');
    for(let i=0;i<datalong;i++){
        console.log(message[i].message);
        io.emit('chat message', message[i]);
    }
  });
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});

