(function() {
  'use strict';

  angular.module('BlurAdmin.pages.bijwasan.daily-reports', ['BlurAdmin.pages.bijwasan.daily-reports.delivery-del'])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('main.bijwasan.daily-reports', {
        url: '/daily-reports',
        templateUrl: 'app/pages/bijwasan/daily-reports/daily-reports.html',
        title: 'daily-reports',
        sidebarMeta: {
          icon: 'ion-android-home',
          order: 0,
        },
        authenticate: true
      });
  }

})();