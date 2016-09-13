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
    });

    $urlRouterProvider.otherwise('/');

    $locationProvider.html5Mode(true);
  }

//   $routeProvider
//   .when('/', {
//     controller: 'MainController',
//     controllerAs: 'vm',
//     templateUrl: 'templates/main.html',
//     resolve: {
//       projects: ['MainService', function (MainService) {
//         return MainService.getAll();
//       }],
//       treehouse: ['MainService', function (MainService) {
//         return MainService.getTreehouse();
//       }],
//       codeschool: ['MainService', function (MainService) {
//         return MainService.getCodeschool();
//       }],
//       github: ['MainService', function (MainService) {
//         return MainService.getGithub();
//       }],
//       weather: ['WeatherService', function (WeatherService) {
//         return WeatherService.getWeather();
//       }]
//     }
//   })
//   .when('/new', {
//     controller: 'ProjectController',
//     controllerAs: 'vm',
//     templateUrl: 'templates/new-form.html',
//     requireLogin: true
//   })
//   .when('/edit/:id', {
//     controller: 'ProjectController',
//     controllerAs: 'vm',
//     templateUrl: 'templates/new-form.html',
//     requireLogin: true
//   })
//   .when('/register', {
//     controller: 'AuthController',
//     controllerAs: 'vm',
//     templateUrl: 'templates/authenticate.html'
//   })
//   .when('/login', {
//     controller: 'AuthController',
//     controllerAs: 'vm',
//     templateUrl: 'templates/authenticate.html',
//     resolve: {
//     check: ['$location', 'AuthService', function($location, AuthService) {
//         if (AuthService.isLoggedIn()) {
//           $location.path('/');
//         }
//       }]
//     }
//   })
//   .when('/resume', {
//     controller: 'ResumeController',
//     controllerAs: 'vm',
//     templateUrl: 'templates/resume.html'
//   })
//   .when('/dashboard', {
//     controller: 'DashboardController',
//     controllerAs: 'vm',
//     templateUrl: 'templates/dashboard.html'
//   })
//   .otherwise({
//     redirectTo: '/'
//   });
//
//   $locationProvider
//   .html5Mode(true);
// }

module.exports = function(ngModule) {
  // creates config routes for angular application
  ngModule.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', config]);
};
