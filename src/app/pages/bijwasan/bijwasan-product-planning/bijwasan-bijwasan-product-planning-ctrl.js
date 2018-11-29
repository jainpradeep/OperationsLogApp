/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';
  angular.module('BlurAdmin.pages.bijwasan.bijwasan-product-planning', ['ngAnimate', 'ngSanitize', 'ui.bootstrap'])
    .config(routeConfig)
    .controller('bijwasan-bijwasan-product-planning-ctrl', TablesPageCtrl)
    .constant('_',
      window._
    );


    /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('main.bijwasan.bijwasan-product-planning', {
        parent: "main.bijwasan",
        url: '/bijwasan-product-planning',
        templateUrl: 'app/pages/bijwasan/bijwasan-product-planning/bijwasan-product-planning.html',
        controller: 'bijwasan-bijwasan-product-planning-ctrl',
        title: 'Product Planning',
        sidebarMeta: {
          icon: 'ion-waterdrop',
          order: 0,
        },
        authenticate: true
      });
  }


 
  /** @ngInject */
  function TablesPageCtrl($scope,$rootScope, $http, $filter, editableOptions, editableThemes, bijwasanProductPlanningService, $uibModal, $log, _, toasterService) {
    $rootScope.isAdmin = localStorage.getItem("isAdmin")
    $scope.selectedShift = "Shift A";
    $scope.open = function(data) {
      $scope.flattenedHourEditHistory = [];
      recursivePush(data)
      
      function recursivePush(data){
        $scope.flattenedHourEditHistory.push(_.omit(data, 'editHistory'))
        if(data.editHistory!=null){
          recursivePush(data.editHistory)
        }
      }

      $scope.$modalInstance =  $uibModal.open({
          scope: $scope,
          templateUrl: "/app/pages/bijwasan/bijwasan-product-planning/editHistoryModal.html",
          size: '',
        })
      };
      
      $scope.ok = function() {
          $scope.$modalInstance.close();
      };
      
      $scope.cancel = function() {
          $scope.$modalInstance.dismiss('cancel');
      };
    
    $scope.selectedShift = "Shift A";
    $scope.$parent.$watch('customDate', function(value){
      $scope.customDate = $scope.$parent.customDate;
      $scope.bijwasanProductPlanning = {};
      $scope.getbijwasanProductPlanning();
    });
    $scope.bijwasanProductPlanningSelectShift =function(shift){
      $scope.selectedShift = shift.name;
    } 
    
    $scope.getbijwasanProductPlanning= function(){
      bijwasanProductPlanningService.getBijwasanProductPlanningData(JSON.stringify({
        date : $scope.customDate
      })).then(
        function(data) { 
          $scope.bijwasanProductPlanning.bijwasanProductPlanningData = JSON.parse(data.data.data)[0].data;
          $scope.bijwasanProductPlanning.bijwasanProductPlanningDate = JSON.parse(data.data.data)[0].date;
          $scope.bijwasanProductPlanning.bijwasanProductPlanningID = JSON.parse(data.data.data)[0]._id;
        },
        function(msg) {
        });
    }

    $scope.editBijwasanProductPlanningStart = function(data){
      $scope.editableBijwasanProductPlanningHourlyRec = angular.copy(data);
    }

    $scope.editBijwasanProductPlanningData = function(data, index){
      data.editHistory = $scope.editableBijwasanProductPlanningHourlyRec;
      data.editedDate = new Date();
      data.officer = localStorage.getItem("username");
      bijwasanProductPlanningService.editBijwasanProductPlanningData(JSON.stringify({
          _id : $scope.bijwasanProductPlanning.bijwasanProductPlanningID,
          date: $scope.bijwasanProductPlanning.bijwasanProductPlanningDate,
          data: $scope.bijwasanProductPlanning.bijwasanProductPlanningData,
        })).then(function(){
          toasterService.openSucessToast("Record has been successfully inserted/updated!");
          $scope.getbijwasanProductPlanning();
        },function(){
          toasterService.openErrorToast("Something went wrong. Please contact the IS department!");
        })      
    }

    editableOptions.theme = 'bs3';
    editableThemes['bs3'].submitTpl = '<button type="submit" class="btn btn-primary btn-with-icon"><i class="ion-checkmark-round"></i></button>';
    editableThemes['bs3'].cancelTpl = '<button type="button" ng-click="$form.$cancel()" class="btn btn-default btn-with-icon"><i class="ion-close-round"></i></button>';
  }

})();
