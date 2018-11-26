/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';
  angular.module('BlurAdmin.pages.meerut.meerut-daily-reports.delivery-meerut', ['ngAnimate', 'ngSanitize', 'ui.bootstrap'])
    .config(routeConfig)
    .controller('meerut-daily-report-ctrl', TablesPageCtrl)
    .constant('_',
      window._
    );


    /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('main.meerut.meerut-daily-reports.delivery-meerut', {
        parent: "main.meerut.meerut-daily-reports",
        url: '/meerut-daily-reports',
        templateUrl: 'app/pages/meerut/meerut-daily-reports/meerut-delivery/delivery-meerut.html',
        controller: 'meerut-daily-report-ctrl',
        title: 'Meerut Daily Reports',
        sidebarMeta: {
          icon: 'ion-android-home',
          order: 0,
        },
        authenticate: true
      });
  }


 
  /** @ngInject */
  function TablesPageCtrl($scope,$rootScope, $http, $filter, editableOptions, editableThemes, deliveryMeerutService, $uibModal, $log, _, toasterService) {
    $rootScope.isAdmin = localStorage.getItem("isAdmin")
    $scope.openRemarks = function(){
    $scope.remarksModal =  $uibModal.open({
        scope: $scope,
        templateUrl: "/app/pages/meerut/meerut-daily-reports/meerut-delivery/remarksmodal.html",
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
          templateUrl: "/app/pages/meerut/meerut-daily-reports/meerut-delivery/editHistoryModal.html",
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
      $scope.deliveryMeerut = {};
      $scope.getdeliveryMeerut();
    });
    $scope.deliveryMeerutSelectShift =function(shift){
      $scope.selectedShift = shift.name;
    } 
    
    $scope.addNewRecord = function(){
      $scope.deliveryMeerut.deliveryMeerutData.push({
        product:"",
        seq_no:"",
        tank_no:"",
        fmr:"",
        dip_qty:"",
      })
    }

    $scope.getdeliveryMeerut= function(){
      deliveryMeerutService.getdeliveryMeerutData(JSON.stringify({
        date : $scope.customDate
      })).then(
        function(data) { 
          $scope.deliveryMeerut.deliveryMeerutData = JSON.parse(data.data.data)[0].data;
          $scope.deliveryMeerut.deliveryMeerutDate = JSON.parse(data.data.data)[0].date;
          $scope.deliveryMeerut.deliveryMeerutID = JSON.parse(data.data.data)[0]._id;
          $scope.deliveryMeerut.deliveryMeerutRemarks = JSON.parse(data.data.data)[0].remarks;
        },
        function(msg) {
        });
    }

    $scope.editdeliveryMeerutStart = function(data){
      $scope.editabledeliveryMeerutHourlyRec = angular.copy(data);
    }

    $scope.editdeliveryMeerutRemark = function(remark){
      
      $scope.deliveryMeerut.deliveryMeerutRemarks = remark 

      deliveryMeerutService.editdeliveryMeerutData(JSON.stringify({
        _id : $scope.deliveryMeerut.deliveryMeerutID,
        date: $scope.deliveryMeerut.deliveryMeerutDate,
        data: $scope.deliveryMeerut.deliveryMeerutData,
        remarks: $scope.deliveryMeerut.deliveryMeerutRemarks
      })).then(function(){
        toasterService.openSucessToast("Record has been successfully inserted/updated!");
        $scope.getdeliveryMeerut();
      },function(){
        toasterService.openErrorToast("Record has been successfully inserted/updated!");
      })  
    }

    $scope.editdeliveryMeerutData = function(data, index){
      data.editHistory = $scope.editabledeliveryMeerutHourlyRec;
      data.editedDate = new Date();
      data.officer = localStorage.getItem("username");
      deliveryMeerutService.editdeliveryMeerutData(JSON.stringify({
          _id : $scope.deliveryMeerut.deliveryMeerutID,
          date: $scope.deliveryMeerut.deliveryMeerutDate,
          data: $scope.deliveryMeerut.deliveryMeerutData,
          remarks:  $scope.deliveryMeerut.deliveryMeerutRemarks
        })).then(function(){
          toasterService.openSucessToast("Record has been successfully inserted/updated!");
          $scope.getdeliveryMeerut();
        },function(){
          toasterService.openErrorToast("Record has been successfully inserted/updated!");
        })      
    }

    editableOptions.theme = 'bs3';
    editableThemes['bs3'].submitTpl = '<button type="submit" class="btn btn-primary btn-with-icon"><i class="ion-checkmark-round"></i></button>';
    editableThemes['bs3'].cancelTpl = '<button type="button" ng-click="$form.$cancel()" class="btn btn-default btn-with-icon"><i class="ion-close-round"></i></button>';
  }

})();
