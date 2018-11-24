(function() {
  'use strict';
  angular.module('BlurAdmin.pages.tundla.tundla-daily-reports', ['BlurAdmin.pages.tundla.tundla-daily-reports.delivery-tundla', 'ui.bootstrap'])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('main.tundla.tundla-daily-reports', {
        url: '/daily-reports',
        templateUrl: 'app/pages/tundla/tundla-daily-reports/tundla-daily-reports.html',
        title: 'daily-reports',
        sidebarMeta: {
          icon: 'ion-android-home',
          order: 0,
        },
        authenticate: true
      });
  }

})();