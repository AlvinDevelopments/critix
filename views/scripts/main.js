// document.addEventListener('DOMContentLoaded', () => {
//   console.log('Hello Bulma!');
// });



function loadPosts(){


  $.ajax({
    type: 'GET',
    url: '/discover',
    headers:{
      'Access-Control-Allow-Origin': '*',
    },
    success: function(result,status,xhr){
      console.log('retrieved images');
      // res.append("LOL");
      console.log(result);

      // // for(let i = 0; ;i++){
      // result.posts.forEach( function(post){
      //   $('#containerz').append('<div class="row">');
      //   for(let j = 0; j<3;j++){
      //     $('#containerz').append('<div class="col s11 m3">');
      //     $('#containerz').append('<div class="thumbnail hoverable">');
      //     $('#containerz').append('<a href="/post/');
      //     $('#containerz').append(typeof post._id.toString() !='undefined' ? post._id.toString():'');
      //     $('#containerz').append('"> <img class="post" src="/uploads/images/');
      //     $('#containerz').append(typeof post.post_id !='undefined' ? post.post_id:'');
      //     $('#containerz').append('" type="image/');
      //     $('#containerz').append(post.filetype);
      //     $('#containerz').append('"></a>');
      //
      //   }
      //   $('containerz').append('</div>');
      //   console.log($('#containerz'));
      // });

      let html = '';
      let count = 0;
      let numCols = 4;

      html+='<div class="section"></div>';
      html+='<div class="section"></div>';
      html+='<div class="row">';

      result.posts.forEach( function(post){

          if(count>=numCols){
            html+='</div>';
            // html+='<div class="section"></div>';
            html+='<div class="row">';
            count = 0;
          }

          html+='<div class="col s11 m3">';
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

      $('#containerz.container').html(html);


    }
  });




}
