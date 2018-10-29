(function() {
  'use strict';

  angular.module('BlurAdmin.pages.bijwasan', ['BlurAdmin.pages.bijwasan.del-ex-mr','BlurAdmin.pages.bijwasan.sko-lbt-pumping','BlurAdmin.pages.bijwasan.daily-reports' ])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('main.bijwasan', {
        url: '/bijwasan',
        templateUrl: 'app/pages/bijwasan/bijwasan.html',
        title: 'Bijwasan',
        sidebarMeta: {
          icon: 'ion-android-home',
          order: 0,
        },
        authenticate: true
      });
  }

})();