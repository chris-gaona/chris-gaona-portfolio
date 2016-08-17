'use strict';

var angular = require('angular');

function expandProjectDirective () {
  return {
    // restrict to element only
    restrict: 'E',
    // adds scope with show set to = to make it able to be
    // changed from the controller, & directive
    scope: {
      show: '=',
      project: '='
    },
    // replace: true, // Replace with the template below
    // transclude: true, // I want to insert custom content inside the directive
    link: function (scope) {
      // if hideModal button is clicked set show to false
      // to remove the modal window
      scope.collapseProject = function () {
        scope.show = false;
      };
    },
    // adds template url for modal
    templateUrl: '../templates/expand-project.html' // See below
  };
}

angular.module('app')
.directive('expandProject', expandProjectDirective);
