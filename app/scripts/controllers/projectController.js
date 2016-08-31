'use strict';

// creatse the projectController
function projectController ($routeParams, $location, $log, MainService, toastr, errorHandlerService) {
  var vm = this;

  vm.hasValidationErrors = false;

  // potential grades I could have received
  vm.grades = [{ name: 'Exceeds Expectations' }, { name: 'Meets Expectations' }];

  // if there is an id in the url
  if ($routeParams.id) {
    // get that one project
    MainService.getOne($routeParams.id)
    .then(function (response) {
      vm.project = response.data;

      // fills in the ng-model in the form so this project can be edited
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

  // creates save project function
  vm.saveProject = function () {
    // creates project object to save to mongodb
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

    // if existing project is being edited
    if ($routeParams.id) {
      MainService.edit($routeParams.id, projectObject)
      .then(function () {
        // if successful redirect to home page and give client a message
        $location.path('/');
        toastr.success('Updated your project', 'Success!');
      }, function (err) {
        // else handle the error
        errorHandlerService.handleError(err, displayValidationErrors);
        // log the error to the console
        $log.error('Error ' + err);
      });
    } else {
      // else create a new project
      MainService.create(projectObject)
      .then(function () {
        // if successful redirect to home page and give client a message
        toastr.success('Created your new project', 'Success!');
        $location.path('/');
      }, function (err) {
        errorHandlerService.handleError(err, displayValidationErrors);
        // log the error to the console
        $log.error('Error ' + err);
      });
    }
  };

  // creates go back function in form
  vm.goBack = function () {
    $location.path('/');
  };

  // creates the callback function for errorHandlerService
  function displayValidationErrors(validationErrors) {
    vm.validationErrors = validationErrors.errors;
    $log.log(vm.validationErrors);
    vm.hasValidationErrors = true;
  }
}

module.exports = function(ngModule) {
  ngModule.controller('ProjectController', ['$routeParams', '$location', '$log', 'MainService', 'toastr', 'errorHandlerService', projectController]);
};
