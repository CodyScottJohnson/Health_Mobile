'use strict';

describe('module: main, controller: RunCtrl', function () {

  // load the controller's module
  beforeEach(module('main'));
  // load all the templates to prevent unexpected $http requests from ui-router
  beforeEach(module('ngHtml2Js'));

  // instantiate controller
  var RunCtrl;
  beforeEach(inject(function ($controller) {
    RunCtrl = $controller('RunCtrl');
  }));

  it('should do something', function () {
    expect(!!RunCtrl).toBe(true);
  });

});
