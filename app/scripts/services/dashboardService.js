'use strict';

// creates main service function
function dashboardService ($http, $log, AuthService, errorHandlerService, Upload) {
  var dashboardService = {
    budgets: []
  };

  // get budgets info from mongodb
  dashboardService.getAll = function () {
    return $http.get('/api/budgets').then(function successCallback (response) {
      angular.copy(response.data, dashboardService.budgets);
    }, function errorCallback (response) {
      $log.error(response);
      errorHandlerService.handleError(response);
    });
  };

  return dashboardService;
}

module.exports = function(ngModule) {
  ngModule.factory('DashboardService', ['$http', '$log', 'AuthService', 'errorHandlerService', 'Upload', dashboardService]);
};
