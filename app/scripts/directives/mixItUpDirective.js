'use strict';

var angular = require('angular');

function mixItUpDirective () {
  return {
    // restrict to element only
    restrict: 'E',
    scope:{
      entities: '=',
      itemClick: '&',
      editButton: '&',
      loggedIn: '='
    },
    link: function (scope, element) {
      scope.$watch('entities', function(){
        $(element).mixItUp();
        // how to tell mixitup to reload the data
      });
    },
    // adds template url
    templateUrl: '../templates/mixitup.html'
  };
}

angular.module('app')
.directive('mixitup', mixItUpDirective);
