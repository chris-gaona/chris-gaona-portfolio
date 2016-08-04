'use strict';

var cache = require('memory-cache');
var request = require('request');

// { badges: 181, points: 17297 }

function getTreehouse() {
  request('https://teamtreehouse.com/chrisgaona.json', function (err, response, body) {
    if (err) console.log(err);

    if (!err && response.statusCode == 200) {
      var treehouseRes = JSON.parse(body);
      var newObject = {};
      newObject.badges = treehouseRes.badges.length;
      newObject.points = treehouseRes.points.total;

      cache.put('treehouse', newObject, 259200000, function(key, value) {
          getTreehouse();
      }); // Time in ms
    }
  });
}

getTreehouse();

function getCodeschool() {
  request('https://www.codeschool.com/users/1777453.json', function (err, response, body) {
    if (err) console.log(err);

    if (!err && response.statusCode == 200) {
      var codeschool = JSON.parse(body);
      cache.put('codeschool', codeschool, 259200000, function(key, value) {
          getCodeschool();
      }); // Time in ms
    }
  });
}

getCodeschool();
