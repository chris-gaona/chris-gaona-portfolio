'use strict';

// defines needed variables
var github = require('octonode');
var cache = require('memory-cache');
var request = require('request');

// creates getTreehouse function
function getTreehouse() {
  // request teamtreehouse url
  request('https://teamtreehouse.com/chrisgaona.json', function (err, response, body) {
    if (err) new Error(err);

    // if response is good and there is no error
    if (!err && response.statusCode == 200) {
      // parse the json response
      var treehouseRes = JSON.parse(body);
      var newObject = {};
      newObject.badges = treehouseRes.badges.length;
      newObject.points = treehouseRes.points.total;

      // cache the object and refresh every 3 days
      cache.put('treehouse', newObject, 259200000, function() {
          getTreehouse();
      }); // Time in ms
    }
  });
}

getTreehouse();

// creates getCodeschool function
function getCodeschool() {
  // request codeschool url
  request('https://www.codeschool.com/users/1777453.json', function (err, response, body) {
    if (err) new Error(err);

    // if response is good and there is no error
    if (!err && response.statusCode == 200) {
      // parse result
      var codeschool = JSON.parse(body);

      // cache the object and refresh every 3 days
      cache.put('codeschool', codeschool, 259200000, function() {
          getCodeschool();
      }); // Time in ms
    }
  });
}

getCodeschool();

// creates getCodeschool function
function getGitHub() {
  var client = github.client();

  client.get('/users/chris-gaona', {}, function (err, status, body) {
    if (err) return next(err);

    // if response is good and there is no error
    if (!err && body) {
      // parse result
      var github = body;

      // cache the object and refresh every 3 days
      cache.put('github', github, 259200000, function() {
          getGitHub();
      }); // Time in ms
    }
  });
}

getGitHub();
