(function() {
  'use strict';
  angular.module('BlurAdmin.pages.bharatpur.bharatpur-daily-reports', ['BlurAdmin.pages.bharatpur.bharatpur-daily-reports.delivery-bharatpur', 'ui.bootstrap'])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('main.bharatpur.bharatpur-daily-reports', {
        url: '/daily-reports',
        templateUrl: 'app/pages/bharatpur/bharatpur-daily-reports/bharatpur-daily-reports.html',
        title: 'Daily Reports',
        sidebarMeta: {
          icon: 'ion-android-home',
          order: 0,
        },
        authenticate: true
      });
  }

})();