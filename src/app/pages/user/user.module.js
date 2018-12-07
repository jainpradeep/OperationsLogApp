(function() {
  'use strict';

  angular.module('BlurAdmin.pages.user', ['ui.bootstrap'])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('main.user', {
        url: '/user',
        templateUrl: 'app/pages/user/user.html',
        title: 'user',
        controller: 'user-ctrl',  
        sidebarMeta: {
          icon: 'ion-android-home',
          order: 0,
        },
        authenticate: true
      });
  }

})();