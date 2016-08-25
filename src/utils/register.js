'use strict';

var mongoose = require('mongoose');
var User = mongoose.model('User');

function register (req, res, next) {
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
}

module.exports = register;
