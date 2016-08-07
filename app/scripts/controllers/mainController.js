'use strict';

var angular = require('angular');

function mainController ($location, $log, MainService, AuthService, UserService, toastr, errorHandlerService) {
  var vm = this;

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

  vm.hello = 'My Portfolio';

  // vm.editing = false;

  vm.projects = MainService.projects;

  MainService.getTreehouse().then(function (response) {
    vm.treehouse = response.data;
    $log.log(vm.treehouse);
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
  vm.categories = ['Soft', 'Elements'];

  // vm.drawings = [{
  //     name: 'Random Quote Generator',
  //     value: 1,
  //     category: 'Elements',
  //     image: 'images/random-quote-generator.png',
  //     created_on: 'July 23, 2016',
  //     link: 'http://amazon.com',
  //     github_link: 'https://github.com/chris-gaona/random-quote',
  //     comments: 'Chris, great work on your Random Quotes Generator! You really went above and beyond to meet the Exceeds requirements. I hope you enjoyed this project and learn so much throughout the rest of the TechDegree. Keep pushing yourself for Exceeds! :)',
  //     grade: 'Exceeds Expectations'
  // }, {
  //     name: 'Pagination Filter',
  //     value: 2,
  //     category: 'Elements',
  //     image: 'images/pagination-filter.png',
  //     created_on: 'September 5, 2015',
  //     link: ''
  // }, {
  //     name: 'Interactive Form',
  //     value: 3,
  //     category: 'Elements',
  //     image: 'images/interactive-form.png',
  //     created_on: 'March 5, 2016',
  //     link: ''
  // }, {
  //     name: 'Tic Tac Toe Game',
  //     value: 4,
  //     category: 'Soft',
  //     image: 'images/tic-tac-toe.png',
  //     created_on: 'April 10, 2016',
  //     link: ''
  // }, {
  //     name: 'Movie Search',
  //     value: 5,
  //     category: 'Soft',
  //     image: 'images/movie-search.png',
  //     created_on: 'April 28, 2016',
  //     link: ''
  // }];

  // vm.gradeOptions = ['Meets Expectations', 'Exceeds Expectations'];

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
}

angular.module('app')
.controller('MainController', ['$location', '$log', 'MainService', 'AuthService', 'UserService', 'toastr', 'errorHandlerService', mainController]);
