'use strict';

function imageLoadDirective () {
  return {
    restrict: 'A',

    link: function(scope, element) {
      element.on('load', function() {
        element.next('div').removeClass('loader-visible');
        element.next('div').children().removeClass('loader-visible');
        element.next('div').addClass('loader-hidden');
        element.next('div').children().addClass('loader-hidden');
        element.removeClass('spinner-hide');
      });
      scope.$watch('ngSrc', function() {
        element.addClass('spinner-hide');
        element.next('div').addClass('loader-visible');
        element.next('div').children().addClass('loader-visible');
      });
    }
  };
}

module.exports = function(ngModule) {
  ngModule.directive('imageload', imageLoadDirective);
};
