'use strict';

// creates needed variables
var express = require('express');
var router = express.Router();

var github = require('octonode');
var cache = require('memory-cache');
var request = require('request');
var jsonp = require('jsonp');

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
router.get('/github', function (req, res, next) {
  var client = github.client();

  client.get('/users/chris-gaona', {}, function (err, status, body) {
    if (err) return next(err);
    res.status(200).json(body);
  });
});

router.get('/weather', function (req, res, next) {
  var FORECAST_IO = process.env.FORECAST_IO;

  // request teamtreehouse url
  request('https://api.forecast.io/forecast/' + FORECAST_IO + '/37.6819,-121.7680', function (err, response, body) {
    if (err) return next(err);

    // if response is good and there is no error
    if (!err && response.statusCode == 200) {
      res.status(200).json(JSON.parse(body));
    }
  });
});

module.exports = router;
