'use strict';

function config ($stateProvider, $urlRouterProvider, $locationProvider) {
  $stateProvider
    .state('root', {
      abstract: true,
      views: {
        'navbar': {
          templateUrl: 'templates/navbar.html',
          controller: '',
        },
        'footer': {
          templateUrl: 'templates/footer.html',
          controller: ''
        }
      }
    })
    .state('home', {
      parent: 'root',
      url: '/',
      views: {
        'container@': {
          templateUrl: 'templates/main.html',
          controller: 'MainController',
          controllerAs: 'vm'
        }
      },
      resolve: {
        projects: ['MainService', function (MainService) {
          return MainService.getAll();
        }],
        treehouse: ['MainService', function (MainService) {
          return MainService.getTreehouse();
        }],
        codeschool: ['MainService', function (MainService) {
          return MainService.getCodeschool();
        }],
        github: ['MainService', function (MainService) {
          return MainService.getGithub();
        }],
        weather: ['WeatherService', function (WeatherService) {
          return WeatherService.getWeather();
        }]
      }
    })
    .state('new', {
      parent: 'root',
      url: '/new',
      views: {
        'container@': {
          templateUrl: 'templates/new-form.html',
          controller: 'ProjectController',
          controllerAs: 'vm',
          requireLogin: true
        }
      }
    })
    .state('edit', {
      parent: 'root',
      url: '/edit/{id}',
      views: {
        'container@': {
          templateUrl: 'templates/new-form.html',
          controller: 'ProjectController',
          controllerAs: 'vm',
          requireLogin: true
        }
      }
    })
    .state('register', {
      parent: 'root',
      url: '/register',
      views: {
        'container@': {
          templateUrl: 'templates/authenticate.html',
          controller: 'AuthController',
          controllerAs: 'vm'
        }
      }
    })
    .state('login', {
      parent: 'root',
      url: '/login',
      views: {
        'container@': {
          templateUrl: 'templates/authenticate.html',
          controller: 'AuthController',
          controllerAs: 'vm'
        }
      },
      resolve: {
        check: ['$state', 'AuthService', function($state, AuthService) {
          if (AuthService.isLoggedIn()) {
            $state.go('home');
          }
        }]
      }
    })
    .state('resume', {
      parent: 'root',
      url: '/resume',
      views: {
        'container@': {
          templateUrl: 'templates/resume.html',
          controller: 'ResumeController',
          controllerAs: 'vm'
        }
      }
    })
    .state('root2', {
      abstract: true,
      views: {
        'dashnavbar': {
          templateUrl: 'templates/dashboard-navbar.html',
          controller: '',
        }
      }
    })
    .state('dashboard', {
      parent: 'root2',
      url: '/dashboard',
      views: {
        'dashboard@': {
          templateUrl: 'templates/dashboard.html',
          controller: 'DashboardController',
          controllerAs: 'vm',
          requireLogin: true
        }
      }
    })
    .state('dashboard.budget', {
      parent: 'root2',
      url: '/budget',
      views: {
        'dashboard@': {
          templateUrl: 'templates/budget.html',
          controller: 'DashboardController',
          controllerAs: 'vm',
          requireLogin: true
        }
      },
      resolve: {
        budgets: ['DashboardService', function (DashboardService) {
          return DashboardService.getAll();
        }]
      }
    });

    $urlRouterProvider.otherwise('/');

    $locationProvider.html5Mode(true);
  }

module.exports = function(ngModule) {
  // creates config routes for angular application
  ngModule.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', config]);
};
