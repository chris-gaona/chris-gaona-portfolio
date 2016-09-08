'use strict';

// creates needed variables
var express = require('express');
var router = express.Router();

var cache = require('memory-cache');
var request = require('request');

// get treehouse route
router.get('/treehouse', function (req, res) {
  var treehouse = cache.get('treehouse');
  res.status(200).send(treehouse);
});

// get codeschool route
router.get('/codeschool', function (req, res) {
  var codeschool = cache.get('codeschool');
  res.status(200).send(codeschool);
});

// get github route
router.get('/github', function (req, res) {
  var github = cache.get('github');
  res.status(200).send(github);
});

router.get('/weather', function (req, res, next) {
  var FORECAST_IO;

  if (process.env.FORECAST_IO !== undefined) {
    FORECAST_IO = process.env.FORECAST_IO;
  } else {
    FORECAST_IO = require('../../src/config/secret.js');
  }

  // request forecast.io url
  request('https://api.forecast.io/forecast/' + FORECAST_IO + '/37.6819,-121.7680', function (err, response, body) {
    if (err) return next(err);

    // if response is good and there is no error
    if (!err && response.statusCode == 200) {
      res.status(200).json(JSON.parse(body));
    }
  });
});

module.exports = router;
