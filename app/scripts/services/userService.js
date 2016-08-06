'use strict';

var angular = require('angular');

function userService($http, AuthService) {
  var userService = {};

  userService.getUser = function(username) {
    return $http.get('/user/' + username, {
      headers: {Authorization: 'Bearer '+AuthService.getToken()}
    });
  };

  //can't forget this return!!!
  return userService;
}

angular.module('app')
.factory('UserService', ['$http', 'AuthService', userService]);
