(function () {
  'use strict';

  function mainService ($http) {
    var mainService = {
      projects: []
    };

    // get project info from mongodb
    mainService.getAll = function () {
      return $http.get('/api/projects').then(function successCallback (response) {
        angular.copy(response.data, mainService.projects);
      }, function errorCallback (response, status) {
        $log.error('Error ' + response + status);
      });
    };

    // create a new project
    mainService.create = function (project) {
      return $http.post('/api/projects', project);
    };

    // get treehouse info
    mainService.getTreehouse = function () {
      return $http.get('/api/treehouse');
    };

    // get codeschool info
    mainService.getCodeschool = function () {
      return $http.get('/api/codeschool');
    };

    // get github info
    mainService.getGithub = function () {
      return $http.get('/api/github');
    };

    return mainService;
  }

  angular.module('app')
  .factory('MainService', ['$http', mainService]);
})();
