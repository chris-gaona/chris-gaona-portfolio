'use strict';

var angular = require('angular');

function weatherService ($http) {
  var weatherService = {};

  var URL = 'https://api.forecast.io/forecast/cf9659348d1908d40d599089da4bb449/37.6819,-121.7680?callback=JSON_CALLBACK';

  weatherService.getWeather = function () {
    return $http.jsonp(URL);
  };

  return weatherService;
}

angular.module('app')
.factory('WeatherService', ['$http', weatherService]);
