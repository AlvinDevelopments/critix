// these functions should be on the server

function checkSignup(su) {
    if(checkUsername(su.user) && checkPasswords(su.pw, su.pwc)) {
        console.log('ok to send info to db');
    } else {
        console.log('smth is bad');
    }
}

// function to check if username is in use
function checkUsername(usr) {
    // TODO: implement code to check database for used usernames
    // TODO: make sure usernames are at least 4 charas long

    if(true) {
        $('#signup_username_help').attr("data-success", "Username is available!");
        setValid('#signup_username');
        return true;
    } else {
        $('#signup_username_help').attr("data-false", "Username is not available");
        setInvalid('#signup_username');
        return false;
    }
}

// function to check if signup pw is OK
function checkPasswords(pw,pwc) {
    // TODO: make sure passwords are at least 8 charas long
    if( pw=== "" || pwc==="") {
        $('#confirm_pw_help').attr("data-error", "These fields cannot be blank");
        setInvalid('#signup_pw');
        setInvalid('#confirm_pw');
        return false;
    } else if (pw!==pwc) {
        $('#confirm_pw_help').attr("data-error", "Passwords don't match");
        setInvalid('#signup_pw');
        setInvalid('#confirm_pw');
        return false;
    }
    // else everything is OK
    setValid('#signup_pw');
    setValid('#confirm_pw');
    return true;
}

// takes an input tag id and turns on the "valid" class
function setValid(id) {
    $(id).removeClass('invalid');
    $(id).addClass('valid');
    $(id).prop("aria-invalid", "false");
}

// takes an input tag id and turns on the "invalid" class
function setInvalid(id) {
    $(id).removeClass('valid');
    $(id).addClass('invalid');
    $(id).prop("aria-invalid", "true");
}