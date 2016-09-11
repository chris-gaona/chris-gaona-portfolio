'use strict';

function dashboardController ($location, $window) {
  var vm = this;

  vm.greeting = 'Hello there!';

  // used with ng-clicks to handle the routing
  vm.goBack = function () {
    $location.path('/');
  };

  vm.printResume = function () {
    $window.print();
  };
}

module.exports = function(ngModule) {
  ngModule.controller('DashboardController', ['$location', '$window', dashboardController]);
};
