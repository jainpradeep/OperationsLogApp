(function() {
  'use strict';
  angular.module('BlurAdmin.pages.meerut.meerut-daily-reports', ['BlurAdmin.pages.meerut.meerut-daily-reports.delivery-meerut', 'ui.bootstrap'])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('main.meerut.meerut-daily-reports', {
        url: '/daily-reports',
        templateUrl: 'app/pages/meerut/meerut-daily-reports/meerut-daily-reports.html',
        title: 'Daily Reports',
        sidebarMeta: {
          icon: 'ion-waterdrop',
          order: 0,
        },
        authenticate: true
      });
  }

})();