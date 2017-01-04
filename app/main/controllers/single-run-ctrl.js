'use strict';
angular.module('main')
  .controller('SingleRunCtrl', function($scope, $timeout, Running, $location) {
    if (angular.isDefined($location.search().RunID)) {
      Running.getSpecificRuns([$location.search().RunID]).then(function(data) {
        $scope.run = data;
        $timeout(function() {
          initialize();
        }, 100);
      });
    } else {
      Running.getSpecificRuns([7717]).then(function(data) {
        $scope.run = data;
        $timeout(function() {
          initialize();
        }, 100);
      });
    }

    function initialize() {
      var mapCanvas = document.getElementById('google-maps');
      var mapOptions = {
        //center: new google.maps.LatLng(0, -180),
        //zoom: 8,
        mapTypeId: google.maps.MapTypeId.TERRAIN,
        mapTypeControl: false,
        streetViewControl: false,
        styles: [{
          "featureType": "all",
          "stylers": [{
            "saturation": 0
          }, {
            "hue": "#e7ecf0"
          }]
        }, {
          "featureType": "road",
          "stylers": [{
            "saturation": -70
          }]
        }, {
          "featureType": "transit",
          "stylers": [{
            "visibility": "off"
          }]
        }, {
          "featureType": "poi",
          "stylers": [{
            "visibility": "off"
          }]
        }, {
          "featureType": "water",
          "stylers": [{
            "visibility": "simplified"
          }, {
            "saturation": -60
          }]
        }]
      };
      var map = new google.maps.Map(mapCanvas, mapOptions);


      $scope.path = $scope.run[0].path;
      var i;
      var bounds = new google.maps.LatLngBounds();
      for (i = 0; i < $scope.path.length; i++) {
        $scope.path[i].lat = $scope.path[i].latitude;
        delete $scope.path[i].latitude;
        $scope.path[i].lng = $scope.path[i].longitude;
        delete $scope.path[i].longitude;
        bounds.extend($scope.path[i]);
      }
      var flightPath = new google.maps.Polyline({
        path: $scope.path,
        geodesic: true,
        strokeColor: '#209E91',
        strokeOpacity: 1.0,
        strokeWeight: 3
      });
      map.fitBounds(bounds);
      flightPath.setMap(map);
    }

    $timeout(function() {

      $scope.graphs = $scope.items;
    }, 200);

  });
