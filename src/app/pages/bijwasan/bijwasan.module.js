(function() {
  'use strict';

  angular.module('BlurAdmin.pages.bijwasan', ['BlurAdmin.pages.bijwasan.del-ex-mr','BlurAdmin.pages.bijwasan.sko-lbt-pumping','BlurAdmin.pages.bijwasan.del-ex-pr','BlurAdmin.pages.bijwasan.daily-reports','BlurAdmin.pages.bijwasan.equi-running-hrs-bij','BlurAdmin.pages.bijwasan.pro-in-station-linefill','BlurAdmin.pages.bijwasan.remarks','BlurAdmin.pages.bijwasan.bijwasan-product-planning', 'BlurAdmin.pages.bijwasan.lbt-table', 'BlurAdmin.pages.bijwasan.lineFill','BlurAdmin.pages.bijwasan.target-tracker','ui.bootstrap'])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('main.bijwasan', {
        url: '/bijwasan',
        templateUrl: 'app/pages/bijwasan/bijwasan.html',
        title: 'Bijwasan',
        controller: 'Bijwasan-ctrl',  
        sidebarMeta: {
          icon: 'ion-waterdrop',
          order: 0,
        },
        authenticate: true
      });
  }

})();