'use strict';

var angular = require('angular');

function owlDirective () {
  return {
    // restrict to element only
    restrict: 'E',
    transclude: false,
    link: function (scope, element) {
      var options = scope.$eval($(element).attr('data-options'));

      // fixes issue with owl carousel showing {{}} when finger scrolling from github section to treehouse section
      setInterval(function(){
        $(element).owlCarousel(options);
      }, 1000);
    },
    // adds template url
    templateUrl: '../templates/owl-carousel.html'
  };
}

angular.module('app')
.directive('owlCarousel', owlDirective);
