'use strict';

function dashboardController ($log, $location, $window, $timeout) {
  var vm = this;

  vm.showDashboard = true;
  vm.showBudget = false;

  // used with ng-clicks to handle the routing
  vm.goBack = function () {
    $location.path('/');
  };

  vm.labels = ["January", "February", "March", "April", "May", "June"];
  vm.series = ['Series A', 'Series B'];
  vm.data = [
    [65, 59, 80, 81, 56, 55],
    [28, 48, 40, 19, 86, 27]
  ];
  vm.onClick = function (points, evt) {
    console.log(points, evt);
  };

  // // Simulate async data update
  // $timeout(function () {
  //   vm.data = [
  //     [28, 48, 40, 19, 86, 27, 90],
  //     [65, 59, 80, 81, 56, 55, 40]
  //   ];
  // }, 3000);

  vm.eventSources = [];

  vm.uiConfig = {
      calendar:{
        height: 460,
        editable: true,
        header:{
          left: 'month agendaWeek agendaDay'
        }
      }
    };
}

module.exports = function(ngModule) {
  ngModule.controller('DashboardController', ['$log', '$location', '$window', '$timeout', dashboardController]);
};
