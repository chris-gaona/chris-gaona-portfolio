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
        created_on: 'July 23, 2016',
        link: 'http://amazon.com',
        github_link: 'https://github.com/chris-gaona/random-quote',
        comments: 'Chris, great work on your Random Quotes Generator! You really went above and beyond to meet the Exceeds requirements. I hope you enjoyed this project and learn so much throughout the rest of the TechDegree. Keep pushing yourself for Exceeds! :)',
        grade: 'Exceeds Expectations'
    }, {
        name: 'Pagination Filter',
        category: 'Elements',
        image: 'images/pagination-filter.png',
        created_on: 'September 5, 2015',
        link: ''
    }, {
        name: 'Interactive Form',
        category: 'Elements',
        image: 'images/interactive-form.png',
        created_on: 'March 5, 2016',
        link: ''
    }, {
        name: 'Tic Tac Toe Game',
        category: 'Soft',
        image: 'images/tic-tac-toe.png',
        created_on: 'April 10, 2016',
        link: ''
    }, {
        name: 'Movie Search',
        category: 'Soft',
        image: 'images/movie-search.png',
        created_on: 'April 28, 2016',
        link: ''
    }];

    vm.expandProject = false;

    vm.getProject = function (project) {
      console.log(project);
      vm.chosenProject = project;

      // modalShown variable is toggled between true & false
      vm.expandProject = !vm.expandProject;
    };
  }

  angular.module('app')
  .controller('MainController', mainController);
})();
