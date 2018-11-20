(function() {
  'use strict';

  angular.module('BlurAdmin.pages.bijwasan', ['BlurAdmin.pages.bijwasan.del-ex-mr','BlurAdmin.pages.bijwasan.sko-lbt-pumping','BlurAdmin.pages.bijwasan.del-ex-pr','BlurAdmin.pages.bijwasan.daily-reports','BlurAdmin.pages.bijwasan.equi-running-hrs-bij','BlurAdmin.pages.bijwasan.pro-in-station-linefill','ui.bootstrap'])
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
          icon: 'ion-android-home',
          order: 0,
        },
        authenticate: true
      });
  }

})();