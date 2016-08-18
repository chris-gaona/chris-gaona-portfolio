'use strict';

var angular = require('angular');

function authController ($location, $log, MainService, AuthService, toastr) {
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
      toastr.error('Please see above', 'Form Errors!');
      $log.log(error);
    }).then(function() {
      toastr.success('You are now registered', 'Success!');
      $location.path('/');
    });
  };

  vm.loginUser = function() {
    AuthService.logIn(vm.user).error(function(error) {
      vm.error = error;
      toastr.error('Please see above', 'Form Errors!');
      $log.log(vm.error);
    }).then(function() {
      toastr.success('You are logged in', 'Success!');
      $location.path('/');
    });
  };
}

angular.module('app')
.controller('AuthController', ['$location', '$log', 'MainService', 'AuthService', 'toastr', authController]);
