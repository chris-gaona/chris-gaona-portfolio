'use strict';

var passport = require('passport');

function login (req, res, next) {
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
}

module.exports = login;
