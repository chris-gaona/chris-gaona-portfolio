'use strict';

// defines needed variables
var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var User = mongoose.model('User');

var passport = require('passport');

//REGISTER a user
router.post('/register', function(req, res, next) {
  // if username & password do not exist do this
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({
      message: 'Validation Failed', errors: { property: [ { code: 400, message: 'Please fill out all fields' } ] }
    });
  }

  // if password and confirm password do not match do this
  if (req.body.password !== req.body.confirmPassword) {
    return res.status(400).json({
      message: 'Validation Failed', errors: { property: [ { code: 400, message: 'Uh oh! Passwords do not match' } ] }
    });
  }

  // create new user
  var user = new User();

  user.username = req.body.username;

  user.firstName = req.body.firstName;

  // calls function to hash password
  user.setPassword(req.body.password);

  // save user
  user.save(function (err){
    if (err) {
      // check for validation errors
      if (err.name === 'ValidationError') {
        var errorArray = [];

        if (err.errors.username) {
          errorArray.push({ code: 400, message: err.errors.username.message });
        }

        if (err.errors.firstName) {
          errorArray.push({ code: 400, message: err.errors.firstName.message });
        }

        if (err.errors.hash) {
          errorArray.push({ code: 400, message: err.errors.hash.message });
        }

        var errorMessages = { message: 'Validation Failed', errors: { property: errorArray}};

        return res.status(400).json(errorMessages);
      } else {
        // else send error to error handler
        return next(err);
      }
    }

    // if no errors send user token
    return res.status(201).json({
      token: user.generateJWT()
    });
  });
});

// LOGIN a user
  router.post('/login', function(req, res, next) {
    // if username & password do not exist do this
    if (!req.body.username || !req.body.password) {
      return res.status(400).json({
        message: 'Validation Failed', errors: { property: [ { code: 400, message: 'Please fill out all fields' } ] }
      });
    }

    // use passport local to authenticate user provided credentials
    passport.authenticate('local', function(err, user, info){
      if(err){
        return next(err);
      }

      // if user is returned return the token
      if(user){
        return res.json({
          token: user.generateJWT()
        });

      } else {
        // else send validation errors
        return res.status(400).json(info);
      }
    })(req, res, next);
  });

  module.exports = router;
