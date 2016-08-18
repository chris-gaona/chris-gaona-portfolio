'use strict';

// requires angular
var angular = require('angular');

var FORECAST_IO = process.env.FORECAST_IO;

// creates weather service function
function weatherService ($http) {
  var weatherService = {};

  // url for the request to forecast.io
  var URL = 'https://api.forecast.io/forecast/' + FORECAST_IO + '/37.6819,-121.7680?callback=JSON_CALLBACK';

  // returns request with jsonp
  weatherService.getWeather = function () {
    return $http.jsonp(URL);
  };

  return weatherService;
}

angular.module('app')
.factory('WeatherService', ['$http', weatherService]);
