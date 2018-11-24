(function() {
  'use strict';

  angular.module('BlurAdmin.pages.meerut', ['BlurAdmin.pages.meerut.remarks','ui.bootstrap'])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('main.meerut', {
        url: '/meerut',
        templateUrl: 'app/pages/meerut/meerut.html',
        title: 'Meerut',
        controller: 'Meerut-ctrl',  
        sidebarMeta: {
          icon: 'ion-android-home',
          order: 0,
        },
        authenticate: true
      });
  }

})();