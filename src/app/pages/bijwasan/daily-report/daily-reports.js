(function() {
  'use strict';

  angular.module('BlurAdmin.pages.bijwasan.daily-reports', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('main.bijwasan.daily-reports', {
        url: '/bijwasan/daily-reports',
        templateUrl: 'app/pages/bijwasan/daily-reports/daily-reports.html',
        title: 'daily-reports',
        resolve: {
          security: ['$q', function($q){
              if(localStorage.getItem("username")==undefined || localStorage.getItem("dataUser")==undefined){
                 return $q.reject("Not Authorized");
              }
          }]
        },
        sidebarMeta: {
          icon: '',
          order: 0,
        },
        authenticate: true
      });
  }

})();