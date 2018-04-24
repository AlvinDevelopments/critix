$(function chatHandler() {
    var socket = io();

    // This is the form for the comments
    $('#commentForm').submit(function chatHandler(){
        socket.emit('chat', $('#postComment').val());
        $('#postComment').val('');
        return false;
    });

     // For Comments
     // Displays all comments
     socket.on('chat', function chatHandler(msg){
         $('#comments').append($('<li>').html(msg));
         scroll();
     });

     function commentDB(){
    console.log('asdfasdfa');
}
     /*
    socket.on('chat', function chatHandler(msg){
    $('#comments').append($('<li>').html(msg));
    scroll();
    });*/

});


function commentDB(){
    document.getElementById("commentsReceive").innerHTML = "fuck yes"; 

}