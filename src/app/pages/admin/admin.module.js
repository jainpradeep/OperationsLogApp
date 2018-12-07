(function() {
  'use strict';

  angular.module('BlurAdmin.pages.admin', ['ui.bootstrap'])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('main.admin', {
        url: '/admin',
        templateUrl: 'app/pages/admin/admin.html',
        title: 'admin',
        controller: 'admin-ctrl',  
        sidebarMeta: {
          icon: 'ion-android-home',
          order: 0,
        },
        authenticate: true
      });
  }

})();