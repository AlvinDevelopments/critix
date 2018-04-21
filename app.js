const express = require('express');
const ejs = require('ejs');
var path = require('path');
const bodyParser = require('body-parser');
const multer = require('multer');
// const path = require('path');
const mongoose = require('mongoose');
const ObjectID = require('mongodb').ObjectID;
// const Post = require('./models/Post')

let session = require('express-session');

var createError = require('http-errors');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


mongoose.connect('mongodb://localhost/test', function(err){
	if(err){
		return console.log(err)
	}

	return console.log("Successfully connected to MongoDB!");
});


var indexRouter = require('./controllers/index');
// var usersRouter = require('./routes/users');


var app = express();

// view engine setup EJS
app.set('view engine', 'ejs');

// app.use(session());
app.use('/',express.static(path.join(__dirname, 'views')));
app.use(express.static(path.join(__dirname, 'views')));
app.use('/discover',express.static('./public'));
// app.use('/login',express.static('./views'));
app.use(session({secret:"9aduoshbj1082hd8dowhualj", resave:false, saveUninitialized:true}));

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(express.static(path.join(__dirname, 'public')));

app.use('/post',express.static('./views'));

app.use('/', indexRouter);
// app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
