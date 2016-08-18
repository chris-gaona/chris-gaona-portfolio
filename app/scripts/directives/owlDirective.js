'use strict';

var angular = require('angular');

function owlDirective () {
  return {
    // restrict to element only
    restrict: 'E',
    link: function (scope, element) {
      var options = scope.$eval($(element).attr('data-options'));

      $(element).owlCarousel(options);
    },
    // adds template url
    templateUrl: '../templates/owl-carousel.html'
  };
}

angular.module('app')
.directive('owlCarousel', owlDirective);
