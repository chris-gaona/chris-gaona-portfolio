'use strict';

function dashboardController ($log, $location, $window) {
  var vm = this;

  vm.showDashboard = true;
  vm.showBudget = false;

  vm.closeOthers = function (sections) {
    $log.log(sections);
    for (var i = 0; i < sections.length; i++) {
      var section = vm + '.' + sections[i];
    }
    $log.log(section);
  };

  // used with ng-clicks to handle the routing
  vm.goBack = function () {
    $location.path('/');
  };

  vm.printResume = function () {
    $window.print();
  };
}

module.exports = function(ngModule) {
  ngModule.controller('DashboardController', ['$log', '$location', '$window', dashboardController]);
};
