// Some Div Thing
function rename2(){

    document.createElement("custom");
    document.getElementById("custom").innerHTML = "I made a new fucking button wooooo";

}

function rename() {

    let x = document.createElement("FORM");
    x.setAttribute("id", "myForm");
    document.body.appendChild(x);

    var y = document.createElement("INPUT");
    y.setAttribute("type", "text");
    y.setAttribute("value", "Donald");
    document.getElementById("myForm").appendChild(y);

}



// FILE UPLOAD

// Upload File
function uploadFile(){

    let txt = ""; // For a respgonse message
    let imageFile = document.getElementById("imageFileUpload"); // CHANGE THE ID 

    // Limit File Size
    let fileType = imageFile.files[0].type;

    if ('files' in imageFile) {
        if (imageFile.files.length == 0) {
            txt = "Select one or more files.";
            document.getElementById("uploadResponse").innerHTML = "Select one or more files."; // DO WE NEED THIS?

        } else if (imageFile.files.length > 1){
            txt = "Please only select 1 file";
            document.getElementById("uploadResponse").innerHTML = "Please only select 1 file"; // DO WE NEED THIS?

        } else if (!(fileType.indexOf('image') != -1)){
            txt += "Needs to be AN IMAGE FILE YOU PLEB";
            document.getElementById("uploadResponse").innerHTML = txt; // DO WE NEED THIS?

        }else {
            for (let i = 0; i < imageFile.files.length; i++) {
                let file = imageFile.files[i];

                // Gets the Filename
                if ('name' in file) {
                    fileName = file.name;
                }

                // Gets the Filesize
                if ('size' in file) {

                    // Check if filesize over 50MB
                    // No ones gonna upload RAWs here LOLOLOL
                    if (file.size > 50000000){
                        txt += "Filesize: " + file.size + " bytes is too large. <br>";
                        document.getElementById("uploadResponse").innerHTML = txt; // DO WE NEED THIS?
                    }
                    else{
                        //alert("File " + fileName + " has been uploaded successfully!");
                        // DO USEFUL STUFF 
                        // Maybe bring up an HTML element?

                        // Get the value of form elements here
                        var x = document.getElementById("customNames");
                        var text = "";
                        var imgFilename = "";
                        var imgCaption = "";

                        for (i = 0; i < 2 ;i++) {
                            if (i == 0){
                                imgFilename = x.elements[i].value;
                            }
                            else if (i == 1){
                                imgCaption = x.elements[i].value;
                            }
                        }
                        //document.getElementById("demo").innerHTML = text;
                        

                        // Success Message to HTML Page
                        txt += "Upload of " + fileName + " was successful " + text;
                        txt += "<br>Filename: " + imgFilename + "<br>Caption: " + imgCaption;
                        document.getElementById ("uploadResponse").innerHTML = txt; // DO WE NEED THIS?


                    }
                }
            }
        }
    }
}