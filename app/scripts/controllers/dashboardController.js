'use strict';

function dashboardController ($log, $location, $window, $timeout, DashboardService) {
  var vm = this;

  // all projects from MainService
  vm.budgets = DashboardService.budgets;
  $log.log(vm.budgets);

  vm.labels = ["January", "February", "March", "April", "May", "June"];
  vm.series = ['Projection', 'Actual'];
  vm.data = [
    [65, 59, 80, 81, 56, 55],
    [28, 48, 40, 19, 86, 27]
  ];
  vm.onClick = function s(points, evt) {
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

  vm.current = 27;
  vm.max = 100;

  vm.currentDollar = 499;
  vm.maxDollar = 1850;

  vm.showPreciseCurrent = function(amount){
    $timeout(function(){
      if (amount <= 0) {
        vm.preciseCurrent = vm.current;
      } else {
        var math = $window.Math;
        vm.preciseCurrent = math.min(math.round(amount), vm.max);
      }
    });
  };

  vm.showPreciseCurrentDollars = function(amount){
    $timeout(function(){
      if (amount <= 0) {
        vm.preciseCurrentDollar = vm.currentDollar;
      } else {
        var math = $window.Math;
        vm.preciseCurrentDollar = math.min(math.round(amount), vm.maxDollar);
      }
    });
  };

  vm.getTotals = function (array) {
    var total = 0;
    for (var i = 0; i < array.length; i++) {
      total += array[i].amount;
    }
    return total;
  };

  vm.getTotalSpent = function () {
    var total = 0;
    for (var i = 0; i < vm.budgets[0].budget_items.length; i++) {
      total += vm.getTotals(vm.budgets[0].budget_items[i].actual);
    }
    return total;
  };

  vm.getTotalRemaining = function () {
    var total = 0;
    for (var i = 0; i < vm.budgets[0].budget_items.length; i++) {
      total += (vm.budgets[0].budget_items[i].projection - vm.getTotals(vm.budgets[0].budget_items[i].actual));
    }
    return total;
  };






  //////NEW/////////

  vm.chosenItem = function (item) {
    vm.chosenBudgetItem = item;
  };

  vm.addNewItem = function () {
    var itemObject = {editing: false, item: '', projection: '', actual: [{name: "", amount: 0}]};
    vm.budgets[0].budget_items.push(itemObject);
    $log.log(vm.budgets[0].budget_items);
  };

  vm.editChosenItem = function (item) {
    item.editing = true;
    for (var i = 0; i < vm.budgets[0].budget_items.length; i++) {
      if (vm.budgets[0].budget_items[i] !== item) {
        vm.budgets[0].budget_items[i].editing = false;
      }
    }
  }

  vm.checkEditing = function () {
    var editing = false;
    for (var i = 0; i < vm.budgets[0].budget_items.length; i++) {
      if (vm.budgets[0].budget_items[i].editing === true) {
        editing = true;
      }
    }
    return editing;
  };

  vm.stopAllEditing = function () {
    for (var i = 0; i < vm.budgets[0].budget_items.length; i++) {
      vm.budgets[0].budget_items[i].editing = false;
    }
  };

  vm.deleteChosenItem = function (item) {
    var array = vm.budgets[0].budget_items;
    var i = array.indexOf(item);
    if(i != -1) {
    	array.splice(i, 1);
    }
  };








  vm.addEmptyActualItem = function () {
    vm.actualArray.push({name: "", amount: 0});
  };

  vm.deleteActualItem = function (item) {
    vm.actualArray.pop(item);
  };
}

module.exports = function(ngModule) {
  ngModule.controller('DashboardController', ['$log', '$location', '$window', '$timeout', 'DashboardService', dashboardController]);
};
