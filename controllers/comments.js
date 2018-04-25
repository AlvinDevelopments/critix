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


// Retrieve Comments for post_id
router.post('/loadComments', function(req,res){

  let format = req.query.format;
  type = req.query.type;

  let queryComments = Comment.find();
  // queryComments.find({'post_id':req.query.post_id});
  queryComments.find({'post_id':req.body.post_id});
  queryComments.select('author comment time');
  // console.log(req.body.post_id);

  queryComments.exec(function(err,comments){
    if(err){
      res.render('index',{
        msg: err
      });
    }
    else{
      res.send(comments);
      // console.log('current comments: '+comments);
    }
  });

});

router.post('/postComment', function(req,res){
  console.log('posting a comment: '+req.body.comment);

  let comment = new Comment();

  comment.comment = req.body.comment;
  comment.post_id = req.body.post_id;
  comment.author = req.session.user.username;
  comment.time = Date.now();

    comment.save(function(err){
      if(err){
        console.log(err);
      }
      else{
        console.log("sent to db");
      }
    });
    res.status(200).send();
});



module.exports = router;
