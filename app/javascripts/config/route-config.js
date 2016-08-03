(function () {
  'use strict';

  angular.module('app', ['ngRoute', 'duScroll'])

  .config(config);

  function config ($routeProvider) {
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
      templateUrl: 'templates/new-form.html'
    })
    .when('/edit/:id', {
      controller: 'ProjectController',
      controllerAs: 'vm',
      templateUrl: 'templates/new-form.html'
    })
    .otherwise({
      redirectTo: '/'
    });
  }
})();
