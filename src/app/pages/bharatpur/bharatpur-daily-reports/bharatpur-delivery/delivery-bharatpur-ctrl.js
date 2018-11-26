/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';
  angular.module('BlurAdmin.pages.bharatpur.bharatpur-daily-reports.delivery-bharatpur', ['ngAnimate', 'ngSanitize', 'ui.bootstrap'])
    .config(routeConfig)
    .controller('bharatpur-daily-report-ctrl', TablesPageCtrl)
    .constant('_',
      window._
    );


    /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('main.bharatpur.bharatpur-daily-reports.delivery-bharatpur', {
        parent: "main.bharatpur.bharatpur-daily-reports",
        url: '/bharatpur-daily-reports',
        templateUrl: 'app/pages/bharatpur/bharatpur-daily-reports/bharatpur-delivery/delivery-bharatpur.html',
        controller: 'bharatpur-daily-report-ctrl',
        title: 'Bharatpur Daily Reports',
        sidebarMeta: {
          icon: 'ion-android-home',
          order: 0,
        },
        authenticate: true
      });
  }


 
  /** @ngInject */
  function TablesPageCtrl($scope,$rootScope, $http, $filter, editableOptions, editableThemes, deliveryBharatpurService, $uibModal, $log, _, toasterService) {
    $rootScope.isAdmin = localStorage.getItem("isAdmin")
    $scope.openRemarks = function(){
    $scope.remarksModal =  $uibModal.open({
        scope: $scope,
        templateUrl: "/app/pages/bharatpur/bharatpur-daily-reports/bharatpur-delivery/remarksmodal.html",
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
          templateUrl: "/app/pages/bharatpur/bharatpur-daily-reports/bharatpur-delivery/editHistoryModal.html",
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
      $scope.deliveryBharatpur = {};
      $scope.getdeliveryBharatpur();
    });
    $scope.deliveryBharatpurSelectShift =function(shift){
      $scope.selectedShift = shift.name;
    } 
    
    $scope.addNewRecord = function(){
      $scope.deliveryBharatpur.deliveryBharatpurData.push({
        product:"",
        seq_no:"",
        tank_no:"",
        fmr:"",
        dip_qty:"",
      })
    }

    $scope.getdeliveryBharatpur= function(){
      deliveryBharatpurService.getdeliveryBharatpurData(JSON.stringify({
        date : $scope.customDate
      })).then(
        function(data) { 
          $scope.deliveryBharatpur.deliveryBharatpurData = JSON.parse(data.data.data)[0].data;
          $scope.deliveryBharatpur.deliveryBharatpurDate = JSON.parse(data.data.data)[0].date;
          $scope.deliveryBharatpur.deliveryBharatpurID = JSON.parse(data.data.data)[0]._id;
          $scope.deliveryBharatpur.deliveryBharatpurRemarks = JSON.parse(data.data.data)[0].remarks;
        },
        function(msg) {
        });
    }

    $scope.editdeliveryBharatpurStart = function(data){
      $scope.editabledeliveryBharatpurHourlyRec = angular.copy(data);
    }

    $scope.editdeliveryBharatpurRemark = function(remark){
      
      $scope.deliveryBharatpur.deliveryBharatpurRemarks = remark 
      deliveryBharatpurService.editdeliveryBharatpurData(JSON.stringify({
        _id : $scope.deliveryBharatpur.deliveryBharatpurID,
        date: $scope.deliveryBharatpur.deliveryBharatpurDate,
        data: $scope.deliveryBharatpur.deliveryBharatpurData,
        remarks: $scope.deliveryBharatpur.deliveryBharatpurRemarks
      })).then(function(){
        toasterService.openSucessToast("Record has been successfully inserted/updated!");
        $scope.getdeliveryBharatpur();
      },function(){
        toasterService.openErrorToast("Record has been successfully inserted/updated!");
      })  
    }

    $scope.editdeliveryBharatpurData = function(data, index){
      data.editHistory = $scope.editabledeliveryBharatpurHourlyRec;
      data.editedDate = new Date();
      data.officer = localStorage.getItem("username");
      deliveryBharatpurService.editdeliveryBharatpurData(JSON.stringify({
          _id : $scope.deliveryBharatpur.deliveryBharatpurID,
          date: $scope.deliveryBharatpur.deliveryBharatpurDate,
          data: $scope.deliveryBharatpur.deliveryBharatpurData,
          remarks:  $scope.deliveryBharatpur.deliveryBharatpurRemarks
        })).then(function(){
          toasterService.openSucessToast("Record has been successfully inserted/updated!");
          $scope.getdeliveryBharatpur();
        },function(){
          toasterService.openErrorToast("Record has been successfully inserted/updated!");
        })      
    }
    
    editableOptions.theme = 'bs3';
    editableThemes['bs3'].submitTpl = '<button type="submit" class="btn btn-primary btn-with-icon"><i class="ion-checkmark-round"></i></button>';
    editableThemes['bs3'].cancelTpl = '<button type="button" ng-click="$form.$cancel()" class="btn btn-default btn-with-icon"><i class="ion-close-round"></i></button>';
  }

})();
