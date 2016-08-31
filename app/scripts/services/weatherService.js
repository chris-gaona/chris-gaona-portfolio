'use strict';

// creates weather service function
function weatherService ($http) {
  var weatherService = {};

  // returns request with jsonp
  weatherService.getWeather = function () {
    return $http.get('/api/weather');
  };

  return weatherService;
}

module.exports = function(ngModule) {
  ngModule.factory('WeatherService', ['$http', weatherService]);
};
