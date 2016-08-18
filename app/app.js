'use strict';

// requires angular
var angular = require('angular');

// creates the angular app and lists dependencies
angular.module('app', ['ngRoute', 'duScroll', 'ngAnimate', 'toastr', '720kb.datepicker', 'ngMap'])
.run(function($rootScope, $location, AuthService) {
  // wire up the route change start handler
  // in order to determine if the requested route requires a user login
  $rootScope.$on('$routeChangeStart', function(event, next) {
    // if the "require login" property is set to "true"
    // and we don't have an authenticated user...
    // then send the user to the "Sign In" view.
    if (next.requireLogin && !AuthService.isLoggedIn()) {
      $location.path('/login');
      event.preventDefault();
    }
  });
// creates config for toastr
}).config(function(toastrConfig) {
  angular.extend(toastrConfig, {
    containerId: 'toast-container',
    positionClass: 'toast-bottom-right',
    closeButton: true
  });
});

// requires all needed angular files
require('./scripts/config/route-config.js');
require('./scripts/controllers/mainController.js');
require('./scripts/controllers/projectController.js');
require('./scripts/controllers/authController.js');
require('./scripts/directives/expandDirective.js');
require('./scripts/directives/mixItUpDirective.js');
require('./scripts/directives/owlDirective.js');
require('./scripts/directives/hamburgerDirective.js');
require('./scripts/directives/validation-errors.js');
require('./scripts/services/mainService.js');
require('./scripts/services/authService.js');
require('./scripts/services/userService.js');
require('./scripts/services/weatherService.js');
require('./scripts/services/error-handler.js');
