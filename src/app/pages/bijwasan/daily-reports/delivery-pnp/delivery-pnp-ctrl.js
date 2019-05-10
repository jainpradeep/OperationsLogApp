/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';
  angular.module('BlurAdmin.pages.bijwasan.daily-reports.Delivery-Pnp', ['ngAnimate', 'ngSanitize', 'ui.bootstrap'])
    .config(routeConfig)
    .controller('Delivery-Pnp-ctrl', TablesPageCtrl)
    .constant('_',
      window._
    );
  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('main.bijwasan.daily-reports.Delivery-Pnp', {
        url: '/Delivery-Pnp',
        templateUrl: 'app/pages/bijwasan/daily-reports/Delivery-Pnp/Delivery-Pnp.html',
        title: 'Delivery Panipat  ',
        controller: 'Delivery-Pnp-ctrl',
        sidebarMeta: {
          icon: '',
          order: 10,
        },
        authenticate: true
      });
  }



 
  /** @ngInject */
  function TablesPageCtrl($scope,$rootScope, $http,$state, $filter, editableOptions, editableThemes, DeliveryPnpService, $uibModal, $log, _, toasterService) {
    $rootScope.isAdmin = localStorage.getItem("isAdmin"); $rootScope.isShiftOfficer= localStorage.getItem("isShiftOfficer")
 
    $scope.openRemarks = function(){
      $scope.remarksModal =  $uibModal.open({
          scope: $scope,
          templateUrl: "/app/pages/bijwasan/daily-reports/Delivery-Pnp/remarksmodal.html",
          size: '',
        })
      }
  
      $scope.editRemarksModal = function() {
        $scope.remarksModal.close();
      };
    
      $scope.cancelRemarksModal = function() {
        $scope.remarksModal.dismiss('cancel');
      };




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
          templateUrl: "/app/pages/bijwasan/daily-reports/Delivery-Pnp/editHistoryModal.html",
          size: '',
        })
      };

      $scope.editDeliveryPnpStart = function(data){
        $scope.editableDeliveryPnpHourlyRec = angular.copy(data);
      }
      
      $scope.ok = function() {
          $scope.$modalInstance.close();
      };
      
      $scope.cancel = function() {
          $scope.$modalInstance.dismiss('cancel');
      };
    
    $scope.$parent.$watch('customDate', function(value){
      $scope.customDate = $scope.$parent.customDate;
      $scope.DeliveryPnp = {};
      $scope.getDeliveryPnp();
    });
   
    $scope.addNewRecord = function(){
      $scope.DeliveryPnp.DeliveryPnpData.push({
        origin:"",
        product:"",
        seq_no:"",
        tank_no:"",
        fmr:0,
        dip_qty:0,
      })
    }

    $scope.getDeliveryPnp= function(){
      $scope.totalDelDelivFmr = 0; $scope.totalDelDelivDip = 0;
      DeliveryPnpService.getDeliveryPnpData(JSON.stringify({
        date : $scope.customDate
      })).then(
        function(data) { 
          $scope.DeliveryPnp.DeliveryPnpData = JSON.parse(data.data.data)[0].data;
          $scope.DeliveryPnp.DeliveryPnpDate = JSON.parse(data.data.data)[0].date;
          $scope.DeliveryPnp.DeliveryPnpID = JSON.parse(data.data.data)[0]._id;
          $scope.DeliveryPnp.DeliveryPnpRemarks = JSON.parse(data.data.data)[0].remarks;
        },
        function(msg) {
        });
    }


    $scope.editDeliveryPnpRemark = function(remark){
      $scope.DeliveryPnp.DeliveryPnpRemarks = remark 
      DeliveryPnpService.editDeliveryPnpData(JSON.stringify({
        _id: $scope.DeliveryPnp.DeliveryPnpID,
        date: $scope.DeliveryPnp.DeliveryPnpDate,
        data: $scope.DeliveryPnp.DeliveryPnpData,
        remarks: $scope.DeliveryPnp.DeliveryPnpRemarks
      })).then(function(){
        toasterService.openSucessToast("Record has been successfully inserted/updated!");
        $state.reload();
      },function(){
        toasterService.openErrorToast("Record has been successfully inserted/updated!");
      })  
    }

    $scope.editDeliveryPnpData = function(data, index){
      data.editHistory = $scope.editableDeliveryPnpHourlyRec;
      data.editedDate = new Date();
      data.officer = localStorage.getItem("username");
      DeliveryPnpService.editDeliveryPnpData(JSON.stringify({
          _id: $scope.DeliveryPnp.DeliveryPnpID,
          date: $scope.DeliveryPnp.DeliveryPnpDate,
          data: $scope.DeliveryPnp.DeliveryPnpData,
          remarks: $scope.DeliveryPnp.DeliveryPnpRemarks
        })).then(function(){
          toasterService.openSucessToast("Record has been successfully inserted/updated!");
          $state.reload();
        },function(){
          toasterService.openErrorToast("Record has been successfully inserted/updated!");
        })      
    }

    editableOptions.theme = 'bs3';
    editableThemes['bs3'].submitTpl = '<button type="submit" class="btn btn-primary btn-with-icon"><i class="ion-checkmark-round"></i></button>';
    editableThemes['bs3'].cancelTpl = '<button type="button" ng-click="$form.$cancel()" class="btn btn-default btn-with-icon"><i class="ion-close-round"></i></button>';
  }

})();
