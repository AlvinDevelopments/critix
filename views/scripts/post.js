
// Get the input field
function setEnter(){

  console.log("listening...");
  var input = $('#comment');
  console.log(input);
  // Execute a function when the user releases a key on the keyboard
  input.keydown(function(event) {
    console.log("listening...");

    if (event.keyCode === 13) {
      // Cancel the default action, if needed
      event.preventDefault();
      console.log("DO NOT CLICK!!!");
      // Trigger the button element with a click
      document.getElementById("btnComment").click();
    }
  });
}


function fetchComments(id){

  let res = $('#comments');
  // console.log(res);
  // res.append('lolofwefleowflweoflwefloweflwfelfl');
  console.log('fetching!!!');
  // console.log(id);
  $.ajax({
    type: 'POST',
    url: '/loadComments',
    data: {post_id:id},
    headers:{
      'Access-Control-Allow-Origin': '*',
    },
    success: function(result,status,xhr){
      console.log('retrieved comments!!');
      // res.append("LOL");
      console.log(result);

      // this implementation may be time and resource heavy, iterating all comments....
      res.empty();
      result.reverse().forEach(function(comment){
        res.append('<div class="user_comment">');
        res.append('<a style="font-weight:bold;" href="/user/"'+comment.author+'">'+comment.author+'</a> ');
        res.append(comment.comment);
        res.append('      '+comment.time.slice(0,10).replace(/-/g,"/"));
        res.append('</div>');
        res.append('<br>');
      });

    }
  });
}


function postComment(id){
  console.log("posting!!!    "+id);
  // let c = $('#comment').find('input[name="comment"]').val();
  let c = $('#comment').val();
  console.log(c);
  $.ajax({
    type: 'POST',
    url: '/postComment',
    data: {comment:c,post_id:id},
    headers:{
      'Access-Control-Allow-Origin': '*',
      'processData': 'false',
    },
    success: function(result,status,xhr){
      $('#comment').val('');
      let res = $('#comments');
      console.log("success!!");
      console.log(result);
      // res.append(result);
      fetchComments(id);
    }
  });

return false;

}
