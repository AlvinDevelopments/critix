
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

        // let img = document.createElement("img");
        // img.setAttribute('src',post._id.toString());
        // img.setAttribute('height', '1px');
        // img.setAttribute('width', '1px');
        //
        // let thumbnail = getThumbnail(img, 1/5);
        // document.body.appendChild(thumbnail);
        // console.log(thumbnail);

          if(count>=numCols){
            html+='</div>';
            // html+='<div class="section"></div>';
            html+='<div class="row">';
            count = 0;
          }

          html+='<div class="col s12 m6 l3">';
          html+='<div id="';
          html+=post._id.toString();
          html+='"class="thumbnail hoverable">';
          // html+='<a href="/post/';
          html+='<a class="modal-trigger" href="#modal_post" onclick="loadModalImg(';
          html+="'"
          html+=post._id.toString();
          html+="'"
          // html+='); socketListener();';
          html+=');';
          // html+=typeof post._id.toString() !='undefined' ? post._id.toString():'';
          html+='">';
          html+='<img class="" src="/uploads/images/';
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


function getThumbnail(original, scale) {
  var canvas = document.createElement("canvas");

  canvas.width = original.width * scale;
  canvas.height = original.height * scale;

  canvas.getContext("2d").drawImage(original, 0, 0, canvas.width, canvas.height);

  return canvas
}
