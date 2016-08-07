'use strict';

var angular = require('angular');

function authController ($location, $log, MainService, AuthService, toastr, errorHandlerService) {
  var vm = this;

  vm.goBack = function () {
    $location.path('/');
  };

  vm.registerPage = function () {
    $location.path('/register');
  };

  vm.loginPage = function () {
    $location.path('/login');
  };

  if ($location.path() === '/register') {
    vm.register = 'Register';
  } else {
    vm.login = 'Login';
  }

  vm.registerUser = function() {
    AuthService.register(vm.user).error(function(error) {
      vm.error = error;
      $log.log(error);
    }).then(function() {
      toastr.success('You are registered', 'Success!');
      $location.path('/');
    });
  };

  vm.loginUser = function() {
    AuthService.logIn(vm.user).error(function(error) {
      vm.error = error;
    }).then(function() {
      toastr.success('You are logged in', 'Success!');
      $location.path('/');
    });
  };
}

angular.module('app')
.controller('AuthController', ['$location', '$log', 'MainService', 'AuthService', 'toastr', 'errorHandlerService', authController]);
