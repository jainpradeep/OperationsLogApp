/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';
  angular.module('BlurAdmin.pages.bijwasan.pro-in-station-linefill', ['ngAnimate', 'ngSanitize', 'ui.bootstrap'])
    .config(routeConfig)
    .controller('pro-in-station-linefill-ctrl', TablesPageCtrl)
    .constant('_',
      window._
    );


    /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('main.bijwasan.pro-in-station-linefill', {
        parent: "main.bijwasan",
        url: '/pro-in-station-linefill',
        templateUrl: 'app/pages/bijwasan/pro-in-station-linefill/pro-in-station-linefill.html',
        controller: 'pro-in-station-linefill-ctrl',
        title: 'Product In Station Line Fill',
        sidebarMeta: {
          icon: 'ion-waterdrop',
          order: 0,
        },
        authenticate: true
      });
  }


 
  /** @ngInject */
  function TablesPageCtrl($scope,$rootScope, $http, $filter, editableOptions, editableThemes, proInStationLinefillService, $uibModal, $log, _, toasterService) {
    $rootScope.isAdmin = localStorage.getItem("isAdmin")
    
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
          templateUrl: "/app/pages/bijwasan/pro-in-station-linefill/editHistoryModal.html",
          size: '',
        })
      };
      
      $scope.ok = function() {
          $scope.$modalInstance.close();
      };
      
      $scope.cancel = function() {
          $scope.$modalInstance.dismiss('cancel');
      };
    
    $scope.$parent.$watch('customDate', function(value){
      $scope.customDate = $scope.$parent.customDate;
      $scope.productInStationLinefill = {};
      $scope.getProductInStationLinefill();
    });
    
    $scope.getProductInStationLinefill= function(){
      proInStationLinefillService.getProInStationLinefillData(JSON.stringify({
        date : $scope.customDate
      })).then(
        function(data) { 
          $scope.productInStationLinefill.proInStationLinefillData = JSON.parse(data.data.data)[0].data;
          $scope.productInStationLinefill.proInStationLinefillDate = JSON.parse(data.data.data)[0].date;
          $scope.productInStationLinefill.proInStationLinefillID = JSON.parse(data.data.data)[0]._id;
          $scope.productInStationLinefill.proInStationLinefillRemarks = JSON.parse(data.data.data)[0].remarks;
        },
        function(msg) {
        });
    }

    $scope.editProductInStationLinefillStart = function(data){
      $scope.editableProductInStationLinefillHourlyRec = angular.copy(data);
    }

    $scope.editProInStationLinefillData = function(data, index){
      data.editHistory = $scope.editableProductInStationLinefillHourlyRec;
      data.editedDate = new Date();
      data.officer = localStorage.getItem("username");
      proInStationLinefillService.editProInStationLinefillData(JSON.stringify({
          _id : $scope.productInStationLinefill.proInStationLinefillID,
          date: $scope.productInStationLinefill.proInStationLinefillDate,
          data: $scope.productInStationLinefill.proInStationLinefillData,
          remarks:  $scope.productInStationLinefill.proInStationLinefillRemarks
        })).then(function(){
          toasterService.openSucessToast("Record has been successfully inserted/updated!");
          $scope.getProductInStationLinefill();
        },function(){
          toasterService.openErrorToast("Record has been successfully inserted/updated!");
        })      
    }

    editableOptions.theme = 'bs3';
    editableThemes['bs3'].submitTpl = '<button type="submit" class="btn btn-primary btn-with-icon"><i class="ion-checkmark-round"></i></button>';
    editableThemes['bs3'].cancelTpl = '<button type="button" ng-click="$form.$cancel()" class="btn btn-default btn-with-icon"><i class="ion-close-round"></i></button>';
  }

})();
