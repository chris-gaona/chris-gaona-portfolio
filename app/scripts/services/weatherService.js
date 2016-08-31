'use strict';

// requires angular
var angular = require('angular');

// creates weather service function
function weatherService ($http) {
  var weatherService = {};

  // returns request with jsonp
  weatherService.getWeather = function () {
    return $http.get('/api/weather');
  };

  return weatherService;
}

angular.module('app')
.factory('WeatherService', ['$http', weatherService]);
