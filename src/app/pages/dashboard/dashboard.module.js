/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function() {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard', ['ngAnimate', 'ngSanitize', 'ui.bootstrap'])
    .config(routeConfig); 

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('main.dashboard', {
        url: '/dashboard',
        templateUrl: 'app/pages/dashboard/dashboard.html',
        title: 'Dashboard',
        controller: "dashboard-ctrl",
        sidebarMeta: {
          icon: 'ion-waterdrop',
          order: 0,
        },
        authenticate: true
      });
  }

})();