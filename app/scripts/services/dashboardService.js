'use strict';

// creates main service function
function dashboardService ($http, $log, AuthService, errorHandlerService, Upload) {
  var dashboardService = {
    budgets: [],
    current: []
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

  // get current budget
  dashboardService.getCurrent = function () {
    return $http.get('/api/current-budget').then(function successCallback (response) {
      angular.copy(response.data, dashboardService.current);
    }, function errorCallback (response) {
      $log.error(response);
      errorHandlerService.handleError(response);
    });
  };

  // get a single budget
  dashboardService.getOne = function (id) {
    return $http.get('/api/budget/' + id);
  };

  // edit existing budget
  dashboardService.edit = function (id, budget) {
    return $http.put('/api/budget/edit/' + id, budget, {
      headers: {Authorization: 'Bearer '+AuthService.getToken()}
    });
  };

  // create a new budget
  dashboardService.create = function (budget) {
    return $http.post('/api/budget/new', budget, {
      headers: {Authorization: 'Bearer '+AuthService.getToken()}
    });
  };

  return dashboardService;
}

module.exports = function(ngModule) {
  ngModule.factory('DashboardService', ['$http', '$log', 'AuthService', 'errorHandlerService', 'Upload', dashboardService]);
};
