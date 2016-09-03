'use strict';

function mixItUpDirective () {
  return {
    // restrict to element only
    restrict: 'E',
    scope:{
      entities: '=',
      itemClick: '&',
      editButton: '&',
      loggedIn: '='
    },
    link: function (scope, element) {
      scope.$watch('entities', function(){
        $(element).mixItUp({
          load: {
            sort: 'random'
          }
        });
        // how to tell mixitup to reload the data
      });
    },
    // adds template url
    templateUrl: '../templates/mixitup.html'
  };
}

module.exports = function(ngModule) {
  ngModule.directive('mixitup', mixItUpDirective);
};
