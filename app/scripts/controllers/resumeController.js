'use strict';

function resumeController ($location, $window) {
  var vm = this;

  vm.greeting = 'Hello there!';

  // used with ng-clicks to handle the routing
  vm.goBack = function () {
    $location.path('/');
  };

  vm.printResume = function () {
    $window.print();
  };
}

module.exports = function(ngModule) {
  ngModule.controller('ResumeController', ['$location', '$window', resumeController]);
};
