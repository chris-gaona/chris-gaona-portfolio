'use strict';

// creates main service function
function mainService ($http, $log, AuthService) {
  var mainService = {
    projects: [],
    treehouse: [],
    codeschool: [],
    github: []
  };

  // get project info from mongodb
  mainService.getAll = function () {
    return $http.get('/api/projects').then(function successCallback (response) {
      angular.copy(response.data, mainService.projects);
    }, function errorCallback (response, status) {
      $log.error('Error ' + response + status);
    });
  };

  // get an existing project
  mainService.getOne = function (id) {
    return $http.get('/api/project/' + id);
  };

  // create a new project
  mainService.create = function (project) {
    return $http.post('/api/new', project, {
      headers: {Authorization: 'Bearer '+AuthService.getToken()}
    });
  };

  // edit existing project
  mainService.edit = function (id, project) {
    return $http.put('/api/edit/' + id, project, {
      headers: {Authorization: 'Bearer '+AuthService.getToken()}
    });
  };

  // get treehouse info
  mainService.getTreehouse = function () {
    return $http.get('/api/treehouse').then(function successCallback (response) {
      angular.copy(response.data, mainService.treehouse);
    }, function errorCallback (response, status) {
      $log.error('Error ' + response + status);
    });;
  };

  // get codeschool info
  mainService.getCodeschool = function () {
    return $http.get('/api/codeschool').then(function successCallback (response) {
      angular.copy(response.data, mainService.codeschool);
    }, function errorCallback (response, status) {
      $log.error('Error ' + response + status);
    });
  };

  // get github info
  mainService.getGithub = function () {
    return $http.get('/api/github').then(function successCallback (response) {
      angular.copy(response.data, mainService.github);
    }, function errorCallback (response, status) {
      $log.error('Error ' + response + status);
    });
  };

  return mainService;
}

module.exports = function(ngModule) {
  ngModule.factory('MainService', ['$http', '$log', 'AuthService', mainService]);
};
