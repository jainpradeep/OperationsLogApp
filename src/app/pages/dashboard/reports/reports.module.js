(function() {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard.reports', ['BlurAdmin.pages.reports.remarks','BlurAdmin.pages.reports.reports-daily-reports','ui.bootstrap'])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('main.reports', {
        url: '/reports',
        templateUrl: 'app/pages/reports/reports.html',
        title: 'reports',
        controller: 'reports-ctrl',  
        sidebarMeta: {
          icon: 'ion-waterdrop',
          order: 0,
        },
        authenticate: true
      });
  }

})();