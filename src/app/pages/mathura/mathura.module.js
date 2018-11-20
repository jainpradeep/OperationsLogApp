(function() {
  'use strict';

  angular.module('BlurAdmin.pages.mathura', ['BlurAdmin.pages.mathura.pumpedFromMathura-MD','ui.bootstrap'])
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
          icon: 'ion-android-home',
          order: 0,
        },
        authenticate: true
      });
  }

})();