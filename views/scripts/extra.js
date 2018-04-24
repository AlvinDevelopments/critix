// contains client javascript
loggedIn = false;

// TODO: function to read cookies and change navbar based on if user is logged in
function navLinks() {
    let signup = '<li><a href="signup.html">Sign up</a></li>';
    let login = '<li><a href="login.html">Login</a></li>';
    let upload = '<li><a href="#">Upload</a></li>';
    let profile = '<li><a href="#">Profile</a></li>';
    let logout = '<li><a href="#">Logout</a></li>';
    // clear links
    $('#nav-mobile').empty();
    $('#mobilesidenav').empty();

    if(!loggedIn) {
        $('#nav-mobile').append(signup, login);
        $('#mobilesidenav').append(signup, login);
    } else {
        $('#nav-mobile').append(upload, profile, logout);
        $('#mobilesidenav').append(upload,profile,logout);
    }
}

// toggle sidebar menu on mobile
$(document).ready(function(){
    $('.sidenav').sidenav();
});

$(document).ready(function(){
    $('.modal').modal();
//    $('.modal').modal("open");
  });



function validatePassword(){
    var password = document.getElementById("signup_pw")
    , confirm_password = document.getElementById("confirm_pw");
    if(password.value != confirm_password.value) {
        confirm_password.setCustomValidity("Password Does Not Match");
    } else {
        confirm_password.setCustomValidity('');
    }
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



  
