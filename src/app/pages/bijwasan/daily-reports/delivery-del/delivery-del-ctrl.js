/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';
  angular.module('BlurAdmin.pages.bijwasan.daily-reports.delivery-del', ['ngAnimate', 'ngSanitize', 'ui.bootstrap'])
    .config(routeConfig)
    .controller('Delivery-del-ctrl', TablesPageCtrl)
    .constant('_',
      window._
    );


    /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('main.bijwasan.delivery-del-ctrl', {
        parent: "main.bijwasan",
        url: '/delivery-del',
        templateUrl: 'app/pages/bijwasan/daily-reports/delivery-del/delivery-del.html',
        controller: 'Delivery-del-ctrl',
        title: 'Delhi Delivery',
        sidebarMeta: {
          icon: 'ion-android-home',
          order: 0,
        },
        authenticate: true
      });
  }


 
  /** @ngInject */
  function TablesPageCtrl($scope,$rootScope, $http, $filter, editableOptions, editableThemes, delhiDeliveryService, $uibModal, $log, _) {
    $rootScope.isAdmin = localStorage.getItem("isAdmin")
    $scope.openRemarks = function(){
    $scope.remarksModal =  $uibModal.open({
        scope: $scope,
        templateUrl: "/app/pages/bijwasan/del-ex-mr/remarksmodal.html",
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
          templateUrl: "/app/pages/bijwasan/del-ex-mr/editHistoryModal.html",
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
      $scope.delhiDelivery = {};
      $scope.getdelhiDelivery();
    });
    $scope.delhiDeliverySelectShift =function(shift){
      $scope.selectedShift = shift.name;
    } 
    
    $scope.getdelhiDelivery= function(){
      delhiDeliveryService.getdelhiDeliveryData(JSON.stringify({
        date : $scope.customDate
      })).then(
        function(data) { 
          $scope.delhiDelivery.delhiDeliveryData = JSON.parse(data.data.data)[0].data;
          $scope.delhiDelivery.delhiDeliveryDate = JSON.parse(data.data.data)[0].date;
          $scope.delhiDelivery.delhiDeliveryID = JSON.parse(data.data.data)[0]._id;
          $scope.delhiDelivery.delhiDeliveryRemarks = JSON.parse(data.data.data)[0].remarks;
        },
        function(msg) {
        });
    }

    $scope.editdelhiDeliveryStart = function(data){
      $scope.editabledelhiDeliveryHourlyRec = angular.copy(data);
    }

    $scope.editdelhiDeliveryRemark = function(remark){
      
      $scope.delhiDelivery.delhiDeliveryRemarks[$scope.$parent.selectedShift.name] = remark 

      delhiDeliveryService.editdelhiDeliveryData(JSON.stringify({
        _id : $scope.delhiDelivery.delhiDeliveryID,
        date: $scope.delhiDelivery.delhiDeliveryDate,
        data: $scope.delhiDelivery.delhiDeliveryData,
        remarks: $scope.delhiDelivery.delhiDeliveryRemarks
      })).then(function(){
        $scope.getdelhiDelivery();
      },function(){
        console.log("error")
      })  
    }

    $scope.editdelhiDeliveryData = function(data, index){
      data.editHistory = $scope.editabledelhiDeliveryHourlyRec;
      data.editedDate = new Date();
      data.officer = localStorage.getItem("username");
      delhiDeliveryService.editdelhiDeliveryData(JSON.stringify({
          _id : $scope.delhiDelivery.delhiDeliveryID,
          date: $scope.delhiDelivery.delhiDeliveryDate,
          data: $scope.delhiDelivery.delhiDeliveryData,
          remarks:  $scope.delhiDelivery.delhiDeliveryRemarks
        })).then(function(){
          $scope.getdelhiDelivery();
        },function(){
          console.log("error")
        })      
    }

    editableOptions.theme = 'bs3';
    editableThemes['bs3'].submitTpl = '<button type="submit" class="btn btn-primary btn-with-icon"><i class="ion-checkmark-round"></i></button>';
    editableThemes['bs3'].cancelTpl = '<button type="button" ng-click="$form.$cancel()" class="btn btn-default btn-with-icon"><i class="ion-close-round"></i></button>';
  }

})();
