(function() {
  'use strict';
//,'BlurAdmin.pages.bijwasan.daily-reports.delivery-del-rev'
  angular.module('BlurAdmin.pages.mathura.mathura-daily-reports', ['ui.bootstrap'])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('main.bijwasan.mathura.mathura-daily-reports', {
        url: '/mathura-daily-reports',
        templateUrl: 'app/pages/mathura/mathura-daily-reports/daily-reports.html',
        title: 'mathura-daily-reports',
        sidebarMeta: {
          icon: 'ion-android-home',
          order: 0,
        },
        authenticate: true
      });
  }

})();