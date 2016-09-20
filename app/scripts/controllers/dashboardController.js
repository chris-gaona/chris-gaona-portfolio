'use strict';

function dashboardController ($log, $location, $window, $timeout, toastr, DashboardService, errorHandlerService) {
  var vm = this;

  // all projects from MainService
  vm.allBudgets = DashboardService.budgets;
  vm.budgets = DashboardService.current;
  vm.currentBudget = vm.budgets[0].start_period;

  $log.log('Current Budget: ', vm.currentBudget);


  $log.log(vm.budgets);
  $log.log(vm.allBudgets);

  vm.labels = ["January", "February", "March", "April", "May", "June"];
  vm.series = ['Projection', 'Actual'];
  vm.data = [
    [65, 59, 80, 81, 56, 55],
    [28, 48, 40, 19, 86, 27]
  ];

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
      editable: true
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





  //////NEW/////////
  vm.modalShown = false;

  vm.editBudget = function () {
    DashboardService.edit(vm.budgets[0]._id, vm.budgets[0])
    .then(function () {
      vm.modalShown = false;
      toastr.success('Updated your budget', 'Success!');
    }, function (err) {
      // else handle the error
      errorHandlerService.handleError(err, displayValidationErrors);
      // log the error to the console
      $log.error('Error: ', err);
    });
  };

  vm.updateBudget = function () {
    $log.log('Current Budget: ', vm.currentBudget);
    var requestedBudget;
    for (var i = 0; i < vm.allBudgets.length; i++) {
      if (vm.allBudgets[i].start_period === vm.currentBudget) {
        $log.log(true);
        requestedBudget = vm.allBudgets[i];
      }
    }

    $log.log('Requested Budget :', requestedBudget);

    DashboardService.getOne(requestedBudget._id).then(function successCallback (response) {
      $log.log(response);
      var budgetArray = [];
      budgetArray.push(response.data);
      vm.budgets = budgetArray;
    }, function errorCallback (error) {
      $log.error(error);
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

  //convert budgets array using getTotals function
  vm.convertBudgetArray = function (array) {
    var newArray;
    var total;
    for (var i = 0; i < array.length; i++) {
      total = vm.getTotals(array[i].actual);
      array[i].actual_total = total;
    }
    return vm.budgets[0].budget_items;
  };

  vm.myValueFunction = function(item) {
    return vm.getTotals(item);
  };

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
    vm.chosenBudgetItem.actual.push({name: "", amount: 0});
  };

  vm.deleteActualItem = function (item) {
    var array = vm.chosenBudgetItem.actual;
    var i = array.indexOf(item);
    if(i != -1) {
    	array.splice(i, 1);
    }
  };

  // creates the callback function for errorHandlerService
  function displayValidationErrors(validationErrors) {
    vm.validationErrors = validationErrors.errors;
    $log.log(vm.validationErrors);
    vm.hasValidationErrors = true;
  }
}

module.exports = function(ngModule) {
  ngModule.controller('DashboardController', ['$log', '$location', '$window', '$timeout', 'toastr', 'DashboardService', 'errorHandlerService', dashboardController]);
};
