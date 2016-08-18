'use strict';

// requires angular
var angular = require('angular');

// creates weather service function
function weatherService ($http) {
  var weatherService = {};

  // url for the request to forecast.io
  var URL = 'https://api.forecast.io/forecast/cf9659348d1908d40d599089da4bb449/37.6819,-121.7680?callback=JSON_CALLBACK';

  // returns request with jsonp
  weatherService.getWeather = function () {
    return $http.jsonp(URL);
  };

  return weatherService;
}

angular.module('app')
.factory('WeatherService', ['$http', weatherService]);
