'use strict';

var angular = require('angular');

angular.module('app', ['ngRoute', 'duScroll', 'ngAnimate', 'toastr', '720kb.datepicker'])
.run(function($rootScope, $location, AuthService) {
  // wire up the route change start handler
  // in order to determine if the requested route requires a user login
  $rootScope.$on('$routeChangeStart', function(event, next, current) {
    // if the "require login" property is set to "true"
    // and we don't have an authenticated user...
    // then send the user to the "Sign In" view.
    if (next.requireLogin && AuthService.isLoggedIn()) {
      $location.path('/login');
      event.preventDefault();
    }
  });
});

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
require('./scripts/services/error-handler.js');
