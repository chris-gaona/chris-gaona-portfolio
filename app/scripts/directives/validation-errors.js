'use strict';

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
    template: require('./validation-errors.html')
  };
}

module.exports = function(ngModule) {
  ngModule.directive('validationErrors', ValidationErrors);
};
