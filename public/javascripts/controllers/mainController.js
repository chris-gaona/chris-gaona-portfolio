(function () {
  'use strict';

  function mainController () {
    var vm = this;

    vm.hello = 'My Portfolio';
  }

  angular.module('app')
  .controller('MainController', mainController);
})();
