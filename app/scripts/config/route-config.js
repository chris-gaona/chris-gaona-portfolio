'use strict';

function config ($routeProvider, $locationProvider) {
  $routeProvider
  .when('/', {
    controller: 'MainController',
    controllerAs: 'vm',
    template: require('./main.html'),
    resolve: {
      projects: ['MainService', function (MainService) {
        return MainService.getAll();
      }]
    }
  })
  .when('/new', {
    controller: 'ProjectController',
    controllerAs: 'vm',
    template: require('./new-form.html'),
    requireLogin: true
  })
  .when('/edit/:id', {
    controller: 'ProjectController',
    controllerAs: 'vm',
    template: require('./new-form.html'),
    requireLogin: true
  })
  .when('/register', {
    controller: 'AuthController',
    controllerAs: 'vm',
    template: require('./authenticate.html')
  })
  .when('/login', {
    controller: 'AuthController',
    controllerAs: 'vm',
    template: require('./authenticate.html'),
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

module.exports = function(ngModule) {
  // creates config routes for angular application
  ngModule.config(config);
};
