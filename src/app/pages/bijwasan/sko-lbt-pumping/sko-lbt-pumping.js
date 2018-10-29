(function() {
  'use strict';

  angular.module('BlurAdmin.pages.bijwasan.sko-lbt-pumping', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('main.bijwasan.sko-lbt-pumping', {
        url: '/sko-lbt-pumping',
        templateUrl: 'app/pages/bijwasan/sko-lbt-pumping/sko-lbt-pumping.html',
        title: 'sko-lbt-pumping',
        sidebarMeta: {
          icon: '',
          order: 0,
        },
        authenticate: true
      });
  }

})();