(function () {
  'use strict';

  function mainController () {
    var vm = this;

    vm.hello = 'My Portfolio';

    //mixitup
    vm.categories = ['Soft', 'Elements'];

    vm.drawings = [{
        name: 'Random Quote Generator',
        category: 'Elements',
        image: '../images/random-quote-generator.png',
        updated_at: 'July 23, 2016'
    }, {
        name: 'Pagination Filter',
        category: 'Elements',
        image: 'images/pagination-filter.png',
        updated_at: 'September 5, 2015'
    }, {
        name: 'Interactive Form',
        category: 'Elements',
        image: 'images/interactive-form.png',
        updated_at: 'March 5, 2016'
    }, {
        name: 'Tic Tac Toe Game',
        category: 'Soft',
        image: 'images/tic-tac-toe.png',
        updated_at: 'April 10, 2016'
    }, {
        name: 'Movie Search',
        category: 'Soft',
        image: 'images/movie-search.png',
        updated_at: 'April 28, 2016'
    }];
  }

  angular.module('app')
  .controller('MainController', mainController);
})();
