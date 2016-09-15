'use strict';

var express = require('express');
// var path = require('path');
// var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//mongoose connection
var mongoose = require('mongoose');
require('./models/Projects');
require('./models/Users');
require('./models/Budgets');
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

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'images', 'logo.png')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/', express.static('dist/public'));
app.use('/api', routes.project);
app.use('/api', routes.accomplishments);
app.use('/api', routes.dashboard);
app.use('/user', routes.users);
app.use('/', routes.auth);

// this catches all other routes that are not before this and sends the user to the home page
app.get('*', function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Sorry the resource cannot be found');
  err.status = 404;
  next(err);
});

// error handlers
// production error handler
// no stacktraces leaked to user
/* jshint ignore:start */
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message
    }
  });
});
/* jshint ignore:end */


module.exports = app;
