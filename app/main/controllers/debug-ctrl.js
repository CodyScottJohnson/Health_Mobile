'use strict';
angular.module('main')
  .controller('DebugCtrl', function ($log, $http, $timeout, Main, $cordovaDevice, $cordovaHealthKit, $scope, HealthKit) {
  $scope.HealthKit = HealthKit.data;
  $scope.SyncBloodPressure = function () {
    HealthKit.SyncBloodPreasure();
  };
  ionic.Platform.ready(function () {
    //HealthKit.RecordBloodPressure(100,100);

    });

  });
