'use strict';

function resumeController ($location) {
  var vm = this;

  vm.greeting = 'Hello there!';

  // used with ng-clicks to handle the routing
  vm.goBack = function () {
    $location.path('/');
  };
}

module.exports = function(ngModule) {
  ngModule.controller('ResumeController', ['$location', resumeController]);
};
