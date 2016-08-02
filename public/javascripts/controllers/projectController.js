(function () {
  'use strict';

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
      var newProjectObject = {};
      newProjectObject.name = vm.name;
      newProjectObject.category = vm.category;
      newProjectObject.image = vm.image;
      newProjectObject.created_on = vm.created_on;
      newProjectObject.link = vm.link;
      newProjectObject.github_link = vm.github_link;
      newProjectObject.comments = vm.comments;
      newProjectObject.grade = vm.grade;

      if ($routeParams.id) {
        MainService.edit($routeParams.id, newProjectObject)
        .then(function (project) {
          $log.log('Updated!');
        }, function (err) {
          // log the error to the console
          $log.error('Error ' + err);
        });
      } else {
        MainService.create(newProjectObject)
        .then(function (project) {
          // vm.message = project.data;
          $log.log('Created!');
        }, function (err) {
          // log the error to the console
          $log.error('Error ' + err);
        });
      }
    };
  }

  angular.module('app')
  .controller('ProjectController', ['$routeParams', '$location', '$log', 'MainService', projectController]);
})();
