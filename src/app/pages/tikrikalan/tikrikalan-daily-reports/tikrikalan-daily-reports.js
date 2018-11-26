(function() {
  'use strict';
  angular.module('BlurAdmin.pages.tikrikalan.tikrikalan-daily-reports', ['BlurAdmin.pages.tikrikalan.tikrikalan-daily-reports.delivery-tikrikalan', 'ui.bootstrap'])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('main.tikrikalan.tikrikalan-daily-reports', {
        url: '/daily-reports',
        templateUrl: 'app/pages/tikrikalan/tikrikalan-daily-reports/tikrikalan-daily-reports.html',
        title: 'Daily Reports',
        sidebarMeta: {
          icon: 'ion-android-home',
          order: 0,
        },
        authenticate: true
      });
  }

})();