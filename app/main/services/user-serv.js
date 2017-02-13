'use strict';
angular.module('main')
  .service('User', function(Config, $http, $q, $rootScope, $state) {
    var User = {
      data: {}
    };
    User.Login = function(Username, Password) {
      var deferred = $q.defer();
      $http({
        method: 'GET',
        url: Config.ENV.API + 'Login',
        params: {
          Username: Username,
          Password: Password
        }
      }).then(function(data) {
        $rootScope.currentUser = data.data;
        Config.ENV.UserURL = Config.ENV.API + data.data.User_ID + '/';
        $state.go('main.Dashboard');
        deferred.resolve(data.data);
      }, function(error) {
        deferred.reject(error);
      });
      return deferred.promise;
    };
    return User;
  });
