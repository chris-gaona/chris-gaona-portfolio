'use strict';

function dashboardController ($log, $http, $location, $window, $timeout, toastr, DashboardService, errorHandlerService) {
  var vm = this;

  // all projects from MainService
  vm.allBudgets = DashboardService.budgets;
  vm.budgets = DashboardService.current;
  vm.currentBudget = vm.budgets[0].start_period;

  vm.start_period = getDate(vm.budgets[0].start_period);
  vm.end_period = getDate(vm.budgets[0].end_period);
  vm.current_cash = vm.budgets[0].current_cash;
  vm.existing_cash = vm.budgets[0].existing_cash;

  $log.log('Current Budget: ', vm.currentBudget);


  $log.log(vm.budgets);
  $log.log(vm.allBudgets);


  function getDate (date) {
    var today;
    // if there is a date parameter passed in, use that else just use today's date
    if (date) {
      return today = new Date(date);
    } else {
      return today = new Date();
    }
  }




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




  vm.barChart = {
    element: "graph",
    data: [
      {month: 'Mar', projection: 300, saved: 325},
      {month: 'Apr', projection: 300, saved: 285},
      {month: 'May', projection: 300, saved: 300},
      {month: 'Jun', projection: 300, saved: 225},
      {month: 'Jul', projection: 300, saved: 295.5},
      {month: 'Aug', projection: 300, saved: 420}

    ],
    options: {
      xkey: 'month',
      ykeys: ['projection', 'saved'],
      labels: ['Projection', 'Saved'],
      resize: true,
      hideHover: true
    }
  };

  vm.smallChart = {
    element: "graph",
    data: [
      {month: 'Mar', saved: 325},
      {month: 'Apr', saved: 285},
      {month: 'May', saved: 300},
      {month: 'Jun', saved: 225},
      {month: 'Jul', saved: 295.5},
      {month: 'Aug', saved: 420}

    ],
    options: {
      xkey: 'month',
      ykeys: ['saved'],
      labels: ['Saved'],
      axes: false,
      grid: false,
      hideHover: true,
      barColors: ["rgb(92, 184, 92)"]
    }
  };




  vm.editBudgetMain = false;
  //////NEW/////////
  vm.modalShown = false;

  vm.newBudget = function () {
    // today's date
    var today = new Date();
    // today's date + 7 days
    var addTwoWeeks = new Date();
    addTwoWeeks.setDate(today.getDate() + 14);

    var newBudgetObject = {};
    newBudgetObject.start_period = today;
    newBudgetObject.end_period = addTwoWeeks;
    newBudgetObject.current_cash = 1853.25;
    newBudgetObject.existing_cash = 24282;
    newBudgetObject.budget_items = [{editing: false, item: "", projection: 0, actual: []}];


    DashboardService.create(newBudgetObject)
    .then(function (response) {
      $log.log(response.data);
      var budgetArray = [];
      budgetArray.push(response.data);
      vm.budgets = budgetArray;
      vm.allBudgets.push({_id: response.data._id, end_period: response.data.end_period, start_period: response.data.start_period});
      vm.currentBudget = response.data.start_period;

      vm.start_period = getDate(response.data.start_period);
      vm.end_period = getDate(response.data.end_period);
      vm.current_cash = response.data.current_cash;
      vm.existing_cash = response.data.existing_cash;
      toastr.success('New budget created', 'Success!');
    }, function (err) {
      // else handle the error
      errorHandlerService.handleError(err, displayValidationErrors);
      // log the error to the console
      $log.error('Error: ', err);
    });
  };

  vm.editBudget = function () {
    var newBudgetObject = {};
    newBudgetObject._id = vm.budgets[0]._id;
    newBudgetObject.start_period = new Date(vm.start_period);
    newBudgetObject.end_period = new Date(vm.end_period);
    newBudgetObject.current_cash = vm.current_cash;
    newBudgetObject.existing_cash = vm.existing_cash;
    newBudgetObject.budget_items = vm.budgets[0].budget_items;

    DashboardService.edit(vm.budgets[0]._id, newBudgetObject)
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

      vm.start_period = getDate(vm.budgets[0].start_period);
      vm.end_period = getDate(vm.budgets[0].end_period);
      vm.current_cash = vm.budgets[0].current_cash;
      vm.existing_cash = vm.budgets[0].existing_cash;
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
  ngModule.controller('DashboardController', ['$log', '$http', '$location', '$window', '$timeout', 'toastr', 'DashboardService', 'errorHandlerService', dashboardController]);
};
