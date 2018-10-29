(function() {
  'use strict';

  angular.module('BlurAdmin.pages.bijwasan.daily-reports.delivery-del', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('main.bijwasan.daily-reports.delivery-del', {
        url: '/delivery-del',
        templateUrl: 'app/pages/bijwasan/daily-reports/delivery-del/delivery-del.html',
        title: 'delivery-del',
        sidebarMeta: {
          icon: '',
          order: 10,
        },
        authenticate: true
      });
  }

})();