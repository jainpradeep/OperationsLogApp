/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';
  angular.module('BlurAdmin.pages.bijwasan.daily-reports.pumping-delhi-pnp', ['ngAnimate', 'ngSanitize', 'ui.bootstrap'])
    .config(routeConfig)
    .controller('pumping-delhi-pnp-ctrl', TablesPageCtrl)
    .constant('_',
      window._
    );
  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('main.bijwasan.daily-reports.pumping-delhi-pnp', {
        url: '/pumping-delhi-pnp',
        templateUrl: 'app/pages/bijwasan/daily-reports/pumping-delhi-pnp/pumping-delhi-pnp.html',
        title: 'Pumping Delhi Panipat  ',
        controller: 'pumping-delhi-pnp-ctrl',
        sidebarMeta: {
          icon: '',
          order: 10,
        },
        authenticate: true
      });
  }



 
  /** @ngInject */
  function TablesPageCtrl($scope,$rootScope, $http, $filter, editableOptions, editableThemes, PumpingDelhiPnpService, $uibModal, $log, _) {
    $rootScope.isAdmin = localStorage.getItem("isAdmin")
 
    $scope.openRemarks = function(){
      $scope.remarksModal =  $uibModal.open({
          scope: $scope,
          templateUrl: "/app/pages/bijwasan/daily-reports/pumping-delhi-pnp/remarksmodal.html",
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
          templateUrl: "/app/pages/bijwasan/daily-reports/pumping-delhi-pnp/editHistoryModal.html",
          size: '',
        })
      };

      $scope.editPumpingDelhiPnpStart = function(data){
        $scope.editablePumpingDelhiPnpHourlyRec = angular.copy(data);
      }
      
      $scope.ok = function() {
          $scope.$modalInstance.close();
      };
      
      $scope.cancel = function() {
          $scope.$modalInstance.dismiss('cancel');
      };
    
    $scope.$parent.$watch('customDate', function(value){
      $scope.customDate = $scope.$parent.customDate;
      $scope.PumpingDelhiPnp = {};
      $scope.getPumpingDelhiPnp();
    });
   
    $scope.addNewRecord = function(){
      $scope.PumpingDelhiPnp.PumpingDelhiPnpData.push({
        product:"",
        seq_no:"",
        tank_no:"",
        fmr:"",
        dip_qty:"",
      })
    }

    $scope.getPumpingDelhiPnp= function(){
      PumpingDelhiPnpService.getPumpingDelhiPnpData(JSON.stringify({
        date : $scope.customDate
      })).then(
        function(data) { 
          $scope.PumpingDelhiPnp.PumpingDelhiPnpData = JSON.parse(data.data.data)[0].data;
          $scope.PumpingDelhiPnp.PumpingDelhiPnpDate = JSON.parse(data.data.data)[0].date;
          $scope.PumpingDelhiPnp.PumpingDelhiPnpID = JSON.parse(data.data.data)[0]._id;
          $scope.PumpingDelhiPnp.PumpingDelhiPnpRemarks = JSON.parse(data.data.data)[0].remarks;
        },
        function(msg) {
        });
    }


    $scope.editPumpingDelhiPnpRemark = function(remark){
      $scope.PumpingDelhiPnp.PumpingDelhiPnpRemarks = remark 
      PumpingDelhiPnpService.editPumpingDelhiPnpData(JSON.stringify({
        _id: $scope.PumpingDelhiPnp.PumpingDelhiPnpID,
        date: $scope.PumpingDelhiPnp.PumpingDelhiPnpDate,
        data: $scope.PumpingDelhiPnp.PumpingDelhiPnpData,
        remarks: $scope.PumpingDelhiPnp.PumpingDelhiPnpRemarks
      })).then(function(){
        $scope.getPumpingDelhiPnp();
      },function(){
        console.log("error")
      })  
    }

    $scope.editPumpingDelhiPnpData = function(data, index){
      data.editHistory = $scope.editablePumpingDelhiPnpHourlyRec;
      data.editedDate = new Date();
      data.officer = localStorage.getItem("username");
      PumpingDelhiPnpService.editPumpingDelhiPnpData(JSON.stringify({
          _id: $scope.PumpingDelhiPnp.PumpingDelhiPnpID,
          date: $scope.PumpingDelhiPnp.PumpingDelhiPnpDate,
          data: $scope.PumpingDelhiPnp.PumpingDelhiPnpData,
          remarks: $scope.PumpingDelhiPnp.PumpingDelhiPnpRemarks
        })).then(function(){
          $scope.getpumpingDelhiPnp(Rev);
        },function(){
          console.log("error")
        })      
    }

    editableOptions.theme = 'bs3';
    editableThemes['bs3'].submitTpl = '<button type="submit" class="btn btn-primary btn-with-icon"><i class="ion-checkmark-round"></i></button>';
    editableThemes['bs3'].cancelTpl = '<button type="button" ng-click="$form.$cancel()" class="btn btn-default btn-with-icon"><i class="ion-close-round"></i></button>';
  }

})();
