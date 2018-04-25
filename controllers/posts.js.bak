// Models
const User = require('../models/User');
const Comment = require('../models/Comment');
const Post = require('../models/Post');

const ObjectID = require('mongodb').ObjectID;
let functions = require('../lib/functions');
const express = require('express');
var router = express.Router();

// var mongoose = require('mongoose');
// var path = require('path');
// const ejs = require('ejs');
// const multer = require('multer');


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
        post.author = req.session.user.username;
        post.title = req.body.upload_title;
        post.caption = req.body.caption;
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


// returns all posts
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
      console.log(posts);

      return res.send({
        posts: posts,
        filetype: 'jpg'
      });
    }
  });
});


// Retrieves the server filepath of a file based on post_id and displays it
router.get('/post/:_id',(req,res)=>{
  // console.log('generating post');

  let query = Post.findOne({'_id':ObjectID(req.params._id)});
  query.select('_id filepath title date caption author');

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


module.exports = router;
