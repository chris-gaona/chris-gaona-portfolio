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

// creates middleware for all project urls to go through first
router.param('id', function (req, res, next, id) {
  // query to find specific project by ID
  var query = Budget.findById(id);

  // executes the query
  query.exec(function (err, budget) {
    // if err pass the error onto the next error handler
    if (err) { return next(err); }

    // if there is no budget return error to error handler saying can't find the course
    if (!budget) {
      var error = new Error('Cannot find the budget');
      error.status = 404;
      return next(error);
    }

    // sets course to req.project to be passed to next handler
    req.budget = budget;
    return next();
  });
});

function getAll (req, res, next) {
  Budget.find({}, '_id end_period start_period', function(err, budgets){
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

//get a single budget
router.get('/current-budget', function (req, res, next) {
  // utils.getAll(req, res, next);
  Budget.find(callback).limit(1).sort({"end_period":-1});
  function callback (err, budget) {
    if (err) return next(err);

    console.log(budget);
    res.json(budget);
  }
});

//update a single budget
router.put('/budget/edit/:id', function (req, res, next) {
  // utils.getAll(req, res, next);

});

//save a new budget item
router.post('/budget/new', function (req, res, next) {
  // utils.getAll(req, res, next);

});

module.exports = router;
