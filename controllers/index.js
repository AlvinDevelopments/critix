// var express = require('express');

var mongoose = require('mongoose');

// Models
const User = require('../models/User');
const Comment = require('../models/Comment');
const Post = require('../models/Post');


let functions = require('../lib/functions');


const express = require('express');

var router = express.Router();

const ejs = require('ejs');
var path = require('path');
// const bodyParser = require('body-parser');
const multer = require('multer');
// const path = require('path');
// const mongoose = require('mongoose');
const ObjectID = require('mongodb').ObjectID;


var ObjectId = require('mongodb').ObjectID;
// const waveSurf = require('../lib/fileHandler.js');
// const moment = require('moment');


/* GET home page. */
// router.get('/', function(req, res, next) {
//     res.render('index', { title: 'Express' });
// });

// Retrieve Log In Page
router.get('/login', function(req,res){
  res.render('login');
});

// Retrieve Sign Up Page
router.get('/signup', function(req,res){
  res.render('signup');
});


// Retrieve Comments for post_id
router.post('/loadComments',function(req,res){

  let format = req.query.format;
  type = req.query.type;

  let queryComments = Comment.find();
  // queryComments.find({'post_id':req.query.post_id});
  queryComments.find({'post_id':req.body.post_id});
  // console.log(req.query.post_id);
  console.log(req.body.post_id);

  queryComments.exec(function(err,comments){
    if(err){
      res.render('index',{
        msg: err
      });
    }
    else{
      res.send(comments);
      console.log('current comments: '+comments);
    }
  });

});

// router.post('/postComment?comment=:comment&post_id=:id',function(req,res){
router.post('/postComment',function(req,res){
  let backURL=req.header('Referer').split('localhost/')[1] || '/';
  console.log('posting a comment');

  let comment = new Comment();

  comment.comment = req.body.comment;
  console.log(req);
comment.post_id = req.body.post_id;
  // comment.author = req.session.user.username;

  comment.time = Date.now();


    comment.save(function(err){
      if(err){
        console.log("FAILED");
        console.log(err);
        return res.status(500).send();
      }
      else{
        console.log("sent to db");
          console.log("returning to post "+backURL);
        // res.render(backURL);
        // console.log(post);
        // res.send(comment);
        return res.status(200).send();
      }
    });


});


router.get('/test',function(req,res){
  console.log('console log of the test.');
  res.send('hi, this is a test!');
});

// Submit Login Credentials
router.post('/login', function(req, res){
    console.log(req);
    var username = req.body.username;
    var password = req.body.password;
    console.log(username);
    console.log(password);

    User.findOne({username: username, password: password}, function(err, user){

        if(err){
            console.log(err);
            return res.status(500).send();
        }
        else if(user==null){
            // return res.status(404).send();
            console.log('lol');
            return res.render('login',{'errorMsg': 'wrong credentials'});
        }else{

        req.session.user = user;
        return res.render('index');
      }
    });

});

router.get('/dashboard', function(req, res){
    if(!req.session.user){
        //return res.status(401).send();
        return res.redirect('/login');
    }

    return res.status(200).send("Welcome");
})

router.get('/logout', function(req, res){
    req.session.destroy();
    return res.status(200).send();
})

// Retrieve registration page
router.get('/register', function(req, res){
  res.render('signup');
});


// Submit registration request
router.post('/register', function(req, res){
    var username = req.body.username;
    var password = req.body.password;
    console.log(username);
    console.log(password);

    var newUser = new User();
    newUser.username = username;
    newUser.password = password;

    newUser.save(function(err, savedUser){
        if(err){
            console.log(err);
            // return res.status(500).send();
        }
        return res.render('login');
    })
})


// Alvin's stuff below--------

// loads login page
// router.post('/login',authenticateCredentials(),function(req,res){
//   // res.render('home');
// });

// Renders the main page if user is logged in.
router.get('/',functions.checkIfLoggedIn(),(req,res)=>res.render('index'));


// Render Upload page
router.get('/upload',function(req,res){
  res.render('upload');
});

// Upload a file to server and registers it as a post in DB
router.post('/upload',(req,res)=>{
  // console.log(req);
	console.log("upload request");
  // create post via post Schema
  functions.upload(req,res,(err)=>{
    // console.log(req.file.filename);
    console.log(req.body.title);
    // console.log('-----------------------------');
    // console.log(req);
    if(err){
      console.log("failed")
      res.render('index',{
        msg: err
      });
    }
    else
    {
      if(req.file==undefined){
        console.log("Error: No File Selected!'");
        res.render('index',{
          msg: 'Error: No File Selected!'
        });
      }
      else{
        res.render('index',{
          msg: 'File Uploaded!',
          // file: `${req.file.filename}`
        });

        let post = new Post();
        let title = req.title;

          post.filepath = req.file.filename;
          post.post_id = req.file.filename;
          post.author = req.body.author;
          post.title = req.body.title;
          post.date = Date.now();

          post.save(function(err){
            if(err){
              console.log("FAILED");
              console.log(err);
              return res.status(500).send();
            }
            else{
              console.log("sent to db");
              console.log(post);
              return res.status(200).send();
            }
          });

      }
    }
  }
);




});


// Retrieves the server filepath of a file based on post_id and displays it
router.get('/post/:_id',(req,res)=>{
  // console.log('generating post');

  let query = Post.findOne({'_id':ObjectID(req.params._id)});
  query.select('_id filepath title date');

  query.exec(function(err,post){
    if(err){
      res.render('index',{
        msg: err
      });
    }
    else{
      // console.log(post._id);

      res.render('post',{
        file: post,
        filetype: 'jpg',
        // comments: comments;
      });
    }
  });

});

//
// // Retrieves the server filepath of a file based on post_id and displays it POST POST POST
// router.post('/post/:_id',(req,res)=>{
//     console.log(req.params);
//     // res.render('/post/'+req.params._id);
//     // res.send();
//   });

// // Post Comment
// // Add a comment to an existing post.
// router.post('/comment',(req,res)=>{
//   let comment = new Comment();
//
//   let link = req.headers.referer;
//   let parsed = link.split('/');
//   let id = parsed[parsed.length-1];
//   comment.post_id = id;
//   console.log(id);
//   comment.comment = req.body.comment;
//   // comment.author = req.session.user.username;
//   // comment.post_id = req;
//   comment.date = Date.now();
//
//   comment.save(function(err){
//     if(err){
//       console.log("FAILED");
//       console.log(err);
//       // return res.status(500).send();
//     }
//     else{
//       console.log("sent to db");
//       // console.log(post);
//       // res.status(200).send({
//       //   comment: comment
//       // });
//       // console.log(req);
//       // res.redirect('/post/undefined-1523845557148.png',{
//       //   comment: comment
//       // });
//
//       let link = req.headers.referer;
//
//       res.redirect(link);
//
//     }
//   });
// });



// Displays all posts uploaded
router.get('/discover',function(req,res){
  let query = Post.find();
  query.select('_id post_id');

  query.exec(function(err,posts){
    if(err){
      res.render('index',{
        msg: err
      });
    }
    else{
      // console.log(posts);

      res.render('discover',{
        posts: posts,
        filetype: 'jpg'
      });
    }
  });
});

module.exports = router;
