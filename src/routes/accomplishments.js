var express = require('express');
var router = express.Router();

var request = require('request');
var github = require('octonode');
var cache = require('memory-cache');

router.get('/treehouse', function (req, res, next) {
  var treehouse = cache.get('treehouse');
  res.status(200).send(treehouse);
});

router.get('/codeschool', function (req, res, next) {
  var codeschool = cache.get('codeschool');
  res.status(200).send(codeschool);
});

router.get('/github', function (req, res, next) {
  var client = github.client();

  client.get('/users/chris-gaona', {}, function (err, status, body, headers) {
    res.status(200).json(body);
  });
});

module.exports = router;
