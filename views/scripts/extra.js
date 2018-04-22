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
  });

var password = document.getElementById("signup_pw")
, confirm_password = document.getElementById("confirm_pw");

function validatePassword(){
  if(password.value != confirm_password.value) {
    confirm_password.setCustomValidity("Password Does Not Match");
  } else {
    confirm_password.setCustomValidity('');
  }
}

password.onchange = validatePassword;
confirm_password.onkeyup = validatePassword;



  
