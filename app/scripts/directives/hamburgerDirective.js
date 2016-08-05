'use strict';

var angular = require('angular');

function hamburgerDirective () {
  return {
    // restrict to element only
    restrict: 'E',
    // adds scope with show set to = to make it able to be
    // changed from the controller, & directive
    scope: {
      variable: '='
    },
    // replace: true, // Replace with the template below
    // transclude: true, // I want to insert custom content inside the directive
    link: function (scope, element, attrs) {

    },
    // adds template url for modal
    templateUrl: '../templates/hamburger.html' // See below
  };
}

angular.module('app')
.directive('hamburger', hamburgerDirective);
