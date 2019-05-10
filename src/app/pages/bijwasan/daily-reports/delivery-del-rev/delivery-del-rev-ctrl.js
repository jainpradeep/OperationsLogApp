/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';
  angular.module('BlurAdmin.pages.bijwasan.daily-reports.delivery-del-rev', ['ngAnimate', 'ngSanitize', 'ui.bootstrap'])
    .config(routeConfig)
    .controller('Delivery-del-rev-ctrl', TablesPageCtrl)
    .constant('_',
      window._
    );
  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('main.bijwasan.daily-reports.delivery-del-rev', {
        url: '/delivery-del-rev',
        templateUrl: 'app/pages/bijwasan/daily-reports/delivery-del-rev/delivery-del-rev.html',
        title: 'Delhi Delivery (Reverse) ',
        controller: 'Delivery-del-rev-ctrl',
        sidebarMeta: {
          icon: '',
          order: 10,
        },
        authenticate: true
      });
  }



 
  /** @ngInject */
  function TablesPageCtrl($scope,$rootScope, $http, $state, $filter, editableOptions, editableThemes, delhiDeliveryRevService, $uibModal, $log, _, toasterService) {
    $rootScope.isAdmin = localStorage.getItem("isAdmin"); $rootScope.isShiftOfficer= localStorage.getItem("isShiftOfficer")
 
    $scope.openRemarks = function(){
      $scope.remarksModal =  $uibModal.open({
          scope: $scope,
          templateUrl: "/app/pages/bijwasan/daily-reports/delivery-del-rev/remarksmodal.html",
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
          templateUrl: "/app/pages/bijwasan/daily-reports/delivery-del-rev/editHistoryModal.html",
          size: '',
        })
      };

      $scope.editdelhiDeliveryRevStart = function(data){
        $scope.editableDelhiDeliveryRevHourlyRec = angular.copy(data);
      }
      
      $scope.ok = function() {
          $scope.$modalInstance.close();
      };
      
      $scope.cancel = function() {
          $scope.$modalInstance.dismiss('cancel');
      };
    
    $scope.$parent.$watch('customDate', function(value){
      $scope.customDate = $scope.$parent.customDate;
      $scope.delhiDeliveryRev = {};
      $scope.getdelhiDeliveryRev();
    });
   
    $scope.addNewRecord = function(){
      $scope.delhiDeliveryRev.delhiDeliveryRevData.push({
        origin:"",
        product:"",
        seq_no:"",
        tank_no:"",
        fmr:0,
        dip_qty:0,
      })
    }

    $scope.getdelhiDeliveryRev= function(){
      $scope.totalDelDelivFmr = 0; $scope.totalDelDelivDip = 0;
      delhiDeliveryRevService.getdelhiDeliveryRevData(JSON.stringify({
        date : $scope.customDate
      })).then(
        function(data) { 
          $scope.delhiDeliveryRev.delhiDeliveryRevData = JSON.parse(data.data.data)[0].data;
          $scope.delhiDeliveryRev.delhiDeliveryRevDate = JSON.parse(data.data.data)[0].date;
          $scope.delhiDeliveryRev.delhiDeliveryRevID = JSON.parse(data.data.data)[0]._id;
          $scope.delhiDeliveryRev.delhiDeliveryRevRemarks = JSON.parse(data.data.data)[0].remarks;
        },
        function(msg) {
        });
    }


    $scope.editdelhiDeliveryRevRemark = function(remark){
      $scope.delhiDeliveryRev.delhiDeliveryRevRemarks = remark 
      delhiDeliveryRevService.editdelhiDeliveryRevData(JSON.stringify({
        _id: $scope.delhiDeliveryRev.delhiDeliveryRevID,
        date: $scope.delhiDeliveryRev.delhiDeliveryRevDate,
        data: $scope.delhiDeliveryRev.delhiDeliveryRevData,
        remarks: $scope.delhiDeliveryRev.delhiDeliveryRevRemarks
      })).then(function(){
        toasterService.openSucessToast("Record has been successfully inserted/updated!");
        $state.reload();
      },function(){
        toasterService.openErrorToast("Record has been successfully inserted/updated!");
      })  
    }

    $scope.editdelhiDeliveryRevData = function(data, index){
      data.editHistory = $scope.editableDelhiDeliveryRevHourlyRec;
      data.editedDate = new Date();
      data.officer = localStorage.getItem("username");
      delhiDeliveryRevService.editdelhiDeliveryRevData(JSON.stringify({
          _id: $scope.delhiDeliveryRev.delhiDeliveryRevID,
          date: $scope.delhiDeliveryRev.delhiDeliveryRevDate,
          data: $scope.delhiDeliveryRev.delhiDeliveryRevData,
          remarks: $scope.delhiDeliveryRev.delhiDeliveryRevRemarks
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
