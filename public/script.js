$(function () {
    var uuid;
    var cookies = document.cookie; //全てのcookieを取り出して
    var cookiesArray = cookies.split(';'); // ;で分割し配列に
    
    for(var c of cookiesArray){ //一つ一つ取り出して
        var cArray = c.split('='); //さらに=で分割して配列に
        if( cArray[0] == 'uuid'){ // 取り出したいkeyと合致したら
            console.log(cArray);  // [key,value] 
            $(".urid").html(cArray[1]);
            uuid = cArray[1];
        }
    }

    var socket = io("ws://localhost:80");
    $('form').submit(function(){
      let send_data = {
        name:$('#name').val(),
        main:$('#textarea').val(),
        uuid:uuid,
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
      $('#messages').append($('<div class="sol"><span class="u_name">'+msg.name+"</span><span class='u_uuid'>id:"+msg.uuid+"</span><br><a class='u_msg'>"+msg.main+"</a>"));
      window.scrollTo(0, document.body.scrollHeight);
    });
  });