/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';
  angular.module('BlurAdmin.pages.tikrikalan.tikrikalan-daily-reports.delivery-tikrikalan', ['ngAnimate', 'ngSanitize', 'ui.bootstrap'])
    .config(routeConfig)
    .controller('tikrikalan-daily-report-ctrl', TablesPageCtrl)
    .constant('_',
      window._
    );


    /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('main.tikrikalan.tikrikalan-daily-reports.delivery-tikrikalan', {
        parent: "main.tikrikalan.tikrikalan-daily-reports",
        url: '/tikrikalan-daily-reports',
        templateUrl: 'app/pages/tikrikalan/tikrikalan-daily-reports/tikrikalan-delivery/delivery-tikrikalan.html',
        controller: 'tikrikalan-daily-report-ctrl',
        title: 'Tikrikalan Daily Reports',
        sidebarMeta: {
          icon: 'ion-waterdrop',
          order: 0,
        },
        authenticate: true
      });
  }


 
  /** @ngInject */
  function TablesPageCtrl($scope,$rootScope, $http,$state,   $filter, editableOptions, editableThemes, deliveryTikrikalanService, $uibModal, $log, _, toasterService) {
    $rootScope.isAdmin = localStorage.getItem("isAdmin"); $rootScope.isShiftOfficer= localStorage.getItem("isShiftOfficer")
    $scope.openRemarks = function(){
    $scope.remarksModal =  $uibModal.open({
        scope: $scope,
        templateUrl: "/app/pages/tikrikalan/tikrikalan-daily-reports/tikrikalan-delivery/remarksmodal.html",
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
          templateUrl: "/app/pages/tikrikalan/tikrikalan-daily-reports/tikrikalan-delivery/editHistoryModal.html",
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
      $scope.deliveryTikrikalan = {};
      $scope.getdeliveryTikrikalan();
    });
    $scope.deliveryTikrikalanSelectShift =function(shift){
      $scope.selectedShift = shift.name;
    } 

    $scope.addNewRecord = function(){
      $scope.deliveryTikrikalan.deliveryTikrikalanData.push({
        origin:"",
        product:"",
        seq_no:"",
        tank_no:"",
        fmr:0,
        dip_qty:0,
      })
    }
    
    $scope.getdeliveryTikrikalan= function(){
      $scope.totalDelDelivFmr = 0; $scope.totalDelDelivDip = 0;
      deliveryTikrikalanService.getdeliveryTikrikalanData(JSON.stringify({
        date : $scope.customDate
      })).then(
        function(data) { 
          $scope.deliveryTikrikalan.deliveryTikrikalanData = JSON.parse(data.data.data)[0].data;
          $scope.deliveryTikrikalan.deliveryTikrikalanDate = JSON.parse(data.data.data)[0].date;
          $scope.deliveryTikrikalan.deliveryTikrikalanID = JSON.parse(data.data.data)[0]._id;
          $scope.deliveryTikrikalan.deliveryTikrikalanRemarks = JSON.parse(data.data.data)[0].remarks;
        },
        function(msg) {
        });
    }

    $scope.editdeliveryTikrikalanStart = function(data){
      $scope.editabledeliveryTikrikalanHourlyRec = angular.copy(data);
    }

    $scope.editdeliveryTikrikalanRemark = function(remark){
      
      $scope.deliveryTikrikalan.deliveryTikrikalanRemarks = remark 

      deliveryTikrikalanService.editdeliveryTikrikalanData(JSON.stringify({
        _id : $scope.deliveryTikrikalan.deliveryTikrikalanID,
        date: $scope.deliveryTikrikalan.deliveryTikrikalanDate,
        data: $scope.deliveryTikrikalan.deliveryTikrikalanData,
        remarks: $scope.deliveryTikrikalan.deliveryTikrikalanRemarks
      })).then(function(){
        toasterService.openSucessToast("Record has been successfully inserted/updated!");
        $state.reload();
      },function(){
        toasterService.openErrorToast("Record has been successfully inserted/updated!");
      })  
    }

    $scope.editdeliveryTikrikalanData = function(data, index){
      data.editHistory = $scope.editabledeliveryTikrikalanHourlyRec;
      data.editedDate = new Date();
      data.officer = localStorage.getItem("username");
      deliveryTikrikalanService.editdeliveryTikrikalanData(JSON.stringify({
          _id : $scope.deliveryTikrikalan.deliveryTikrikalanID,
          date: $scope.deliveryTikrikalan.deliveryTikrikalanDate,
          data: $scope.deliveryTikrikalan.deliveryTikrikalanData,
          remarks:  $scope.deliveryTikrikalan.deliveryTikrikalanRemarks
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
