'use strict';
angular.module('main')
.filter('running', function () {
  return function (input) {
    return 'running filter: ' + input;
  };
})
.filter('pace', [
  '$filter',
  function($filter) {
      return function(input) {
        var min = Math.round((input - Math.floor(input)) * 60);
        return Math.floor(input) + "' " + min + '"';
      };
  }
])
.filter('cmdate', [
  '$filter',
  function($filter) {
      return function(input, format) {
          if (input === null) {return '';}
          else {return $filter('date')(new Date(input), format, 'UTC');}
      };
  }
])
.filter('sqldate', [
  '$filter',
  function($filter) {
      return function(input, format) {
          if (input === null) { return '';}
          else { return moment(input).format(format);}
      };
  }
]);
