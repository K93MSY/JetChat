var app = require('express')();
const express = require("express");
var http = require('http').Server(app);
var io = require('socket.io')(http);
const fs = require("fs");
const { v4: uuidv4 } = require('uuid');
var port = process.env.PORT || 80;

let message = [];
let uuid_list = [];

function writeFile(path, data) {
  const jsonStr = JSON.stringify(data);
  fs.writeFile(path, jsonStr, (err) => {
    if (err) rej(err);
    if (!err) {
      //console.log('JsonUpdated');
      //console.log(data);
    }
  });
}

app.use(express.static(__dirname + "/public"), (_, res, next) => {
  let uid = uuidv4();
  console.log(uid);
  uuid_list.push(uid);
  writeFile('./log/uuid.json',uuid_list)
    res.cookie('uuid',uid, {
      maxAge: 1000*60*60*24,
    })
  res.status(200)
  res.sendFile(__dirname + "/public/index.html")
  });


io.on('connection', function(socket){

    let datalong = Object.keys(message).length;
    io.emit('reset chat', 'message updated');

    for(let i=0;i<datalong;i++){

        console.log(message[i].message);

        io.emit('chat message', message[i]);
    }

    socket.on('chat message', function(msg){

    console.log(msg)

    message.push(msg);
    writeFile('./log/log.json',message)

    let datalong = Object.keys(message).length;

    io.emit('reset chat', 'message updated');

    for(let i=0;i<datalong;i++){

        console.log(message[i].main);

        io.emit('chat message', message[i]);
    }
  });
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});

