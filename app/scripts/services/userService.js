'use strict';

// requires angular
var angular = require('angular');

// creates user service function
function userService($http, AuthService) {
  var userService = {};

  // gets current user information
  userService.getUser = function(username) {
    // returns user and sets the header with the token
    return $http.get('/user/' + username, {
      headers: {Authorization: 'Bearer '+AuthService.getToken()}
    });
  };

  //can't forget this return!!!
  return userService;
}

angular.module('app')
.factory('UserService', ['$http', 'AuthService', userService]);
