(function() {
  'use strict';
//,'BlurAdmin.pages.bijwasan.daily-reports.delivery-del-rev'
  angular.module('BlurAdmin.pages.bijwasan.daily-reports', ['BlurAdmin.pages.bijwasan.daily-reports.delivery-del','BlurAdmin.pages.bijwasan.daily-reports.delivery-del-rev', 'BlurAdmin.pages.bijwasan.daily-reports.rev-pumping-pnp-delhi','ui.bootstrap'])
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