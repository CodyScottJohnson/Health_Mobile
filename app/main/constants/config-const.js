'use strict';
angular.module('main')
.constant('Config', {
  // gulp environment: injects environment vars
  ENV: {
    /*inject-env*/
    'API': 'https://jfsapp.com/Open/API/Dashboard/',
    'SOME_OTHER_URL': '/postman-proxy'
    /*endinject*/
  },

  // gulp build-vars: injects build vars
  BUILD: {
    /*inject-build*/
    /*endinject*/
  }

});
