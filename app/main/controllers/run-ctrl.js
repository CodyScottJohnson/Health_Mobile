'use strict';
angular.module('main')
.controller('RunCtrl', function ($scope, Running, $filter) {
  $scope.Running = Running.data;
  var currentMonth = $filter('date')(new Date(), 'MM');
  var currentYear = $filter('date')(new Date(), 'yyyy');
  Running.getRunDataMonthDetail(currentYear, currentMonth);
  Running.getRunDataMonth();

  $scope.inverse = function (data) {
    return 1 / (data - 5);
  };
});
