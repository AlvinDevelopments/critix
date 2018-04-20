function fetchComments(id){

  let res = $('#comments');
  // console.log(res);
  // res.append('lolofwefleowflweoflwefloweflwfelfl');
  console.log('fetching!!!');
  // console.log(id);
  $.ajax({
    type: 'GET',
    url: '/loadComments',
    data: {post_id:id},
    headers:{
      'Access-Control-Allow-Origin': '*',
    },
    success: function(result,status,xhr){
      console.log('retrieved comments!!');
      // res.append("LOL");
      console.log(result);

      result.forEach(function(comment){
        res.append(comment.comment);
        res.append('<br>');
      })

    }
  });
}


function postComment(id){
  console.log("posting!!!");
  // let c = $('#comment').find('input[name="comment"]').val();
  let c = $('#comment').val();
  console.log(c);
  $.ajax({
    type: 'POST',
    url: '/postComment',
    data: {comment:c,post_id:id},
    headers:{
      'Access-Control-Allow-Origin': '*',
    },
    success: function(result,status,xhr){
      let res = $('#comments');
      console.log("success!!");
      console.log(result);
      // res.append(result);
      fetchComments(id);
    }
  });
}
