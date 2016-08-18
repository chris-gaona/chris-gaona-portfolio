'use strict';

var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var User = mongoose.model('User');

var passport = require('passport');

//REGISTER
router.post('/register', function(req, res, next){
  if(!req.body.username || !req.body.password){
    return res.status(400).json({
      message: 'Validation Failed', errors: { property: [ { code: 400, message: 'Please fill out all fields' } ] }
    });
  }

  if (req.body.password !== req.body.confirmPassword) {
    return res.status(400).json({
      message: 'Validation Failed', errors: { property: [ { code: 400, message: 'Uh oh! Passwords do not match' } ] }
    });
  }

  var user = new User();

  user.username = req.body.username;

  user.firstName = req.body.firstName;

  user.setPassword(req.body.password);

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

    return res.json({
      token: user.generateJWT()
    });
  });
});

// LOGIN
  router.post('/login', function(req, res, next){
    if(!req.body.username || !req.body.password){
      return res.status(400).json({
        message: 'Validation Failed', errors: { property: [ { code: 400, message: 'Please fill out all fields' } ] }
      });
    }

    passport.authenticate('local', function(err, user, info){
      if(err){
        return next(err);
      }

      if(user){
        return res.json({
          token: user.generateJWT()
        });

      } else {
        return res.status(400).json(info);
      }
    })(req, res, next);
  });

  module.exports = router;
