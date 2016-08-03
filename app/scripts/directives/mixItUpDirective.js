'use strict';

var angular = require('angular');

function mixItUpDirective () {
  return {
    // restrict to element only
    restrict: 'E',
    scope:{
      entities: '='
    },
    // replace: true, // Replace with the template below
    // transclude: true, // I want to insert custom content inside the directive
    link: function (scope, element, attrs) {
      scope.$watch('entities', function(){
        $(element).mixItUp();
        // how to tell mixitup to reload the data
      });
    }
  };
}

angular.module('app')
.directive('mixitup', mixItUpDirective);
