(function () {
  'use strict';

  angular.module('app', ['ngRoute'])

  .config(config);

  function config ($routeProvider) {
    $routeProvider
    .when('/', {
      controller: 'MainController',
      controllerAs: 'vm',
      templateUrl: 'templates/helloWorld.html'
    });
  }
})();
