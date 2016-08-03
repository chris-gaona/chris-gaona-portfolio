'use strict';

var angular = require('angular');

function owlDirective () {
  return {
    // restrict to element only
    restrict: 'E',
    // replace: true, // Replace with the template below
    // transclude: true, // I want to insert custom content inside the directive
    link: function (scope, element, attrs) {
      var options = scope.$eval($(element).attr('data-options'));

      $(element).owlCarousel(options);
    },
    // adds template url for modal
    templateUrl: '../templates/owlCarousel.html' // See below
  };
}

angular.module('app')
.directive('owlCarousel', owlDirective);
