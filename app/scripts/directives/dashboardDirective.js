'use strict';

function dashboardDirective () {
  return {
    // restrict to element only
    restrict: 'E',
    // adds scope with show set to = to make it able to be
    // changed from the controller, & directive
    scope: {
      show: '=',
      project: '=',
      likeButton: '&',
      incrementCount: '&'
    },
    link: function (scope) {
      // if collapseProject button is clicked set show to false to remove the expanded project
      scope.collapseProject = function () {
        scope.show = false;
      };
    },
    // adds template url
    templateUrl: '../templates/dashboard-overall.html'
  };
}

module.exports = function(ngModule) {
  ngModule.directive('dashboard', dashboardDirective);
};
