(function() {
  'use strict';

  angular.module('BlurAdmin.pages.tikrikalan', ['BlurAdmin.pages.tikrikalan.remarks','BlurAdmin.pages.tikrikalan.tikrikalan-daily-reports','ui.bootstrap'])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('main.tikrikalan', {
        url: '/tikrikalan',
        templateUrl: 'app/pages/tikrikalan/tikrikalan.html',
        title: 'Tikrikalan',
        controller: 'Tikrikalan-ctrl',  
        sidebarMeta: {
          icon: 'ion-waterdrop',
          order: 0,
        },
        authenticate: true
      });
  }

})();