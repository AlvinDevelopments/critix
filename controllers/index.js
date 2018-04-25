// Models
const User = require('../models/User');
const Comment = require('../models/Comment');
const Post = require('../models/Post');

let functions = require('../lib/functions');
const express = require('express');
var router = express.Router();

// var mongoose = require('mongoose');
// const ObjectID = require('mongodb').ObjectID;
// var path = require('path');
// const ejs = require('ejs');
// const multer = require('multer');


// Renders the main page if user is logged in.
// router.get('/',functions.checkIfLoggedIn(),function(req,res){
  router.get('/',function(req,res){
    let username = 'guest';
    if(req.session.loginStatus){
      username = req.session.user.username;
      // console.log(req.session.user.username);
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


// Retrieve Log In Page
// router.get('/login', function(req,res){
//   res.render('login');
// });

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
});

// // Retrieve Sign Up Page
// router.get('/register', function(req,res){
//   res.render('signup');
// })


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


module.exports = router;
