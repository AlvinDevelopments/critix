// contains client javascript
loggedIn = false;

// function to run all initialization functions
function critixInit() {
// toggle sidebar menu on mobile
    $(document).ready(function(){
        $('.sidenav').sidenav();
    });

// init modal plugin
    let modalelem = document.querySelector('.modal');
    let modalpost = document.querySelector('#modal_post');
    let inst_elem = M.Modal.init(modalelem, {opacity: 0.8}); // load default presets
    // override now for separate modals
    let inst_modalpost = M.Modal.init(modalpost, {onOpenEnd: loadCaption(), dismissible: false});

// init materialbox plugin
    $(document).ready(function(){
        $('.materialboxed').materialbox();
    });

// init tooltip plugin
    let tooltipelem = document.querySelector('.tooltipped');
    var inst_tooltip = M.Tooltip.init(tooltipelem, {});

// populate navbar with links
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

// grabs img src url from thumbnail and sets it as src for #post_img
function loadModalImg(thumb_id) {
    let img = $(thumb_id).children().children();
    let src = img.attr('src');
    print(src);

    print($('#post_img').children().attr('src'));
    $('#post_img').children().children().attr('src',src);
    print($('#post_img').children().attr('src'));
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



