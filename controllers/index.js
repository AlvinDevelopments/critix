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
})

// Retrieve Sign Up Page
router.get('/signup', function(req,res){
  res.render('signup');
})

// Retrieve Upload  Page
router.get('/upload', function(req,res){
  res.render('upload');
})

// Retrieve Comments for post_id
router.post('/loadComments', function(req,res){

  let format = req.query.format;
  type = req.query.type;

  let queryComments = Comment.find();
  // queryComments.find({'post_id':req.query.post_id});
  queryComments.find({'post_id':req.body.post_id});
  queryComments.select('author comment time');
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

// router.post('/postComment?comment=:comment&post_id=:id', functions.checkIfLoggedIn(), function(req,res){
router.post('/postComment', functions.checkIfLoggedIn(), function(req,res){
  let backURL=req.header('Referer').split('localhost/')[1] || '/';
  console.log('posting a comment');

  let comment = new Comment();

  comment.comment = req.body.comment;
  console.log(req);

  comment.post_id = req.body.post_id;
  comment.author = req.session.user.username;

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
        // return res.status(200).send('wow');
        // res.send('sucess');
      }
    });

    return res.status(200).send('wow');

});



router.get('/test',function(req,res){
  console.log('console log of the test.');
  res.send('hi, this is a test!');
});

// Submit Login Credentials
router.post('/login', function(req, res){
  // console.log(req);
  var username = req.body.username;
  var password = req.body.password;
  // console.log(username);
  // console.log(password);

  // Search through the database
  User.findOne({username: username, password: password}, function(err, user){
      // if there was an err searching console log it
      if(err){
          console.log(err);
          return res.status(500).send();
      }
      // if the user does not exist in the database send error message
      else if(user==null){
          req.session.loginStatus = false;
          res.render('index', {login: req.session.loginStatus, errorMsg: "Incorrect Username/Password"});
      }
      // Successful login
      else{
      req.session.user = user;
      req.session.loginStatus = true;
      res.redirect('/');
      }
  });

});

router.get('/logout', function(req, res){
    req.session.destroy();

    res.redirect('/');
    //return res.status(200).send();
})

// Retrieve registration page
router.get('/register', function(req, res){
  res.render('signup');
});


// Submit registration request
router.post('/register', function(req, res){
  // get form input
  var username = req.body.username;
  var password = req.body.password;
  var firstname = req.body.firstname;
  var lastname = req.body.lastname;
  console.log(username);
  console.log(password);
  console.log(firstname);
  console.log(lastname);

  // create a new user for the database
  var newUser = new User();
  newUser.username = username;
  newUser.password = password;
  newUser.firstname = firstname;
  newUser.lastname = lastname;
  // save user info to database
  newUser.save(function(err, savedUser){
      if(err){
          console.log(err);
      }
      return res.render('index', {login: req.session.loginStatus});
  });
});

// Alvin's stuff below--------

// loads login page
// router.post('/login',authenticateCredentials(),function(req,res){
//   // res.render('home');
// });

// Renders the main page if user is logged in.
// router.get('/',functions.checkIfLoggedIn(),function(req,res){
  router.get('/',function(req,res){
    let username = 'guest';
    if(req.session.loginStatus){
      username = req.session.user.username;
      console.log(req.session.user.username);
    }

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

        res.render('index',{
          posts: posts,
          filetype: 'jpg',
          login: req.session.loginStatus,
          user: username
        });
      }
    });
  }





);


// Render Upload page
router.get('/upload',function(req,res){
  res.render('upload');
  console.log('upload get');
});

// Upload a file to server and registers it as a post in DB
router.post('/upload',(req,res)=>{
  // console.log(req);
	console.log("upload request");
  // create post via post Schema
  functions.upload(req,res,(err)=>{
    console.log(req);
    if(err){
      console.log("failed")
      return res.redirect('/');
    }
    else
    {
      if(req.file.path==undefined){
        console.log("Error: No File Selected!'");
        return res.redirect('/');
      }
      else{
        let post = new Post();
        let title = req.body.upload_title;

        post.filepath = req.file.filename;
        post.post_id = req.file.filename;
        post.author = req.body.username;
        post.title = req.body.upload_title;
        post.date = Date.now();

        post.save(function(err){
          if(err){
            console.log("FAILED");
            console.log(err);
            return res.redirect('/');
          }
          else{
            console.log("sent to db");
            console.log(post);
            return res.redirect('/');

          }
        })
      }

    }
  })
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
          login: req.session.loginStatus,
        // comments: comments;
      });
    }
  });


});


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

      // res.render('discover',{
      //   posts: posts,
      //   filetype: 'jpg'
      // });

      return res.send({
        posts: posts,
        filetype: 'jpg'
      });
    }
  });
});

module.exports = router;
