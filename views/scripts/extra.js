// contains client javascript
// loggedIn = false;


function checkIfLoggedIn(){
  let res = false;
  $.ajax({
    async: false,
    type: 'POST',
    url: '/checkIfLoggedIn',
    headers:{
      'Access-Control-Allow-Origin': '*',
      'processData': 'false',
    },
    success: function(result,status,xhr){
      res = result;
      // print(result);
    }
  });

  return res;
}

// function to run all initialization functions
function critixInit() {
// toggle sidebar menu on mobile
    $(document).ready(function(){
        $('.sidenav').sidenav();
    });

// init modal plugin
    let modalelem = document.querySelector('.modal');
    let modalpost = document.querySelector('#modal_post');
    let modallogin = document.querySelector('#loginModal');
    let modalupload = document.querySelector('#uploadModal');
    let modalsignup = document.querySelector('#signupModal');

    let inst_elem = M.Modal.init(modalelem, {opacity: 0.8}); // load default presets
    // override now for separate modals
    let inst_modalpost = M.Modal.init(modalpost, {dismissible: false});
    let inst_modalupload = M.Modal.init(modalupload, {opacity: 0.8}); // load default presets
    let inst_modalsignup =  M.Modal.init(modalsignup, {opacity: 0.8}); // load default presets
    let inst_modallogin = M.Modal.init(modallogin, {opacity: 0.8}); // load default presets

// init materialbox plugin
    $(document).ready(function(){
        $('.materialboxed').materialbox();
    });

// init tooltip plugin
    let tooltipelem = document.querySelector('.tooltipped');
    var inst_tooltip = M.Tooltip.init(tooltipelem, {});

// populate navbar with links
    navLinks();
    // print('changing nav links');
}

// TODO: function to read cookies and change navbar based on if user is logged in
function navLinks() {
    let signup = '<li><a href="signup.html">Sign up</a></li>';
    let login = '<li><a class="modal-trigger" href="#loginModal">Login</a></li>';
    let upload = '<li><a class="modal-trigger" href="#uploadModal">Upload</a></li>';
    let profile = '<li><a class="modal-trigger" href="#">Profile</a></li>';
    let logout = '<li><a href="/logout">Logout</a></li>';
    // clear links
    // $('#nav-mobile').empty();
    // $('#mobilesidenav').empty();
    print(checkIfLoggedIn());
    if(checkIfLoggedIn()){
      $('#nav-mobile').append(upload, profile, logout);
      $('#mobilesidenav').append(upload,profile,logout);
    }else{
      $('#nav-mobile').append(signup, login);
      $('#mobilesidenav').append(signup, login);
    }
}

// grabs img src url from thumbnail and sets it as src for #post_img
function loadModalImg(thumb_id) {
    let target = '#'+thumb_id;
    let img = $(target).children().children();
    let src = img.attr('src');
    print(src);


    print($('#post_img').children().attr('src'));
    $('#post_img').children().children().attr('src',src);
    print($('#post_img').children().attr('src'));


    $.ajax({
      type: 'post',
      url: '/post/'+thumb_id,
      headers:{
        'Access-Control-Allow-Origin': '*',
      },
      success: function(result,status,xhr){
        print(result.file.caption);
        $('#caption').text(result.file.caption);
        $('#username').text('@'+result.file.author);
        $('#link').attr({'href':result.file._id.toString()});
        print($('#caption'));
        fetchComments(thumb_id);
        socketListener(thumb_id);
      }
    });

}



function socketListener(id){
  // let id = $('#link').attr('href');
  console.log('window opened for post '+id);

  var socket = io.connect();
  socket.emit("join",id);

  socket.on('get update', function(msg){
      console.log('getting new updates');
      fetchComments(id);
  });

  $('#btnCommentGreen').click(function(event){
      // var socket = io.connect();
      console.log("posting!!!    "+id);
      // let c = $('#comment').find('input[name="comment"]').val();
      let c = $('#commentField').val();
      // console.log(c);
      $.ajax({
        type: 'POST',
        url: '/postComment',
        data: {comment:c,post_id:id,rating:1},
        headers:{
          'Access-Control-Allow-Origin': '*',
          'processData': 'false',
        },
        success: function(result,status,xhr){
          $('#commentField').val('');
          fetchComments(id);
          socket.emit('ping update', id);
          // let res = $('#comments');
          // fetchComments(id);
        },
        error: function(result,status,xhr){
          $('#errorMsg').html('<b style="color:red;">ERROR: NOT SIGNED IN.</b>');
          print("not signed in!!!!");
        }
      });

    return false;

  });

  $('#btnCommentRed').click(function(event){
      // var socket = io.connect();
      console.log("posting!!!    "+id);
      // let c = $('#comment').find('input[name="comment"]').val();
      let c = $('#commentField').val();
      // console.log(c);
      $.ajax({
        type: 'POST',
        url: '/postComment',
        data: {comment:c,post_id:id,rating:-1},
        headers:{
          'Access-Control-Allow-Origin': '*',
          'processData': 'false',
        },
        success: function(result,status,xhr){
          $('#commentField').val('');
          fetchComments(id);
          socket.emit('ping update', id);
          // let res = $('#comments');
          // fetchComments(id);
        }
      });

    return false;

  });


}




function fetchComments(id){

  let res = $('#commentList');
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



      // <div class="col s12">
      //   <div class="card green lighten-2 pro-comment">
      //         <div class="card-content white-text">
      //             <p> what in the fuck am i doing</p>
      //         </div>
      //   </div>
      // </div>
      // this implementation may be time and resource heavy, iterating all comments....
      res.empty();
      result.reverse().forEach(function(comment){
        let parent = res;
        let html = '';


        html+='<div class="user_comment">';
        if(comment.rating===1){
          html+='<div class="card green lighten-2 pro-comment">';
        }
        else{
          html+='<div class="card red lighten-2 pro-comment">';
        }

        html+='<div class="card-content white-text">';
        html+='<a class="col s12" style="font-weight:bold;" href="/user/"'+comment.author+'">'+comment.author+'</a> ';
        html+=comment.comment;
        html+='      '+comment.time.slice(0,10).replace(/-/g,"/");
        html+='</div>';
        html+='</div>';
        html+='</div>';

        res.append(html);


        // res.append('<div class="user_comment">');
        // res.append('<div class="card green lighten-2 pro-comment">');
        // res.append('<div class="card-content white-text">');
        // res.append('<a class="col s12" style="font-weight:bold;" href="/user/"'+comment.author+'">'+comment.author+'</a> ');
        // res.append(comment.comment);
        // res.append('      '+comment.time.slice(0,10).replace(/-/g,"/"));
        // res.append('</div>');
        // res.append('</div>');
        // res.append('</div>');
        // res.append('<br>');
      });

    }
  });
}


// Upload File
function filePreview(){
    let imageFile = document.getElementById("imageFileUpload"); // CHANGE THE ID

    // Limit File Size
    let fileType = imageFile.files[0].type;

    if ('files' in imageFile) {
        //let reader = new FileReader();
        //let fileContent = URL.createObjectURL(imageFile.files[0]);
        let fileContent = null;

        var preview = document.querySelector('img');
        var filez   = document.querySelector('input[type=file]').files[0];
        var reader  = new FileReader();

        reader.addEventListener("load", function () {
        preview.src = reader.result;
        preview.style.display = "inline";
        }, false);

        if (filez) {
        fileContent = reader.readAsDataURL(filez);
        preview.src = reader.result;
        }
    }
}



// runs when loading modal_post
// toggles truncated caption if caption > 140 characters
// #caption SHOULD NOT initially contain .truncate class when modal is loaded for this to work
function loadCaption() {
    let len = $('#caption').text().length;
    if(len>140) {
        toggleReadMore();
    }
}

// toggles readmore button and truncates/expands caption
function toggleReadMore() {
    let trunc = $('#caption').hasClass('truncate');
    if(!trunc) { //caption is expanded
        //caption will be truncated
        $('#readmore').html("<sub>Read more</sub>");
    } else { //caption is truncated
        // caption will be expanded
        $('#readmore').html("<sub>Read less</sub>");

    }
    $('#caption').toggleClass('truncate');

}

var print = console.log.bind(console);
