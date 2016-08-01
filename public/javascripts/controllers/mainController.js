(function () {
  'use strict';

  function mainController (MainService) {
    var vm = this;

    vm.hello = 'My Portfolio';

    // vm.editing = false;

    vm.projects = MainService.projects;
    console.log(vm.projects);

    MainService.getTreehouse().then(function (response) {
      vm.treehouse = response.data;
      console.log(vm.treehouse);
    }, function (error) {
      // log the error to the console
      $log.error('Error ' + error);
    });

    MainService.getCodeschool().then(function (response) {
      vm.codeschool = response.data;
      console.log(vm.codeschool);
    }, function (error) {
      // log the error to the console
      $log.error('Error ' + error);
    });

    MainService.getGithub().then(function (response) {
      vm.github = response.data;
      console.log(vm.github);
    }, function (error) {
      // log the error to the console
      $log.error('Error ' + error);
    });

    //mixitup
    vm.categories = ['Soft', 'Elements'];

    vm.drawings = [{
        name: 'Random Quote Generator',
        value: 1,
        category: 'Elements',
        image: 'images/random-quote-generator.png',
        created_on: 'July 23, 2016',
        link: 'http://amazon.com',
        github_link: 'https://github.com/chris-gaona/random-quote',
        comments: 'Chris, great work on your Random Quotes Generator! You really went above and beyond to meet the Exceeds requirements. I hope you enjoyed this project and learn so much throughout the rest of the TechDegree. Keep pushing yourself for Exceeds! :)',
        grade: 'Exceeds Expectations'
    }, {
        name: 'Pagination Filter',
        value: 2,
        category: 'Elements',
        image: 'images/pagination-filter.png',
        created_on: 'September 5, 2015',
        link: ''
    }, {
        name: 'Interactive Form',
        value: 3,
        category: 'Elements',
        image: 'images/interactive-form.png',
        created_on: 'March 5, 2016',
        link: ''
    }, {
        name: 'Tic Tac Toe Game',
        value: 4,
        category: 'Soft',
        image: 'images/tic-tac-toe.png',
        created_on: 'April 10, 2016',
        link: ''
    }, {
        name: 'Movie Search',
        value: 5,
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

    vm.addProject = function () {
      MainService.create({
        name: vm.name,
        category: vm.category,
        image: vm.image,
        created_on: vm.created_on,
        link: vm.link,
        github_link: vm.github_link,
        comments: vm.comments,
        grade: vm.grade
      }).then(function (response) {
        vm.message = response.data;
        console.log(vm.message);
      }, function (error) {
        // log the error to the console
        $log.error('Error ' + error);
      });
    };
  }

  angular.module('app')
  .controller('MainController', ['MainService', mainController]);
})();
