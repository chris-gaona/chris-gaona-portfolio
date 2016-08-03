(function () {
  'use strict';

  function expandProjectDirective () {
    return {
      // restrict to element only
      restrict: 'E',
      // adds scope with show set to = to make it able to be
      // changed from the controller, & directive
      scope: {
        show: '='
      },
      // replace: true, // Replace with the template below
      // transclude: true, // I want to insert custom content inside the directive
      link: function (scope, element, attrs) {
        // if hideModal button is clicked set show to false
        // to remove the modal window
        scope.collapseProject = function () {
          scope.show = false;
        };
      }
      // adds template url for modal
      // templateUrl: '../templates/modal.html' // See below
    }
  }

  angular.module('app')
  .directive('expandProject', expandProjectDirective);
})();
