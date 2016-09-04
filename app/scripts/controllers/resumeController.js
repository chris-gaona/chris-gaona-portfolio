'use strict';

function resumeController () {
  var vm = this;

  vm.greeting = 'Hello there!';
}

module.exports = function(ngModule) {
  ngModule.controller('ResumeController', resumeController);
};
