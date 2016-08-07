webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var angular = __webpack_require__(1);
	
	angular.module('app', ['ngRoute', 'duScroll', 'ngAnimate', 'toastr', '720kb.datepicker'])
	.run(function($rootScope, $location, AuthService) {
	  // wire up the route change start handler
	  // in order to determine if the requested route requires a user login
	  $rootScope.$on('$routeChangeStart', function(event, next, current) {
	    // if the "require login" property is set to "true"
	    // and we don't have an authenticated user...
	    // then send the user to the "Sign In" view.
	    if (next.requireLogin && !AuthService.isLoggedIn()) {
	      $location.path('/login');
	      event.preventDefault();
	    }
	  });
	}).config(function(toastrConfig) {
	  angular.extend(toastrConfig, {
	    containerId: 'toast-container',
	    positionClass: 'toast-bottom-right',
	    closeButton: true
	  });
	});
	
	__webpack_require__(3);
	__webpack_require__(4);
	__webpack_require__(5);
	__webpack_require__(6);
	__webpack_require__(7);
	__webpack_require__(8);
	__webpack_require__(9);
	__webpack_require__(10);
	__webpack_require__(11);
	__webpack_require__(12);
	__webpack_require__(13);
	__webpack_require__(14);
	__webpack_require__(15);


/***/ },
/* 1 */,
/* 2 */,
/* 3 */
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
	    templateUrl: 'templates/new-form.html',
	    requireLogin: true
	  })
	  .when('/edit/:id', {
	    controller: 'ProjectController',
	    controllerAs: 'vm',
	    templateUrl: 'templates/new-form.html',
	    requireLogin: true
	  })
	  .when('/register', {
	    controller: 'AuthController',
	    controllerAs: 'vm',
	    templateUrl: 'templates/authenticate.html',
	    resolve: {
	    check: ['$location', 'AuthService', function($location, AuthService) {
	        if (AuthService.isLoggedIn()) {
	          $location.path('/');
	        }
	      }]
	    }
	  })
	  .when('/login', {
	    controller: 'AuthController',
	    controllerAs: 'vm',
	    templateUrl: 'templates/authenticate.html',
	    resolve: {
	    check: ['$location', 'AuthService', function($location, AuthService) {
	        if (AuthService.isLoggedIn()) {
	          $location.path('/');
	        }
	      }]
	    }
	  })
	  .otherwise({
	    redirectTo: '/'
	  });
	}


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var angular = __webpack_require__(1);
	
	function mainController ($location, $log, $timeout, MainService, AuthService, UserService, toastr, errorHandlerService) {
	  var vm = this;
	
	  $timeout(function () { twttr.widgets.load(); }, 500);
	
	  vm.isLoggedIn = AuthService.isLoggedIn();
	
	  if (vm.isLoggedIn) {
	    vm.currentUser = AuthService.currentUser();
	    UserService.getUser(vm.currentUser).then(function(res) {
	      vm.user = res.data;
	    });
	  }
	
	  vm.logOut = function () {
	    AuthService.logOut();
	    vm.isLoggedIn = false;
	    toastr.success('You are logged out', 'Success!');
	  };
	
	  vm.validationErrors = {};
	  vm.hasValidationErrors = false;
	
	  vm.projects = MainService.projects;
	
	  MainService.getTreehouse().then(function (response) {
	    vm.treehouse = response.data;
	    $log.log(vm.treehouse);
	  }, function (error) {
	    errorHandlerService.handleError(error);
	    // log the error to the console
	    $log.error('Error ' + error);
	  });
	
	  MainService.getCodeschool().then(function (response) {
	    vm.codeschool = response.data;
	  }, function (error) {
	    errorHandlerService.handleError(error);
	    // log the error to the console
	    $log.error('Error ' + error);
	  });
	
	  MainService.getGithub().then(function (response) {
	    vm.github = response.data;
	  }, function (error) {
	    errorHandlerService.handleError(error);
	    // log the error to the console
	    $log.error('Error ' + error);
	  });
	
	  //mixitup
	  var categories = [];
	  for (var i = 0; i < vm.projects.length; i++) {
	    categories.push(vm.projects[i].category);
	  }
	  var uniqueCat = categories.filter(function(elem, index, self) {
	    return index == self.indexOf(elem);
	  });
	  
	  vm.categories = uniqueCat;
	
	  // vm.drawings = [{
	  //     name: 'Random Quote Generator',
	  //     value: 1,
	  //     category: 'Elements',
	  //     image: 'images/random-quote-generator.png',
	  //     created_on: 'July 23, 2016',
	  //     link: 'http://amazon.com',
	  //     github_link: 'https://github.com/chris-gaona/random-quote',
	  //     comments: 'Chris, great work on your Random Quotes Generator! You really went above and beyond to meet the Exceeds requirements. I hope you enjoyed this project and learn so much throughout the rest of the TechDegree. Keep pushing yourself for Exceeds! :)',
	  //     grade: 'Exceeds Expectations'
	  // }, {
	  //     name: 'Pagination Filter',
	  //     value: 2,
	  //     category: 'Elements',
	  //     image: 'images/pagination-filter.png',
	  //     created_on: 'September 5, 2015',
	  //     link: ''
	  // }, {
	  //     name: 'Interactive Form',
	  //     value: 3,
	  //     category: 'Elements',
	  //     image: 'images/interactive-form.png',
	  //     created_on: 'March 5, 2016',
	  //     link: ''
	  // }, {
	  //     name: 'Tic Tac Toe Game',
	  //     value: 4,
	  //     category: 'Soft',
	  //     image: 'images/tic-tac-toe.png',
	  //     created_on: 'April 10, 2016',
	  //     link: ''
	  // }, {
	  //     name: 'Movie Search',
	  //     value: 5,
	  //     category: 'Soft',
	  //     image: 'images/movie-search.png',
	  //     created_on: 'April 28, 2016',
	  //     link: ''
	  // }];
	
	  // vm.gradeOptions = ['Meets Expectations', 'Exceeds Expectations'];
	
	  vm.expandProject = false;
	
	  vm.getProject = function (project) {
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
	.controller('MainController', ['$location', '$log', '$timeout', 'MainService', 'AuthService', 'UserService', 'toastr', 'errorHandlerService', mainController]);


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var angular = __webpack_require__(1);
	
	function projectController ($routeParams, $location, $log, MainService, toastr, errorHandlerService) {
	  var vm = this;
	
	  vm.grades = [{ name: 'Exceeds Expectations' }, { name: 'Meets Expectations' }];
	
	  if ($routeParams.id) {
	    MainService.getOne($routeParams.id)
	    .then(function (response) {
	      vm.project = response.data;
	
	      var project = response.data;
	      vm.name = project.name;
	      vm.category = project.category;
	      vm.image = project.image;
	      var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	      var date = new Date(project.created_on);
	      var newDate = monthNames[date.getMonth()] + ' ' +  date.getDate() + ', ' + date.getFullYear();
	      vm.created_on = newDate;
	      vm.link = project.link;
	      vm.github_link = project.github_link;
	      vm.comments = project.comments;
	      vm.treehouse_comments = project.treehouse_comments;
	      vm.grade = project.grade;
	    }, function (err) {
	      errorHandlerService.handleError(err);
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
	    projectObject.treehouse_comments = vm.treehouse_comments;
	    projectObject.grade = vm.grade;
	
	    if ($routeParams.id) {
	      MainService.edit($routeParams.id, projectObject)
	      .then(function (project) {
	        $location.path('/');
	        toastr.success('Updated your project', 'Success!');
	        $log.log('Updated!');
	      }, function (err) {
	        errorHandlerService.handleError(err, displayValidationErrors);
	        // log the error to the console
	        $log.error('Error ' + err);
	      });
	    } else {
	      MainService.create(projectObject)
	      .then(function (project) {
	        toastr.success('Created your new project', 'Success!');
	        $location.path('/');
	        $log.log('Created!');
	      }, function (err) {
	        $log.log(err);
	        errorHandlerService.handleError(err, displayValidationErrors);
	        // log the error to the console
	        $log.error('Error ' + err);
	      });
	    }
	  };
	
	  vm.goBack = function () {
	    $location.path('/');
	  };
	
	  function displayValidationErrors(validationErrors) {
	    vm.validationErrors = validationErrors.errors;
	    $log.log(vm.validationErrors);
	    vm.hasValidationErrors = true;
	  }
	}
	
	angular.module('app')
	.controller('ProjectController', ['$routeParams', '$location', '$log', 'MainService', 'toastr', 'errorHandlerService', projectController]);


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var angular = __webpack_require__(1);
	
	function authController ($location, $log, MainService, AuthService, toastr, errorHandlerService) {
	  var vm = this;
	
	  vm.goBack = function () {
	    $location.path('/');
	  };
	
	  vm.registerPage = function () {
	    $location.path('/register');
	  };
	
	  vm.loginPage = function () {
	    $location.path('/login');
	  };
	
	  if ($location.path() === '/register') {
	    vm.register = 'Register';
	  } else {
	    vm.login = 'Login';
	  }
	
	  vm.registerUser = function() {
	    AuthService.register(vm.user).error(function(error) {
	      vm.error = error;
	      toastr.error('Please see above', 'Form Errors!');
	      $log.log(error);
	    }).then(function() {
	      toastr.success('Please see above', 'Form Errors!');
	      $location.path('/');
	    });
	  };
	
	  vm.loginUser = function() {
	    AuthService.logIn(vm.user).error(function(error) {
	      vm.error = error;
	      toastr.error('Please see above', 'Form Errors!');
	      $log.log(vm.error);
	    }).then(function() {
	      toastr.success('You are logged in', 'Success!');
	      $location.path('/');
	    });
	  };
	}
	
	angular.module('app')
	.controller('AuthController', ['$location', '$log', 'MainService', 'AuthService', 'toastr', 'errorHandlerService', authController]);


/***/ },
/* 7 */
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
	      show: '=',
	      project: '='
	    },
	    // replace: true, // Replace with the template below
	    // transclude: true, // I want to insert custom content inside the directive
	    link: function (scope, element, attrs) {
	      // if hideModal button is clicked set show to false
	      // to remove the modal window
	      scope.collapseProject = function () {
	        scope.show = false;
	      };
	    },
	    // adds template url for modal
	    templateUrl: '../templates/expand-project.html' // See below
	  };
	}
	
	angular.module('app')
	.directive('expandProject', expandProjectDirective);


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var angular = __webpack_require__(1);
	
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
	    // replace: true, // Replace with the template below
	    // transclude: true, // I want to insert custom content inside the directive
	    link: function (scope, element, attrs) {
	      scope.$watch('entities', function(){
	        $(element).mixItUp();
	        // how to tell mixitup to reload the data
	      });
	    },
	    // adds template url for modal
	    templateUrl: '../templates/mixitup.html'
	  };
	}
	
	angular.module('app')
	.directive('mixitup', mixItUpDirective);


/***/ },
/* 9 */
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
	    templateUrl: '../templates/owl-carousel.html' // See below
	  };
	}
	
	angular.module('app')
	.directive('owlCarousel', owlDirective);


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var angular = __webpack_require__(1);
	
	function hamburgerDirective () {
	  return {
	    // restrict to element only
	    restrict: 'E',
	    // adds scope with show set to = to make it able to be
	    // changed from the controller, & directive
	    scope: {
	      variable: '='
	    },
	    // replace: true, // Replace with the template below
	    // transclude: true, // I want to insert custom content inside the directive
	    link: function (scope, element, attrs) {
	
	    },
	    // adds template url for modal
	    templateUrl: '../templates/hamburger.html' // See below
	  };
	}
	
	angular.module('app')
	.directive('hamburger', hamburgerDirective);


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var angular = __webpack_require__(1);
	
	function ValidationErrors() {
	  var controller = ['$scope', function($scope) {
	    $scope.$watch('errors', function(newValue, oldValue) {
	      var errorsToDisplay = [];
	
	      if (newValue) {
	        for (var key in newValue) {
	          if (newValue.hasOwnProperty(key)) {
	            errorsToDisplay = errorsToDisplay.concat(newValue[key]);
	          }
	        }
	      }
	
	      $scope.errorsToDisplay = errorsToDisplay;
	    });
	  }];
	
	  return {
	    restrict: 'E',
	    scope: {
	      errors: '='
	    },
	    controller: controller,
	    templateUrl: '../templates/validation-errors.html'
	  };
	}
	
	angular.module('app')
	.directive('validationErrors', ValidationErrors);


/***/ },
/* 12 */
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


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var angular = __webpack_require__(1);
	
	function authService($http, $window, $log) {
	  var authService = {};
	
	  //save token in local storage
	  authService.saveToken = function(token) {
	    $window.localStorage['chris-portfolio-token'] = token;
	  };
	
	  //get token from local storage
	  authService.getToken = function(token) {
	    return $window.localStorage['chris-portfolio-token'];
	  };
	
	  //return a boolean value for if the user is logged in
	  authService.isLoggedIn = function() {
	    var token = authService.getToken();
	
	    if(token){
	      var payload = JSON.parse($window.atob(token.split('.')[1]));
	
	      return payload.exp > Date.now() / 1000;
	    } else {
	      return false;
	    }
	  };
	
	  //function currentUser() that returns the username of the user that's logged in
	  authService.currentUser = function() {
	    if(authService.isLoggedIn()){
	      var token = authService.getToken();
	      var payload = JSON.parse($window.atob(token.split('.')[1]));
	
	      return payload.username;
	    }
	  };
	
	  authService.currentUserId = function() {
	    if (authService.isLoggedIn()) {
	      var token = authService.getToken();
	      var payload = JSON.parse($window.atob(token.split('.')[1]));
	
	      return payload._id;
	    }
	  };
	
	  //register function that posts a user to our /register route and saves the token returned
	  authService.register = function(user) {
	    return $http.post('/register', user).success(function(data){
	      authService.saveToken(data.token);
	    });
	  };
	
	  // login function that posts a user to our /login route and saves the token returned
	  authService.logIn = function(user) {
	    return $http.post('/login', user).success(function(data){
	      authService.saveToken(data.token);
	    });
	  };
	
	  //logout function that removes the user's token from localStorage, logging the user out.
	  authService.logOut = function() {
	    $window.localStorage.removeItem('chris-portfolio-token');
	  };
	
	  return authService;
	}
	
	//--------------------------------------
	//ANGULAR
	//--------------------------------------
	angular.module('app')
	//create initial auth factory. We'll need to inject $http for interfacing with our server, and $window for interfacing with localStorage
	.factory('AuthService', ['$http', '$window', '$log', authService]);


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var angular = __webpack_require__(1);
	
	function userService($http, AuthService) {
	  var userService = {};
	
	  userService.getUser = function(username) {
	    return $http.get('/user/' + username, {
	      headers: {Authorization: 'Bearer '+AuthService.getToken()}
	    });
	  };
	
	  //can't forget this return!!!
	  return userService;
	}
	
	angular.module('app')
	.factory('UserService', ['$http', 'AuthService', userService]);


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var angular = __webpack_require__(1);
	
	function ErrorHandler(toastr, $log) {
	  var vm = this;
	
	  vm.handleError = function(response, displayValidationErrorsCallback) {
	    if (response.status === 400 && displayValidationErrorsCallback) {
	      toastr.error('Please see above', 'Form Errors!');
	      displayValidationErrorsCallback(response.data);
	    } else {
	      var message = response && response.data && response.data.message;
	      if (!message) {
	        message = 'Message not available. Please see the console for more details.';
	      }
	      toastr.error(message, 'Unexpected Error');
	
	      // log the entire response to the console
	      $log.error(response);
	    }
	  };
	}
	
	angular.module('app')
	.service('errorHandlerService', ErrorHandler);


/***/ }
]);
//# sourceMappingURL=portfolio.bundle.js.map