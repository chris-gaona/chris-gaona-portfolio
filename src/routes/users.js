'use strict';

var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var User = mongoose.model('User');

var jwt = require('express-jwt');
// var secret = require('../config/secret');
//middleware for authenticating jwt tokens
var auth = jwt({
  secret: "SECRET", // TODO this should be stored in an ENV variable and kept off the codebase, same as it is in the User model
  userProperty: 'payload'
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
