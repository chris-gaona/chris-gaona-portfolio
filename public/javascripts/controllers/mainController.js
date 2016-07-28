(function () {
  'use strict';

  function mainController () {
    var vm = this;

    vm.hello = 'My Portfolio';

    //mixitup
    vm.categories = ['Soft', 'Elements'];

    vm.drawings = [{
        name: 'Water',
        category: 'Elements',
        value: '2'
    }, {
        name: 'Fire',
        category: 'Elements',
        value: '1'
    }, {
        name: 'Air',
        category: 'Elements',
        value: '4'
    }, {
        name: 'Coton',
        category: 'Soft',
        value: '3'
    }, {
        name: 'Whool',
        category: 'Soft',
        value: '5'
    }];
  }

  angular.module('app')
  .controller('MainController', mainController);
})();
