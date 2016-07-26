(function () {
  'use strict';

  function mainController () {
    var vm = this;

    vm.hello = 'Hello World with Angular.js!';
  }

  angular.module('app')
  .controller('MainController', mainController);
})();
