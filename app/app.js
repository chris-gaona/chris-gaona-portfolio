'use strict';

// requires angular
import angular from 'angular';
import registerConfig from './scripts/config/route-config.js';
import registerControllers from './scripts/controllers';
import registerDirectives from './scripts/directives';
import registerServices from './scripts/services';

if (ON_TEST) {
  require('angular-mocks/angular-mocks');
}

// creates the angular app and lists dependencies
var ngModule = angular.module('app', ['ngRoute', 'duScroll', 'ngAnimate', 'toastr', '720kb.datepicker', 'ngMap'])
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
    closeButton: true,
    progressBar: true,
    tapToDismiss: true,
    preventOpenDuplicates: true
  });
});

// requires all needed angular files
registerConfig(ngModule);
registerControllers(ngModule);
registerServices(ngModule);
registerDirectives(ngModule);
