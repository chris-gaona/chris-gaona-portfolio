'use strict';

var angular = require('angular');

function projectController ($routeParams, $location, $log, MainService) {
  var vm = this;

  if ($routeParams.id) {
    MainService.getOne($routeParams.id)
    .then(function (response) {
      vm.project = response.data;

      var project = response.data;
      vm.name = project.name;
      vm.category = project.category;
      vm.image = project.image;
      vm.created_on = project.created_on;
      vm.link = project.link;
      vm.github_link = project.github_link;
      vm.comments = project.comments;
      vm.grade = project.grade;
    }, function (err) {
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
    projectObject.grade = vm.grade;

    if ($routeParams.id) {
      MainService.edit($routeParams.id, projectObject)
      .then(function (project) {
        $location.path('/');
        $log.log('Updated!');
      }, function (err) {
        // log the error to the console
        $log.error('Error ' + err);
      });
    } else {
      MainService.create(projectObject)
      .then(function (project) {
        // vm.message = project.data;
        $location.path('/');
        $log.log('Created!');
      }, function (err) {
        // log the error to the console
        $log.error('Error ' + err);
      });
    }
  };

  vm.goBack = function () {
    $location.path('/');
  };
}

angular.module('app')
.controller('ProjectController', ['$routeParams', '$location', '$log', 'MainService', projectController]);
