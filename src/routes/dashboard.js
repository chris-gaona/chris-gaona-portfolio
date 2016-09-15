'use strict';

var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Budget = mongoose.model('Budget');

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

function getAll (req, res, next) {
  Budget.find(function(err, budgets){
    if(err) { return next(err); }

    if (budgets.length === 0) {
      var error = new Error('No budgets yet');
      error.status = 200;
      return next(error);
    }

    // send projects
    res.json(budgets);
  });
}

// module.exports = getAll;

// get all budgets
router.get('/budgets', function (req, res, next) {
  // utils.getAll(req, res, next);
  getAll(req, res, next);
});

module.exports = router;
