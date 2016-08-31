'use strict';

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

module.exports = function(ngModule) {
  ngModule.factory('UserService', ['$http', 'AuthService', userService]);
};
