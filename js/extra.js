// contains client javascript

// toggle sidebar menu on mobile
$(document).ready(function(){
    $('.sidenav').sidenav();
});

loggedIn = false;

// TODO: function to read cookies and change navbar based on if user is logged in
function navLinks() {
    // clear links
    $('#nav-mobile').empty();
    $('#mobilesidenav').empty();

    if(!loggedIn) {
        $('#nav-mobile').append('<li><a href="signup.html">Sign up</a></li>');
        $('#nav-mobile').append('<li><a href="login.html">Login</a></li>');
        $('#mobilesidenav').append('<li><a href="signup.html">Sign up</a></li>');
        $('#mobilesidenav').append('<li><a href="login.html">Login</a></li>');
    } else {
        $('#nav-mobile').append('<li><a href="#">Upload</a></li>');
        $('#nav-mobile').append('<li><a href="#">Profile</a></li>');
        $('#nav-mobile').append('<li><a href="#">Logout</a></li>');
        $('#mobilesidenav').append('<li><a href="#">Upload</a></li>');
        $('#mobilesidenav').append('<li><a href="#">Profile</a></li>');
        $('#mobilesidenav').append('<li><a href="#">Logout</a></li>');
    }
}
