'use strict';

// requires angular
var angular = require('angular');

angular.module('app')

// creates config routes for angular application
.config(config);

function config ($routeProvider, $locationProvider) {
  $routeProvider
  .when('/', {
    controller: 'MainController',
    controllerAs: 'vm',
    templateUrl: 'templates/main.html',
    resolve: {
      projects: ['MainService', function (MainService) {
        return MainService.getAll();
      }]
    }
  })
  .when('/new', {
    controller: 'ProjectController',
    controllerAs: 'vm',
    templateUrl: 'templates/new-form.html',
    requireLogin: true
  })
  .when('/edit/:id', {
    controller: 'ProjectController',
    controllerAs: 'vm',
    templateUrl: 'templates/new-form.html',
    requireLogin: true
  })
  .when('/register', {
    controller: 'AuthController',
    controllerAs: 'vm',
    templateUrl: 'templates/authenticate.html',
    resolve: {
    check: ['$location', 'AuthService', function($location, AuthService) {
        if (AuthService.isLoggedIn()) {
          $location.path('/');
        }
      }]
    }
  })
  .when('/login', {
    controller: 'AuthController',
    controllerAs: 'vm',
    templateUrl: 'templates/authenticate.html',
    resolve: {
    check: ['$location', 'AuthService', function($location, AuthService) {
        if (AuthService.isLoggedIn()) {
          $location.path('/');
        }
      }]
    }
  })
  .otherwise({
    redirectTo: '/'
  });

  $locationProvider
  .html5Mode(true);
}
