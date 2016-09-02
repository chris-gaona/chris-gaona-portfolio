'use strict';

// creates weather service function
function weatherService ($http, $log) {
  var weatherService = {
    weather: []
  };

  // returns request with jsonp
  weatherService.getWeather = function () {
    return $http.get('/api/weather').then(function successCallback (response) {
      angular.copy(response.data, weatherService.weather);
    }, function errorCallback (response, status) {
      $log.error(response);
    });
  };

  return weatherService;
}

module.exports = function(ngModule) {
  ngModule.factory('WeatherService', ['$http', '$log', weatherService]);
};
