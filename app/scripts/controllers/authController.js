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
    // if (vm.user.password.toLowerCase() !== vm.user.confirmPassword.toLowerCase()) {
    //
    // }

    AuthService.register(vm.user).error(function(error) {
      vm.error = error;
      toastr.error('Please see above', 'Form Errors!');
      $log.log(error);
    }).then(function() {
      toastr.success('Please see above', 'Form Errors!');
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
.controller('AuthController', ['$location', '$log', 'MainService', 'AuthService', 'toastr', 'errorHandlerService', authController]);
