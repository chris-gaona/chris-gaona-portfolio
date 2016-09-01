'use strict';

describe('Main Controller', function () {
  var $location,
    mainCtrl;

  beforeEach(angular.mock.module('app'));

  beforeEach(inject(function ($controller) {
    mainCtrl = $controller('MainController');
  }));

  it('should test properly', function () {
    expect(false).toBe(false);
  });
});
