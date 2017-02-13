'use strict';

describe('module: main, controller: ClockCtrl', function () {

  // load the controller's module
  beforeEach(module('main'));
  // load all the templates to prevent unexpected $http requests from ui-router
  beforeEach(module('ngHtml2Js'));

  // instantiate controller
  var ClockCtrl;
  beforeEach(inject(function ($controller) {
    ClockCtrl = $controller('ClockCtrl');
  }));

  it('should do something', function () {
    expect(!!ClockCtrl).toBe(true);
  });

});
