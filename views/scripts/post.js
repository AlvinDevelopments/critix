function socketListener(id){

  console.log('window opened');

  var socket = io.connect();

  socket.on('get update', function(msg){
      console.log('getting new updates');
      fetchComments(id);
  });

  $('#btnComment').click(function(event){
      $('#comment').val('');
      console.log('button pressed');
      socket.emit('ping update', 'lol');
  });

}


// Get the input field
function setEnter(){

  // console.log("listening...");
  var input = $('#clickable');
  // console.log(input);
  // Execute a function when the user releases a key on the keyboard

  input.focusin(function(){
      $('#placeholder').css('opacity',0);
  });

  input.focusout(function(){
      if($('#comment').val()==''){
        $('#placeholder').css('opacity',100);
      }
  });

  input.keydown(function(event) {
    // console.log("listening...");

    if (event.keyCode === 13) {
      // Cancel the default action, if needed
      event.preventDefault();
      // console.log("DO NOT CLICK!!!");
      // Trigger the button element with a click
      document.getElementById('btnComment').click();

    }
  });

  return false;
}


function fetchComments(id){

  let res = $('#comments');
  // console.log(res);
  // res.append('lolofwefleowflweoflwefloweflwfelfl');
  // console.log('fetching!!!');
  // console.log(id);
  $.ajax({
    type: 'POST',
    url: '/loadComments',
    data: {post_id:id},
    headers:{
      'Access-Control-Allow-Origin': '*',
    },
    success: function(result,status,xhr){
      // console.log('retrieved comments!!');

      // this implementation may be time and resource heavy, iterating all comments....
      res.empty();
      result.reverse().forEach(function(comment){
        res.append('<div class="user_comment">');
        res.append('<a class="col s12" style="font-weight:bold;" href="/user/"'+comment.author+'">'+comment.author+'</a> ');
        res.append(comment.comment);
        res.append('      '+comment.time.slice(0,10).replace(/-/g,"/"));
        res.append('</div>');
        res.append('<br>');
      });

    }
  });
}


function postComment(id){
  // var socket = io.connect();
  console.log("posting!!!    "+id);
  // let c = $('#comment').find('input[name="comment"]').val();
  let c = $('#comment').val();
  // console.log(c);
  $.ajax({
    type: 'POST',
    url: '/postComment',
    data: {comment:c,post_id:id},
    headers:{
      'Access-Control-Allow-Origin': '*',
      'processData': 'false',
    },
    success: function(result,status,xhr){
      fetchComments(id);
      // let res = $('#comments');
      // fetchComments(id);
    }
  });

return false;

}
