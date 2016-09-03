'use strict';

// creates function for main controller
function mainController ($location, $log, $timeout, MainService, AuthService, UserService, WeatherService, toastr) {
  var vm = this;

  // this timeout is used to make sure the twitter widget loads after the angular application loads otherwise an error is thrown
  $timeout(function () { twttr.widgets.load(); }, 500);

  // checks if user is logged in
  vm.isLoggedIn = AuthService.isLoggedIn();

  // if there is a logged in user
  if (vm.isLoggedIn) {
    // get the current user info
    vm.currentUser = AuthService.currentUser();
    UserService.getUser(vm.currentUser).then(function(res) {
      vm.user = res.data;
    });
  }

  // logout function
  vm.logOut = function () {
    // destroys login token for user & gives useful message to client
    AuthService.logOut();
    vm.isLoggedIn = false;
    toastr.success('You are logged out', 'Success!');
  };

  // all projects from MainService
  vm.projects = MainService.projects;

  // gets treehouse data
  vm.treehouse = MainService.treehouse;

  // gets codeschool data
  vm.codeschool = MainService.codeschool;

  // gets github data
  vm.github = MainService.github;

  // gets the weather from the WeatherService
  vm.weather = WeatherService.weather;

  vm.getCategories = function (projects) {
    //mixitup categories
    var categories = [];
    for (var i = 0; i < projects.length; i++) {
      categories.push(projects[i].category);
    }
    // makes sure we don't have duplicates to display to client
    var uniqueCat = categories.filter(function(elem, index, self) {
      return index == self.indexOf(elem);
    });

    return uniqueCat;
  };

  vm.activeFilter = 'all';
  
  vm.setActiveFilter = function(filterItem) {
    vm.activeFilter = filterItem;
  }

  // used for project expansion section to see project details
  vm.expandProject = false;

  // creates getProject function
  vm.getProject = function (project) {
    vm.chosenProject = project;

    // toggled between true & false
    vm.expandProject = !vm.expandProject;
  };

  // on ng-click of this function user is sent to /new route
  vm.newProject = function () {
    $location.path('/new');
  };

  // on ng-click of this function user is sent to /edit route
  vm.editProject = function (id) {
    $location.path('/edit/' + id);
  };

  vm.loginButton = function () {
    $location.path('/login');
  };
}

module.exports = function(ngModule) {
  ngModule.controller('MainController', ['$location', '$log', '$timeout', 'MainService', 'AuthService', 'UserService', 'WeatherService', 'toastr', mainController]);
};
