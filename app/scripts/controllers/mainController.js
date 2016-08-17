'use strict';

var angular = require('angular');

function mainController ($location, $log, $timeout, MainService, AuthService, UserService, WeatherService, toastr, errorHandlerService) {
  var vm = this;

  $timeout(function () { twttr.widgets.load(); }, 500);

  vm.isLoggedIn = AuthService.isLoggedIn();

  if (vm.isLoggedIn) {
    vm.currentUser = AuthService.currentUser();
    UserService.getUser(vm.currentUser).then(function(res) {
      vm.user = res.data;
    });
  }

  vm.logOut = function () {
    AuthService.logOut();
    vm.isLoggedIn = false;
    toastr.success('You are logged out', 'Success!');
  };

  vm.validationErrors = {};
  vm.hasValidationErrors = false;

  vm.projects = MainService.projects;

  MainService.getTreehouse().then(function (response) {
    vm.treehouse = response.data;
  }, function (error) {
    errorHandlerService.handleError(error);
    // log the error to the console
    $log.error('Error ' + error);
  });

  MainService.getCodeschool().then(function (response) {
    vm.codeschool = response.data;
  }, function (error) {
    errorHandlerService.handleError(error);
    // log the error to the console
    $log.error('Error ' + error);
  });

  MainService.getGithub().then(function (response) {
    vm.github = response.data;
  }, function (error) {
    errorHandlerService.handleError(error);
    // log the error to the console
    $log.error('Error ' + error);
  });

  //mixitup
  var categories = [];
  for (var i = 0; i < vm.projects.length; i++) {
    categories.push(vm.projects[i].category);
  }
  var uniqueCat = categories.filter(function(elem, index, self) {
    return index == self.indexOf(elem);
  });

  vm.categories = uniqueCat;

  vm.expandProject = false;

  vm.getProject = function (project) {
    vm.chosenProject = project;

    // modalShown variable is toggled between true & false
    vm.expandProject = !vm.expandProject;
  };

  vm.newProject = function () {
    $location.path('/new');
  };

  vm.editProject = function (id) {
    $location.path('/edit/' + id);
  };

  WeatherService.getWeather().then(function (response) {
    vm.weather = response.data;
  }, function (error) {
    errorHandlerService.handleError(error);
    // log the error to the console
    $log.error('Error ' + error);
  });
}

angular.module('app')
.controller('MainController', ['$location', '$log', '$timeout', 'MainService', 'AuthService', 'UserService', 'WeatherService', 'toastr', 'errorHandlerService', mainController]);
