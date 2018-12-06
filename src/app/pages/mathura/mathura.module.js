  (function() {
  'use strict';

  angular.module('BlurAdmin.pages.mathura', ['BlurAdmin.pages.mathura.pumpedFromMathura-MD','BlurAdmin.pages.mathura.monitoring-mt-mb-mdpl', 'BlurAdmin.pages.mathura.remarks', 'BlurAdmin.pages.mathura.mathura-daily-reports','BlurAdmin.pages.mathura.shutdown','ui.bootstrap'])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('main.mathura', {
        url: '/mathura',
        templateUrl: 'app/pages/mathura/mathura.html',
        title: 'Mathura',
        controller: 'Mathura-ctrl',  
        sidebarMeta: {
          icon: 'ion-waterdrop',
          order: 0,
        },
        authenticate: true
      });
  }

})();