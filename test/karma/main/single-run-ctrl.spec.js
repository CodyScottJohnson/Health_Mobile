'use strict';

describe('module: main, controller: SingleRunCtrl', function () {

  // load the controller's module
  beforeEach(module('main'));
  // load all the templates to prevent unexpected $http requests from ui-router
  beforeEach(module('ngHtml2Js'));

  // instantiate controller
  var SingleRunCtrl;
  beforeEach(inject(function ($controller) {
    SingleRunCtrl = $controller('SingleRunCtrl');
  }));

  it('should do something', function () {
    expect(!!SingleRunCtrl).toBe(true);
  });

});
