(function() {
  'use strict';

  angular.module('BlurAdmin.pages.bharatpur', ['BlurAdmin.pages.bharatpur.remarks','BlurAdmin.pages.bharatpur.bharatpur-daily-reports','ui.bootstrap'])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('main.bharatpur', {
        url: '/bharatpur',
        templateUrl: 'app/pages/bharatpur/bharatpur.html',
        title: 'Bharatpur',
        controller: 'Bharatpur-ctrl',  
        sidebarMeta: {
          icon: 'ion-android-home',
          order: 0,
        },
        authenticate: true
      });
  }

})();