'use strict';

var angular = require('angular');

function projectController ($routeParams, $location, $log, MainService, toastr, errorHandlerService) {
  var vm = this;

  vm.grades = [{ name: 'Exceeds Expectations' }, { name: 'Meets Expectations' }];

  if ($routeParams.id) {
    MainService.getOne($routeParams.id)
    .then(function (response) {
      vm.project = response.data;

      var project = response.data;
      vm.name = project.name;
      vm.category = project.category;
      vm.image = project.image;
      var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      var date = new Date(project.created_on);
      var newDate = monthNames[date.getMonth()] + ' ' +  date.getDate() + ', ' + date.getFullYear();
      vm.created_on = newDate;
      vm.link = project.link;
      vm.github_link = project.github_link;
      vm.comments = project.comments;
      vm.treehouse_comments = project.treehouse_comments;
      vm.grade = project.grade;
    }, function (err) {
      errorHandlerService.handleError(err);
      // log the error to the console
      $log.error('Error ' + err);
    });
  }

  vm.saveProject = function () {
    var projectObject = {};
    projectObject.name = vm.name;
    projectObject.category = vm.category;
    projectObject.image = vm.image;
    projectObject.created_on = vm.created_on;
    projectObject.link = vm.link;
    projectObject.github_link = vm.github_link;
    projectObject.comments = vm.comments;
    projectObject.treehouse_comments = vm.treehouse_comments;
    projectObject.grade = vm.grade;

    if ($routeParams.id) {
      MainService.edit($routeParams.id, projectObject)
      .then(function (project) {
        $location.path('/');
        toastr.success('Updated your project', 'Success!');
        $log.log('Updated!');
      }, function (err) {
        errorHandlerService.handleError(err, displayValidationErrors);
        // log the error to the console
        $log.error('Error ' + err);
      });
    } else {
      MainService.create(projectObject)
      .then(function (project) {
        toastr.success('Created your new project', 'Success!');
        $location.path('/');
        $log.log('Created!');
      }, function (err) {
        $log.log(err);
        errorHandlerService.handleError(err, displayValidationErrors);
        // log the error to the console
        $log.error('Error ' + err);
      });
    }
  };

  vm.goBack = function () {
    $location.path('/');
  };

  function displayValidationErrors(validationErrors) {
    vm.validationErrors = validationErrors.errors;
    $log.log(vm.validationErrors);
    vm.hasValidationErrors = true;
  }
}

angular.module('app')
.controller('ProjectController', ['$routeParams', '$location', '$log', 'MainService', 'toastr', 'errorHandlerService', projectController]);
