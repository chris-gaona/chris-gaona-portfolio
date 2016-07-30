(function () {
  'use strict';

  function mainService ($http) {
    var mainService = {
      projects: []
    };

    // get project info from mongodb
    mainService.getAll = function () {
      return $http.get('/api/projects').success(function(response) {
        if (response.length > 0) {
          angular.copy(response, mainService.projects);
          // postService.message = '';
        } else {
          // console.log('Sorry no posts yet!');
          // postService.message = 'Sorry no posts yet!';
          angular.copy(response, mainService.projects);
        }
      }).error(function(response, status){
        console.log('Error' + response + status);
        // postService.message = 'Oops, something went wrong!';
      });
    };

    // get treehouse info

    // get codeschool info

    // get github info

    return mainService;
  }

  angular.module('app')
  .factory('MainService', ['$http', mainService]);
})();
