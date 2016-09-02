'use strict';

describe('Main Controller', function () {
  var $location,
    mainCtrl,
    q,
    scope,
    AuthService,
    WeatherService,
    projects;

  beforeEach(angular.mock.module('app'));

  describe('blah blah blah', function () {
    beforeEach(inject(function ($rootScope, $controller, $q, _AuthService_, _WeatherService_, _$location_) {
      AuthService = _AuthService_;
      WeatherService = _WeatherService_;
      $location = _$location_;
      q = $q;

      scope = $rootScope.$new();

      projects = [
        {
          name: 'Project 1',
          category: 'Football'
        },
        {
          name: 'Project 2',
          category: 'Soccer'
        },
        {
          name: 'Project 3',
          category: 'Soccer'
        }
      ];

      mainCtrl = $controller('MainController', {
        AuthService: AuthService
      });
    }));

    it('should test properly', function () {
      expect(false).toBe(false);
    });

    it('should have isLoggedIn variable initially be false since no use is logged in', function () {
      expect(mainCtrl.isLoggedIn).toBe(false);
    });

    it('should return current user as undefined since no user is currently logged in', function () {
      expect(mainCtrl.currentUser).toBeUndefined();
    });

    it('should logout a logged in user', function () {
      spyOn(AuthService, 'logOut').and.callFake(function () {
        var deferred = q.defer();
        deferred.resolve();
        return deferred.promise;
      });

      scope.$apply(function () {
        mainCtrl.logOut();
      });

      expect(AuthService.logOut).toHaveBeenCalled();
      expect(mainCtrl.isLoggedIn).toBe(false);
    });

    it('should have projects', function () {
      expect(mainCtrl.projects).toBeDefined();
      expect(mainCtrl.projects.length).toEqual(0);
      expect(mainCtrl.projects).toEqual([]);
    });

    it('should have treehouse data', function () {
      expect(mainCtrl.treehouse).toBeDefined();
      expect(mainCtrl.treehouse.length).toEqual(0);
      expect(mainCtrl.treehouse).toEqual([]);
    });

    it('should have projects', function () {
      expect(mainCtrl.codeschool).toBeDefined();
      expect(mainCtrl.codeschool.length).toEqual(0);
      expect(mainCtrl.codeschool).toEqual([]);
    });

    it('should have projects', function () {
      expect(mainCtrl.github).toBeDefined();
      expect(mainCtrl.github.length).toEqual(0);
      expect(mainCtrl.github).toEqual([]);
    });

    it('should get all unique categories from projects', function () {
      var callFun = mainCtrl.getCategories(projects);

      expect(callFun).toBeDefined();
      expect(callFun.length).toEqual(2);
      expect(callFun).toEqual(['Football', 'Soccer']);
    });

    it('should call getProject with a specific project for expand section', function () {
      mainCtrl.expandProject = true;
      mainCtrl.getProject(projects[0]);
      expect(mainCtrl.chosenProject).toEqual({
        name: 'Project 1',
        category: 'Football'
      });
      expect(mainCtrl.expandProject).toBe(false);
    })

    it('should direct the user to the new route', function () {
      $location.path('/');
      expect($location.path()).toBe('/');
      mainCtrl.newProject();
      expect($location.path()).toBe('/new');
    });

    it('should direct the user to the edit project route', function () {
      var id = '1234567890';
      $location.path('/');
      expect($location.path()).toBe('/');
      mainCtrl.editProject(id);
      expect($location.path()).toBe('/edit/1234567890');
    });

    it('should direct the user to the login route', function () {
      $location.path('/');
      expect($location.path()).toBe('/');
      mainCtrl.loginButton();
      expect($location.path()).toBe('/login');
    });
  });
});
