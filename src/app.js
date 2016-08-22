'use strict';

var express = require('express');
var path = require('path');
// var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//mongoose connection
var mongoose = require('mongoose');
var Project = require('./models/Projects');
require('./models/Users');
var config = require('./config/database');

require('./config/passport');

var routes = require('./routes');

require('./cache');

var app = express();

mongoose.connect(config.mongoURI[app.settings.env], function(err) {
  if (err) {
    console.log('Failed connecting to Mongodb!');
  } else {
    // seed database
    // require('./config/seed.js');
    console.log('Successfully connected to Mongodb: ' + config.mongoURI[app.settings.env]);
  }
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'images', 'logo.png')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/', express.static('dist/public'));
app.use('/api', routes.project);
app.use('/api', routes.accomplishments);
app.use('/user', routes.users);
app.use('/', routes.auth);

// vendor scripts
app.get('/vendor/angular-toastr.min.css', function(req, res) {
  res.sendFile(path.join(__dirname, '../node_modules', 'angular-toastr', 'dist', 'angular-toastr.min.css'));
});
app.get('/vendor/angularjs-datepicker.min.css', function(req, res) {
  res.sendFile(path.join(__dirname, '../node_modules', 'angularjs-datepicker', 'dist', 'angular-datepicker.min.css'));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res) {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message
    }
  });
});


module.exports = app;
