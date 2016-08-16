'use strict';

var angular = require('angular');

function weatherService ($http) {
  var weatherService = {};

  var URL = 'http://api.openweathermap.org/data/2.5/weather';

  var request = {
    method: 'GET',
    url: URL,
    params: {
       q: 'Livermore',
      mode: 'json',
      units: 'imperial',
      cnt: '7',
      appid: 'ba6169f6e537c4eb5725155c36cd49f6'
    }
  };

  weatherService.getWeather = function () {
    return $http(request);
  };

  return weatherService;
}

angular.module('app')
.factory('WeatherService', ['$http', weatherService]);
