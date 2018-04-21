let multer = require('multer');
let path = require('path');


// functions.js
// ===============



  // Set Storage engine
  let storage = multer.diskStorage({
    destination: './public/uploads/images',
    filename: function(reg,file,cb){
      cb(null,file.originalname.split('.')[0]+'-'+Date.now()+path.extname(file.originalname));
      console.log(path.extname(file.originalname));
      console.log(file.originalname);
      // cb(null,file.myImage+'-'+Date.now()+'.jpg');
    }
  });



module.exports = {

  // parser for uploads via Multer
  upload: multer({
    storage: storage,
    // fileFilter:function(req,file,cb){
    //   checkFileType(file,cb);
    // }
    }).single('image_file'),

  // Check File type
  checkFileType: function(file, cb){
    // Allowed ext
    const filetypes = /jpg|jpeg|png/;
    // Check extn
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);

    if(extname&&extname){
      return cb(null,true);
    }
    else{
      cb('Error: Images Only!');
    }
  },


  // Authenicate the user and password to match a DB entry
  authenticateCredentials: function(req,res){
    return function(req,res,next){
        next();
    }
  },

  // Check if user is logged in
  checkIfLoggedIn: function(){
    return function(req,res,next){
        console.log(req.session.user);
        if(req.session.user!=undefined){
            next();
        }
        else{
          console.log("NOT LOGGED IN!!");
          res.redirect('../login');
        }

    }
  },

  // Check if user is logged in, do NOT relog in
  checkIfLoggedInRedirect: function(){
    return function(req,res,next){
        console.log(req.session.user);
        if(req.session.user!=undefined){
            res.redirect(req.headers.referer);
        }
        else{
          next();
        }
  
    }
  }

}
