'use strict';
angular.module('main')
.controller('LoginCtrl', function ($log, $scope, User) {
  $scope.User = User;
  $log.log('Hello from your Controller: LoginCtrl in module main:. This is your controller:', this);

});
