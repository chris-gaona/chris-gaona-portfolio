'use strict';

function imageLoadDirective () {
  return {
    restrict: 'A',

    link: function(scope, element) {
      element.on('load', function() {
        element.removeClass('spinner-hide');
        element.addClass('spinner-show');
        element.parent().find('span').remove();
      });
      scope.$watch('ngSrc', function() {
        element.addClass('spinner-hide');
      });
    }
  };
}

module.exports = function(ngModule) {
  ngModule.directive('imageload', imageLoadDirective);
};
