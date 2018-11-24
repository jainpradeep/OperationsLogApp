(function() {
  'use strict';

  angular.module('BlurAdmin.pages.tundla', ['BlurAdmin.pages.tundla.remarks','BlurAdmin.pages.tundla.tundla-daily-reports','ui.bootstrap'])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('main.tundla', {
        url: '/tundla',
        templateUrl: 'app/pages/tundla/tundla.html',
        title: 'Tundla',
        controller: 'Tundla-ctrl',  
        sidebarMeta: {
          icon: 'ion-android-home',
          order: 0,
        },
        authenticate: true
      });
  }

})();