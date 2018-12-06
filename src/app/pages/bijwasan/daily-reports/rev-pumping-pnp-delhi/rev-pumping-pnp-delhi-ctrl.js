/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';
  angular.module('BlurAdmin.pages.bijwasan.daily-reports.rev-pumping-pnp-delhi', ['ngAnimate', 'ngSanitize', 'ui.bootstrap'])
    .config(routeConfig)
    .controller('Rev-pumping-pnp-delhi-ctrl', TablesPageCtrl)
    .constant('_',
      window._
    );
  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('main.bijwasan.daily-reports.rev-pumping-pnp-delhi', {
        url: '/rev-pumping-pnp-delhi',
        templateUrl: 'app/pages/bijwasan/daily-reports/rev-pumping-pnp-delhi/rev-pumping-pnp-delhi.html',
        title: 'Reverse Pumping Panipat Delhi ',
        controller: 'Rev-pumping-pnp-delhi-ctrl',
        sidebarMeta: {
          icon: '',
          order: 10,
        },
        authenticate: true
      });
  }



 
  /** @ngInject */
  function TablesPageCtrl($scope,$rootScope, $state, $http, $filter, editableOptions, editableThemes, revPumpingPnpDelhiService, $uibModal, $log, _, toasterService) {
    $rootScope.isAdmin = localStorage.getItem("isAdmin"); $rootScope.isShiftOfficer= localStorage.getItem("isShiftOfficer")
 
    $scope.openRemarks = function(){
      $scope.remarksModal =  $uibModal.open({
          scope: $scope,
          templateUrl: "/app/pages/bijwasan/daily-reports/rev-pumping-pnp-delhi/remarksmodal.html",
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
          templateUrl: "/app/pages/bijwasan/daily-reports/rev-pumping-pnp-delhi/editHistoryModal.html",
          size: '',
        })
      };

      $scope.editrevPumpingPnpDelhiStart = function(data){
        $scope.editableRevPumpingPnpDelhiRevHourlyRec = angular.copy(data);
      }
      
      $scope.ok = function() {
          $scope.$modalInstance.close();
      };
      
      $scope.cancel = function() {
          $scope.$modalInstance.dismiss('cancel');
      };
    
    $scope.$parent.$watch('customDate', function(value){
      $scope.customDate = $scope.$parent.customDate;
      $scope.revPumpingPnpDelhi = {};
      $scope.getRevPumpingPnpDelhi();
    });
   
    $scope.addNewRecord = function(){
      $scope.revPumpingPnpDelhi.revPumpingPnpDelhiData.push({
        product:"",
        seq_no:"",
        tank_no:"",
        fmr:0,
        dip_qty:0,
      })
    }

    $scope.getRevPumpingPnpDelhi= function(){
      revPumpingPnpDelhiService.getRevPumpingPnpDelhiData(JSON.stringify({
        date : $scope.customDate
      })).then(
        function(data) { 
          $scope.revPumpingPnpDelhi.revPumpingPnpDelhiData = JSON.parse(data.data.data)[0].data;
          $scope.revPumpingPnpDelhi.revPumpingPnpDelhiDate = JSON.parse(data.data.data)[0].date;
          $scope.revPumpingPnpDelhi.revPumpingPnpDelhiID = JSON.parse(data.data.data)[0]._id;
          $scope.revPumpingPnpDelhi.revPumpingPnpDelhiRemarks = JSON.parse(data.data.data)[0].remarks;
        },
        function(msg) {
        });
    }


    $scope.editrevPumpingPnpDelhiRemark = function(remark){
      $scope.revPumpingPnpDelhi.revPumpingPnpDelhiRemarks = remark 
      revPumpingPnpDelhiService.editrevPumpingPnpDelhiData(JSON.stringify({
        _id: $scope.revPumpingPnpDelhi.revPumpingPnpDelhiID,
        date: $scope.revPumpingPnpDelhi.revPumpingPnpDelhiDate,
        data: $scope.revPumpingPnpDelhi.revPumpingPnpDelhiData,
        remarks: $scope.revPumpingPnpDelhi.revPumpingPnpDelhiRemarks
      })).then(function(){
        toasterService.openSucessToast("Record has been successfully inserted/updated!");
        $state.reload();
      },function(){
        toasterService.openErrorToast("Record has been successfully inserted/updated!");
      })  
    }

    $scope.editrevPumpingPnpDelhiData = function(data, index){
      data.editHistory = $scope.editableRevPumpingPnpDelhiRevHourlyRec;
      data.editedDate = new Date();
      data.officer = localStorage.getItem("username");
      revPumpingPnpDelhiService.editrevPumpingPnpDelhiData(JSON.stringify({
          _id: $scope.revPumpingPnpDelhi.revPumpingPnpDelhiID,
          date: $scope.revPumpingPnpDelhi.revPumpingPnpDelhiDate,
          data: $scope.revPumpingPnpDelhi.revPumpingPnpDelhiData,
          remarks: $scope.revPumpingPnpDelhi.revPumpingPnpDelhiRemarks
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
