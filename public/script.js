$(function () {
    var socket = io();
    $('form').submit(function(){
      let send_data = {
        name:$('#name').val(),
        main:$('#textarea').val(),
      }
      socket.emit('chat message', send_data);
      $('#textarea').val('');
      return false;
    });
    socket.on('reset chat', function(msg){
        console.log(msg);
        $("#messages").html('');
    });

    socket.on('chat message', function(msg){
        console.log(msg.main);
      $('#messages').append($('<div class="sol"><span class="u_name">'+msg.name+"</span><br><a class='u_msg'>"+msg.main+"</a>"));
      window.scrollTo(0, document.body.scrollHeight);
    });
  });