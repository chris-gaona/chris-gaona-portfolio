var express = require('express');
var router = express.Router();

var request = require('request');
var github = require('octonode');

router.get('/treehouse', function (req, res, next) {
  request('https://teamtreehouse.com/chrisgaona.json', function (err, response, body) {
    if (err) return next(err);

    if (!err && response.statusCode == 200) {
      var treehouse = JSON.parse(body);
      res.status(200).send(treehouse);
    }
  });
});

router.get('/codeschool', function (req, res, next) {
  request('https://www.codeschool.com/users/1777453.json', function (err, response, body) {
    if (err) return next(err);

    if (!err && response.statusCode == 200) {
      var codeschool = JSON.parse(body);
      res.status(200).send(codeschool);
    }
  });
});

router.get('/github', function (req, res, next) {
  var client = github.client();

  client.get('/users/chris-gaona', {}, function (err, status, body, headers) {
    res.status(200).json(body);
  });
});

module.exports = router;
