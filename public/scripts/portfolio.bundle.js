webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var angular = __webpack_require__(1);
	
	angular.module('app', [__webpack_require__(3), __webpack_require__(5)]);
	
	__webpack_require__(8);
	__webpack_require__(9);
	__webpack_require__(10);
	__webpack_require__(11);
	__webpack_require__(12);
	__webpack_require__(13);
	__webpack_require__(14);


/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var angular = __webpack_require__(1);
	
	angular.module('app')
	
	.config(config);
	
	function config ($routeProvider) {
	  $routeProvider
	  .when('/', {
	    controller: 'MainController',
	    controllerAs: 'vm',
	    templateUrl: 'templates/main.html',
	    resolve: {
	      projects: ['MainService', function (MainService) {
	        return MainService.getAll();
	      }]
	    }
	  })
	  .when('/new', {
	    controller: 'ProjectController',
	    controllerAs: 'vm',
	    templateUrl: 'templates/new-form.html'
	  })
	  .when('/edit/:id', {
	    controller: 'ProjectController',
	    controllerAs: 'vm',
	    templateUrl: 'templates/new-form.html'
	  })
	  .otherwise({
	    redirectTo: '/'
	  });
	}


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var angular = __webpack_require__(1);
	
	function mainController ($location, $log, MainService) {
	  var vm = this;
	
	  vm.hello = 'My Portfolio';
	
	  // vm.editing = false;
	
	  vm.projects = MainService.projects;
	  console.log(vm.projects);
	
	  MainService.getTreehouse().then(function (response) {
	    vm.treehouse = response.data;
	    console.log(vm.treehouse);
	  }, function (error) {
	    // log the error to the console
	    $log.error('Error ' + error);
	  });
	
	  MainService.getCodeschool().then(function (response) {
	    vm.codeschool = response.data;
	    console.log(vm.codeschool);
	  }, function (error) {
	    // log the error to the console
	    $log.error('Error ' + error);
	  });
	
	  MainService.getGithub().then(function (response) {
	    vm.github = response.data;
	    console.log(vm.github);
	  }, function (error) {
	    // log the error to the console
	    $log.error('Error ' + error);
	  });
	
	  //mixitup
	  vm.categories = ['Soft', 'Elements'];
	
	  vm.drawings = [{
	      name: 'Random Quote Generator',
	      value: 1,
	      category: 'Elements',
	      image: 'images/random-quote-generator.png',
	      created_on: 'July 23, 2016',
	      link: 'http://amazon.com',
	      github_link: 'https://github.com/chris-gaona/random-quote',
	      comments: 'Chris, great work on your Random Quotes Generator! You really went above and beyond to meet the Exceeds requirements. I hope you enjoyed this project and learn so much throughout the rest of the TechDegree. Keep pushing yourself for Exceeds! :)',
	      grade: 'Exceeds Expectations'
	  }, {
	      name: 'Pagination Filter',
	      value: 2,
	      category: 'Elements',
	      image: 'images/pagination-filter.png',
	      created_on: 'September 5, 2015',
	      link: ''
	  }, {
	      name: 'Interactive Form',
	      value: 3,
	      category: 'Elements',
	      image: 'images/interactive-form.png',
	      created_on: 'March 5, 2016',
	      link: ''
	  }, {
	      name: 'Tic Tac Toe Game',
	      value: 4,
	      category: 'Soft',
	      image: 'images/tic-tac-toe.png',
	      created_on: 'April 10, 2016',
	      link: ''
	  }, {
	      name: 'Movie Search',
	      value: 5,
	      category: 'Soft',
	      image: 'images/movie-search.png',
	      created_on: 'April 28, 2016',
	      link: ''
	  }];
	
	  // vm.gradeOptions = ['Meets Expectations', 'Exceeds Expectations'];
	
	  vm.expandProject = false;
	
	  vm.getProject = function (project) {
	    console.log(project);
	    vm.chosenProject = project;
	
	    // modalShown variable is toggled between true & false
	    vm.expandProject = !vm.expandProject;
	  };
	
	  vm.newProject = function () {
	    $location.path('/new');
	  };
	
	  vm.editProject = function (id) {
	    $location.path('/edit/' + id);
	  };
	}
	
	angular.module('app')
	.controller('MainController', ['$location', '$log', 'MainService', mainController]);


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var angular = __webpack_require__(1);
	
	function projectController ($routeParams, $location, $log, MainService) {
	  var vm = this;
	
	  if ($routeParams.id) {
	    MainService.getOne($routeParams.id)
	    .then(function (response) {
	      vm.project = response.data;
	
	      var project = response.data;
	      vm.name = project.name;
	      vm.category = project.category;
	      vm.image = project.image;
	      vm.created_on = project.created_on;
	      vm.link = project.link;
	      vm.github_link = project.github_link;
	      vm.comments = project.comments;
	      vm.grade = project.grade;
	    }, function (err) {
	      // log the error to the console
	      $log.error('Error ' + err);
	    });
	  }
	
	  vm.saveProject = function () {
	    var projectObject = {};
	    projectObject.name = vm.name;
	    projectObject.category = vm.category;
	    projectObject.image = vm.image;
	    projectObject.created_on = vm.created_on;
	    projectObject.link = vm.link;
	    projectObject.github_link = vm.github_link;
	    projectObject.comments = vm.comments;
	    projectObject.grade = vm.grade;
	
	    if ($routeParams.id) {
	      MainService.edit($routeParams.id, projectObject)
	      .then(function (project) {
	        $location.path('/');
	        $log.log('Updated!');
	      }, function (err) {
	        // log the error to the console
	        $log.error('Error ' + err);
	      });
	    } else {
	      MainService.create(projectObject)
	      .then(function (project) {
	        // vm.message = project.data;
	        $location.path('/');
	        $log.log('Created!');
	      }, function (err) {
	        // log the error to the console
	        $log.error('Error ' + err);
	      });
	    }
	  };
	
	  vm.goBack = function () {
	    $location.path('/');
	  };
	}
	
	angular.module('app')
	.controller('ProjectController', ['$routeParams', '$location', '$log', 'MainService', projectController]);


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var angular = __webpack_require__(1);
	
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


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var angular = __webpack_require__(1);
	
	function mixItUpDirective () {
	  return {
	    // restrict to element only
	    restrict: 'E',
	    scope:{
	      entities: '='
	    },
	    // replace: true, // Replace with the template below
	    // transclude: true, // I want to insert custom content inside the directive
	    link: function (scope, element, attrs) {
	      scope.$watch('entities', function(){
	        console.log('reload');
	        $(element).mixItUp();
	        // how to tell mixitup to reload the data
	      });
	    }
	  };
	}
	
	angular.module('app')
	.directive('mixitup', mixItUpDirective);


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var angular = __webpack_require__(1);
	
	function owlDirective () {
	  return {
	    // restrict to element only
	    restrict: 'E',
	    // replace: true, // Replace with the template below
	    // transclude: true, // I want to insert custom content inside the directive
	    link: function (scope, element, attrs) {
	      var options = scope.$eval($(element).attr('data-options'));
	
	      $(element).owlCarousel(options);
	    },
	    // adds template url for modal
	    templateUrl: '../templates/owlCarousel.html' // See below
	  };
	}
	
	angular.module('app')
	.directive('owlCarousel', owlDirective);


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var angular = __webpack_require__(1);
	
	function mainService ($http) {
	  var mainService = {
	    projects: []
	  };
	
	  // get project info from mongodb
	  mainService.getAll = function () {
	    return $http.get('/api/projects').then(function successCallback (response) {
	      angular.copy(response.data, mainService.projects);
	    }, function errorCallback (response, status) {
	      $log.error('Error ' + response + status);
	    });
	  };
	
	  // get an existing project
	  mainService.getOne = function (id) {
	    return $http.get('/api/project/' + id);
	  };
	
	  // create a new project
	  mainService.create = function (project) {
	    return $http.post('/api/new', project);
	  };
	
	  // edit existing project
	  mainService.edit = function (id, project) {
	    return $http.put('/api/edit/' + id, project);
	  };
	
	  // get treehouse info
	  mainService.getTreehouse = function () {
	    return $http.get('/api/treehouse');
	  };
	
	  // get codeschool info
	  mainService.getCodeschool = function () {
	    return $http.get('/api/codeschool');
	  };
	
	  // get github info
	  mainService.getGithub = function () {
	    return $http.get('/api/github');
	  };
	
	  return mainService;
	}
	
	angular.module('app')
	.factory('MainService', ['$http', mainService]);


/***/ }
]);
//# sourceMappingURL=portfolio.bundle.js.map