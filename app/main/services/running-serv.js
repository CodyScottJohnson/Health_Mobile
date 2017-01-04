'use strict';
angular.module('main')
.service('Running', function ($http, $q, $rootScope, $filter) {
  var currentMonth = $filter('date')(new Date(), 'MM') ;
  var currentYear = $filter('date')(new Date(), 'yyyy');
  var Running = {
    data: {}
  };
  Running.getRunDataMonth = function() {
    var deferred = $q.defer();
    $http({
      method: 'GET',
      url: 'https://jfsapp.com/Open/API/Dashboard/Run/Month/All',
    }).then(function(data) {
      Running.data.Month = data.data;
      Running.getRunDataMonthDetail(currentYear, currentMonth).then(function (data) {
        Running.data.CurrentMonth = {};
        Running.data.CurrentMonth.Overview = _.find(Running.data.Month, { 'Year': currentYear, 'Month': currentMonth });
        Running.data.CurrentMonth.Detail = data;
      });
      deferred.resolve(data.data);
    }, function(error) {
      deferred.reject(error);
    });
    return deferred.promise;
  };
  Running.getRunDataMonthDetail = function(year, month) {
    var deferred = $q.defer();
    $http({
      method: 'GET',
      url: 'https://jfsapp.com/Open/API/Dashboard/Run/Month/Detail/' + year + '/' + month,
    }).then(function(data) {
      deferred.resolve(data.data);
    }, function(error) {
      deferred.reject(error);
    });
    return deferred.promise;
  };
  Running.getSpecificRuns = function(RunIds) {
    var deferred = $q.defer();
    $http({
      method: 'POST',
      url: 'https://jfsapp.com/Open/API/Dashboard/Runs/Detail/Specific',
      data: {
        RunIDs: RunIds
      }
    }).then(function(data) {
      deferred.resolve(data.data);
    }, function(error) {
      deferred.reject(error);
    });
    return deferred.promise;
  };
  Running.getRunDataAll = function() {
    var deferred = $q.defer();
    $http({
      method: 'GET',
      url: 'https://jfsapp.com/Open/API/Dashboard/Runs',
    }).then(function(data) {
      deferred.resolve(data.data);
    }, function(error) {
      deferred.reject(error);
    });
    return deferred.promise;
  };
  Running.updateAllFromSource = function() {
    var deferred = $q.defer();
    $http({
      method: 'GET',
      url: 'https://jfsapp.com/Open/API/Dashboard/Run/Update/All',
    }).then(function(data) {
      deferred.resolve(data.data);
    }, function(error) {
      deferred.reject(error);
    });
    return deferred.promise;
  };
  Running.updateDetailFromSource = function() {
    var deferred = $q.defer();
    $http({
      method: 'GET',
      url: 'https://jfsapp.com/Open/API/Dashboard/Run/Update/All/Detail',
    }).then(function(data) {
      deferred.resolve(data.data);
    }, function(error) {
      deferred.reject(error);
    });
    return deferred.promise;
  };

  return Running;

});
