'use strict';

function hamburgerDirective () {
  return {
    // restrict to element only
    restrict: 'E',
    // adds scope with show set to = to make it able to be
    // changed from the controller, & directive
    scope: {
      variable: '=',
      hover: '='
    },
    // adds template url
    templateUrl: '../templates/hamburger.html'
  };
}

module.exports = function(ngModule) {
  ngModule.directive('hamburger', hamburgerDirective);
};
