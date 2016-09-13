'use strict';

function dashboardDirective () {
  return {
    // restrict to element only
    restrict: 'E',
    // adds scope with show set to = to make it able to be
    // changed from the controller, & directive
    scope: {
      labels: '=',
      series: '=',
      data: '=',
      config: '=',
      eventSources: '='
    },
    // adds template url
    templateUrl: '../templates/dashboard-overall.html'
  };
}

module.exports = function(ngModule) {
  ngModule.directive('dashboard', dashboardDirective);
};
