(function() {
  'use strict';
  angular.module('BlurAdmin.pages.mathura.mathura-daily-reports', ['BlurAdmin.pages.mathura.mathura-daily-reports.ex-mathura-mtpl', 'BlurAdmin.pages.mathura.mathura-daily-reports.ex-mathura-mbpl', 'BlurAdmin.pages.mathura.mathura-daily-reports.ex-mathura-md', 'ui.bootstrap'])
    .config(routeConfig)
    .controller('mathura-daily-reports-ctrl', TablesPageCtrl)
  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('main.mathura.mathura-daily-reports', {
        url: '/daily-reports',
        templateUrl: 'app/pages/mathura/mathura-daily-reports/mathura-daily-reports.html',
        title: 'Daily Reports',
        controller: 'mathura-daily-reports-ctrl',
        sidebarMeta: {
          icon: 'ion-waterdrop',
          order: 0,
        },
        authenticate: true
      });
  }

 
  /** @ngInject */
  function TablesPageCtrl($scope,$rootScope, $http, $filter, editableOptions, editableThemes, monMtMbMdplService, $uibModal, $log, _, toasterService) {
 
  }
})();