'use strict';
angular.module('main', [
  'ionic',
  'ngCordova',
  'ui.router',
  // TODO: load other modules selected during generation
])
.config(function ($stateProvider, $urlRouterProvider) {

  // ROUTING with ui.router
  $urlRouterProvider.otherwise('/login');
  $stateProvider
    // this state is placed in the <ion-nav-view> in the index.html
    .state('login', {
      url: '/login',
      templateUrl: 'main/templates/pages/login.html',
      controller: 'LoginCtrl as login'
    })
    .state('main', {
      url: '/main',
      abstract: true,
      templateUrl: 'main/templates/menu.html',
      controller: 'MenuCtrl as menu'
    })
      .state('main.list', {
        url: '/list',
        views: {
          'pageContent': {
            templateUrl: 'main/templates/list.html',
            // controller: '<someCtrl> as ctrl'
          }
        }
      })
      .state('main.listDetail', {
        url: '/list/detail',
        views: {
          'pageContent': {
            templateUrl: 'main/templates/list-detail.html',
            // controller: '<someCtrl> as ctrl'
          }
        }
      })
      .state('main.debug', {
        url: '/debug',
        views: {
          'pageContent': {
            templateUrl: 'main/templates/debug.html',
            controller: 'DebugCtrl as ctrl'
          }
        }
      })
      .state('main.Dashboard', {
        url: '/dashboar',
        views: {
          'pageContent': {
            templateUrl: 'main/templates/dashboard.html',
            controller: 'DebugCtrl as ctrl'
          }
        }
      })
      .state('main.Run', {
        url: '/run',
        views: {
          'pageContent': {
            templateUrl: 'main/templates/Pages/Running/monthdetail.html',
            controller: 'RunCtrl as ctrl'
          }
        }
      })
      .state('main.Clock', {
        url: '/clock',
        views: {
          'pageContent': {
            templateUrl: 'main/templates/Pages/Life/alarm.html',
            controller: 'ClockCtrl as ctrl'
          }
        }
      })
      .state('main.RunMonthList', {
        url: '/run/MonthList',
        views: {
          'pageContent': {
            templateUrl: 'main/templates/Pages/Running/monthlist.html',
            controller: 'RunCtrl as ctrl'
          }
        }
      })
      .state('main.SingleRun', {
        url: '/run/SingleRun?RunID',
        views: {
          'pageContent': {
            templateUrl: 'main/templates/Pages/Running/singlerun.html',
            controller: 'SingleRunCtrl as ctrl'
          }
        }
      });
});
