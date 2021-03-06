'use strict';

// defines needed variables
var express = require('express');
var router = express.Router();

var jwt = require('express-jwt');
var jwtSecret;

if (process.env.JWT_SIGNATURE !== undefined) {
  jwtSecret = process.env.JWT_SIGNATURE;
} else {
  jwtSecret = 'SECRET';
}

//middleware for authenticating jwt tokens
var auth = jwt({
  secret: jwtSecret,
  userProperty: 'payload'
});

// UTILS
var utils = require('../utils');

//REGISTER a user
if (process.env.NODE_ENV === 'test') {
  router.post('/register', function(req, res, next) {
    utils.register(req, res,  next);
  });
} else {
  router.post('/register', auth, function(req, res, next) {
    utils.register(req, res,  next);
  });
}

// LOGIN a user
  router.post('/login', function(req, res, next) {
    utils.login(req, res, next);
  });

  module.exports = router;
