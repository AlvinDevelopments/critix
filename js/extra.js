// contains client javascript
loggedIn = false;

// function to run all initialization functions
function critixInit() {

    // toggle sidebar menu on mobile
    $(document).ready(function(){
        $('.sidenav').sidenav();
    });

// toggle modal
    var elem = document.querySelector('.modal');
    var instance = M.Modal.init(elem, {opacity: 0.8, onOpenStart: loadCaption()});

// toggle materialbox
    $(document).ready(function(){
        $('.materialboxed').materialbox();
    });

    navLinks();
}

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

// runs when loading modal_post
// toggles truncated caption if caption > 140 characters
function loadCaption() {
    let len = $('#caption').text().length;
    if(len>140) {
        $('#caption').addClass('truncate');
    }
}

// toggles readmore button and truncates/expands caption
function readMore() {
    let trunc = $('#caption').hasClass('truncate');
    if(!trunc) { //caption is expanded
        //caption will be truncated
        $('#readmore').text("Read more");
    } else { //caption is truncated
        // caption will be expanded
        $('#readmore').text("Read less");
    }
    $('#caption').toggleClass('truncate');

}

var print = console.log.bind(console);



