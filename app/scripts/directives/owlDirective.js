'use strict';

function owlDirective ($interval) {
  return {
    // restrict to element only
    restrict: 'E',
    transclude: false,
    link: function (scope, element) {
      var options = scope.$eval($(element).attr('data-options'));

      function initCarousel() {
        $(element).owlCarousel(options);
      }
      // fixes issue with owl carousel showing {{}} when finger scrolling from github section to treehouse section
      // the $interval piece automatically updates the DOM - don't need time portion
      // it will cause Angular to run through an entire event loop before replacing
      var stopIt = $interval(initCarousel);

      // listen on DOM destroy (removal) event, and cancel the next UI update
      // to prevent updating after the DOM element was removed.
      element.on('$destroy', function() {
        $interval.cancel(stopIt);
      });
    },
    // adds template url
    templateUrl: '../templates/owl-carousel.html'
  };
}

module.exports = function(ngModule) {
  ngModule.directive('owlCarousel', owlDirective);
};
