function loadPosts(){


  $.ajax({
    type: 'GET',
    url: '/discover',
    headers:{
      'Access-Control-Allow-Origin': '*',
    },
    success: function(result,status,xhr){

      let html = '';
      let count = 0;
      let numCols = 4;

      // html+='<div class="valign-wrapper">';
      // html+='<div class=" halign-wrapper">';
      html+='<div class="section"></div>';
      html+='<div class="section"></div>';
      html+='<div class="row">';

      console.log(result);

      result.posts.forEach( function(post){

          if(count>=numCols){
            html+='</div>';
            // html+='<div class="section"></div>';
            html+='<div class="row">';
            count = 0;
          }

          html+='<div class="col s12 m6 l3">';
          html+='<div class="thumbnail hoverable">';
          html+='<a href="/post/';
          html+=typeof post._id.toString() !='undefined' ? post._id.toString():'';
          html+='"> <img class="" src="/uploads/images/';
          html+=typeof post.post_id !='undefined' ? post.post_id:'';
          html+='" type="image/';
          html+=post.filetype;
          html+='"></a>';
          html+='</div>';
          html+='</div>';
          count++;

      });

      // html+='</div>';
      $('#containerz.container').html(html);

    }
  });

}
