'use strict';

// creates weather service function
function weatherService ($http, $log, errorHandlerService) {
  var weatherService = {
    weather: []
  };

  // returns request with jsonp
  weatherService.getWeather = function () {
    return $http.get('/api/weather').then(function successCallback (response) {
      angular.copy(response.data, weatherService.weather);
    }, function errorCallback (response) {
      $log.error(response);
      errorHandlerService.handleError(response);
    });
  };

  return weatherService;
}

module.exports = function(ngModule) {
  ngModule.factory('WeatherService', ['$http', '$log', 'errorHandlerService', weatherService]);
};
