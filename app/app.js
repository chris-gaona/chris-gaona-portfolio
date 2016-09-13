'use strict';

// requires angular
var angular = require('angular');
require('angular-ui-router');
require('angular-scroll');
require('angular-animate');
require('angular-toastr');
require('angularjs-datepicker');
require('ngmap');
require('ng-file-upload');
require('chart.js');
require('angular-svg-round-progressbar');

var ngModule = angular.module('app', [
  'ui.router',
  'duScroll',
  'ngAnimate',
  'toastr',
  '720kb.datepicker',
  'ngMap',
  'ngFileUpload',
  'chart.js',
  'ui.calendar',
  'angular-svg-round-progressbar'
]).run(function($rootScope, $state, AuthService) {
  // wire up the route change start handler
  // in order to determine if the requested route requires a user login
  $rootScope.$on('$routeChangeStart', function(event, next) {
    // if the "require login" property is set to "true"
    // and we don't have an authenticated user...
    // then send the user to the "Sign In" view.
    if (next.requireLogin && !AuthService.isLoggedIn()) {
      $state.go('login');
      event.preventDefault();
    }
  });
}).config(function ($uiViewScrollProvider) {
  $uiViewScrollProvider.useAnchorScroll()
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

// // creates the angular app and lists dependencies
// var ngModule = angular.module('app', ['ngRoute', 'duScroll', 'ngAnimate', 'toastr', '720kb.datepicker', 'ngMap', 'ngFileUpload', 'chart.js', 'ui.calendar', 'angular-svg-round-progressbar'])
// .run(function($rootScope, $location, AuthService) {
//   // wire up the route change start handler
//   // in order to determine if the requested route requires a user login
//   $rootScope.$on('$routeChangeStart', function(event, next) {
//     // if the "require login" property is set to "true"
//     // and we don't have an authenticated user...
//     // then send the user to the "Sign In" view.
//     if (next.requireLogin && !AuthService.isLoggedIn()) {
//       $location.path('/login');
//       event.preventDefault();
//     }
//   });
// // creates config for toastr
// }).config(function(toastrConfig) {
//   angular.extend(toastrConfig, {
//     containerId: 'toast-container',
//     positionClass: 'toast-bottom-right',
//     closeButton: true,
//     progressBar: true,
//     tapToDismiss: true,
//     preventOpenDuplicates: true
//   });
// });

// requires all needed angular files
require('./scripts/config/route-config.js')(ngModule);
require('./scripts/controllers')(ngModule);
require('./scripts/directives')(ngModule);
require('./scripts/services')(ngModule);
