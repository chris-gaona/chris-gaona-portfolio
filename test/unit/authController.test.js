'use strict';

describe('AuthController', function () {
  var $location,
    authCtrl,
    q,
    scope,
    AuthService;

  beforeEach(angular.mock.module('app'));

  beforeEach(inject(function ($rootScope, $controller, $q, _AuthService_, _$location_) {
    AuthService = _AuthService_;
    $location = _$location_;
    q = $q;

    scope = $rootScope.$new();

    authCtrl = $controller('AuthController', {
      AuthService: AuthService
    });
  }));

  it('should have a hasValidationErrors variable that equals false initially', function () {
    expect(authCtrl.hasValidationErrors).toEqual(false);
  });

  it('should direct the user back to the / route', function () {
    $location.path('new');
    expect($location.path()).toBe('/new');
    authCtrl.goBack();
    expect($location.path()).toBe('/');
  });

  it('should direct the user to the register page', function () {
    $location.path('/login');
    expect($location.path()).toBe('/login');
    authCtrl.registerPage();
    expect($location.path()).toBe('/register');
  });

  it('should direct the user to the login page', function () {
    $location.path('/register');
    expect($location.path()).toBe('/register');
    authCtrl.loginPage();
    expect($location.path()).toBe('/login');
  });

  it('should register a new user', function () {
    // $location.path('/register');
    // spyOn(AuthService, 'register').and.callFake(function () {
    //   var deferred = q.defer();
    //   deferred.resolve();
    //   return deferred.promise;
    // });
    //
    // scope.$apply(function () {
    //   authCtrl.registerUser();
    // });
    //
    // expect(AuthService.register).toHaveBeenCalled();
    // expect($location.path()).toBe('/');
  });

  it('should login an existing user', function () {
    // $location.path('/login');
    // spyOn(AuthService, 'logIn').and.callFake(function () {
    //   var deferred = q.defer();
    //   deferred.resolve();
    //   return deferred.promise;
    // });
    //
    // scope.$apply(function () {
    //   authCtrl.loginUser();
    // });
    //
    // expect(AuthService.logIn).toHaveBeenCalled();
    // expect($location.path()).toBe('/');
  });
});
