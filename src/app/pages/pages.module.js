/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function() {
  'use strict';

  angular.module('BlurAdmin.pages', [
      'ui.router',
      'BlurAdmin.pages.services',
      'BlurAdmin.pages.config',
      'BlurAdmin.pages.main',
      'BlurAdmin.pages.dashboard',
      'BlurAdmin.pages.bijwasan',
      'BlurAdmin.pages.mathura',
      'BlurAdmin.pages.tundla',
      'BlurAdmin.pages.meerut',
      'BlurAdmin.pages.tikrikalan',
      'BlurAdmin.pages.shiftNotes',
      'BlurAdmin.pages.bharatpur',
      'BlurAdmin.pages.authSignIn'
    ])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($urlRouterProvider, baSidebarServiceProvider) {
    $urlRouterProvider.otherwise('/authSignIn');
  }

})();