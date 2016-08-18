'use strict';

var angular = require('angular');

// creates validation errors function
function ValidationErrors() {
  // creates controller
  var controller = ['$scope', function($scope) {
    $scope.$watch('errors', function(newValue) {
      var errorsToDisplay = [];

      if (newValue) {
        for (var key in newValue) {
          if (newValue.hasOwnProperty(key)) {
            errorsToDisplay = errorsToDisplay.concat(newValue[key]);
          }
        }
      }

      // sets errors to display
      $scope.errorsToDisplay = errorsToDisplay;
    });
  }];

  return {
    // restrict to Element only
    restrict: 'E',
    scope: {
      errors: '='
    },
    controller: controller,
    templateUrl: '../templates/validation-errors.html'
  };
}

angular.module('app')
.directive('validationErrors', ValidationErrors);
