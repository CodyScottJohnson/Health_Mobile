'use strict';
angular.module('main')
  .service('HealthKit', function($cordovaHealthKit, $http) {
    var HealthKit = {
      data: {}
    };
    HealthKit.SyncBloodPreasure = function() {
      $cordovaHealthKit.isAvailable().then(function(yes) {
        $cordovaHealthKit.requestAuthorization(
          [
            'HKQuantityTypeIdentifierBloodPressureSystolic',
            'HKQuantityTypeIdentifierBloodPressureDiastolic'
          ], [
            'HKQuantityTypeIdentifierBloodPressureSystolic',
            'HKQuantityTypeIdentifierBloodPressureDiastolic'
          ]
        ).then(function(success) {
          var BloodPressure = {};
          $cordovaHealthKit.querySampleType({
            'startDate': new Date(new Date().getTime() - 3 * 24 * 60 * 60 * 1000), // three days ago
            'endDate': new Date(), // now
            'sampleType': 'HKQuantityTypeIdentifierBloodPressureDiastolic', // any HKQuantityType
            'unit': 'mmHg' // make sure this is compatible with the sampleType
          }).then(
            function(data) {
              var keyMap = {
                quantity: 'Diastolic',
                UUID: 'HealthKit_ID',
                startDate: 'Date'
              };
              var x = data.map(function(obj) {
                return _.mapKeys(obj, function(value, key) {
                  return keyMap[key] || key;
                });
              });
              BloodPressure.Diastolic = x;
              $cordovaHealthKit.querySampleType({
                'startDate': new Date(new Date().getTime() - 3 * 24 * 60 * 60 * 1000), // three days ago
                'endDate': new Date(), // now
                'sampleType': 'HKQuantityTypeIdentifierBloodPressureSystolic', // any HKQuantityType
                'unit': 'mmHg' // make sure this is compatible with the sampleType
              }).then(
                function(data) {
                  var keyMap = {
                    quantity: 'Systolic',
                    startDate: 'Date'
                  };
                  var y = data.map(function(obj) {
                    return _.mapKeys(obj, function(value, key) {
                      return keyMap[key] || key;
                    });
                  });
                  var a = _.keyBy(BloodPressure.Diastolic, 'Date');
                  var b = _.keyBy(y, 'Date');

                  var result = _(a)
                    .pick(_.keys(b))
                    .merge(_.pick(b, _.keys(a)))
                    .values()
                    .value();
                  BloodPressure.Systolic = data;
                  $http({
                    method: 'PUT',
                    url: 'https://jfsapp.com/Open/API/Dashboard/BloodPressure/',
                    data: result
                  }).then(function(data) {
                    alert('done');
                  });
                },
                function(data) {
                  alert('fail');
                }
              );
            },
            function(data) {
              alert('fail');
            }
          );

        }, function(err) {
          alert('Not allowed');
        });
      }, function(no) {
        alert('no');
      });
    };
    HealthKit.RecordBloodPressure = function(sys, dia) {
      window.plugins.healthkit.saveCorrelation({
          'startDate': new Date(), // now
          'endDate': new Date(), // now
          'metadata': {
            'a': 'b'
          },
          'correlationType': 'HKCorrelationTypeIdentifierBloodPressure', // don't request write permission for this
          'samples': [{
            'startDate': new Date(),
            'endDate': new Date(),
            'sampleType': 'HKQuantityTypeIdentifierBloodPressureSystolic', // make sure you request write access beforehand
            'unit': 'mmHg',
            'amount': sys
          }, {
            'startDate': new Date(),
            'endDate': new Date(),
            'sampleType': 'HKQuantityTypeIdentifierBloodPressureDiastolic', // make sure you request write access beforehand
            'unit': 'mmHg',
            'amount': dia
          }]
        },
        function(value) {
          alert('Something');
          HealthKit.SyncBloodPreasure();

        },
        function(value) {
          alert('SomethingOther');
        }
      );

    };
    HealthKit.GetBloodPressure = function() {
      $http({
        method: 'GET',
        url: 'https://jfsapp.com/Open/API/Dashboard/BloodPressure/',
      }).then(function(data) {
        HealthKit.data.BloodPressure = data.data;
      }, function(error) {
      });
    };

    //initialize
    HealthKit.GetBloodPressure();
    return HealthKit;
  });
