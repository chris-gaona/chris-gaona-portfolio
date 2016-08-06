'use strict';

var angular = require('angular');

function authController ($location, $log, MainService, toastr, errorHandlerService) {
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
}

angular.module('app')
.controller('AuthController', ['$location', '$log', 'MainService', 'toastr', 'errorHandlerService', authController]);
