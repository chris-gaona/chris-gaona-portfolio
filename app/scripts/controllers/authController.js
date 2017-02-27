'use strict';

// function for auth controller
function authController ($location, $log, MainService, AuthService, toastr, errorHandlerService) {
  var vm = this;

  vm.hasValidationErrors = false;

  // used with ng-clicks to handle the routing
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

  // register user function
  vm.registerUser = function() {
    AuthService.register(vm.user).then(function(data) {
      // if not errors give a message to client & redirect to home page
      toastr.success('You are now registered', 'Success!');
      $location.path('/');
      AuthService.saveToken(data.data.token);

    }, function (err) {
      errorHandlerService.handleError(err, displayValidationErrors);
      // log the error to the console
      $log.error('Error ' + err);
    });
  };

  // login user function
  vm.loginUser = function() {
    AuthService.logIn(vm.user).then(function(data) {
      console.log('data', data);
      // if not errors give a message to client & redirect to home page
      toastr.success('You are logged in', 'Success!');
      $location.path('/');
      AuthService.saveToken(data.data.token);

    }, function (err) {
      errorHandlerService.handleError(err, displayValidationErrors);
      // log the error to the console
      $log.error('Error ' + err);
    });
  };

  // creates the callback function for errorHandlerService
  function displayValidationErrors(validationErrors) {
    vm.validationErrors = validationErrors.errors;
    $log.log(vm.validationErrors);
    vm.hasValidationErrors = true;
  }
}

module.exports = function(ngModule) {
  ngModule.controller('AuthController', ['$location', '$log', 'MainService', 'AuthService', 'toastr', 'errorHandlerService', authController]);
};
