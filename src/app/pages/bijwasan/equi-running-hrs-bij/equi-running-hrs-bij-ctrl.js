/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';
  angular.module('BlurAdmin.pages.bijwasan.equi-running-hrs-bij', ['ngAnimate', 'ngSanitize', 'ui.bootstrap'])
    .config(routeConfig)
    .controller('equi-running-hrs-bij-ctrl', TablesPageCtrl)
    .constant('_',
      window._
    );

    /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('main.bijwasan.equi-running-hrs-bij', {
        parent: "main.bijwasan",
        url: '/equi-running-hrs-bij',
        templateUrl: 'app/pages/bijwasan/equi-running-hrs-bij/equi-running-hrs-bij.html',
        controller: 'equi-running-hrs-bij-ctrl',
        title: 'Equipment Running Hrs Bijwasan',
        sidebarMeta: {
          icon: 'ion-waterdrop',
          order: 0,
        },
        authenticate: true
      });
  }


 
  /** @ngInject */
  function TablesPageCtrl($scope,$rootScope, $http, $filter, editableOptions, editableThemes, equiRunningHrsBijService, $uibModal, $log, _, toasterService) {
    $rootScope.isAdmin = localStorage.getItem("isAdmin")
    $scope.openRemarks = function(){
    $scope.remarksModal =  $uibModal.open({
        scope: $scope,
        templateUrl: "/app/pages/bijwasan/equi-running-hrs-bij/remarksmodal.html",
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
          templateUrl: "/app/pages/bijwasan/equi-running-hrs-bij/editHistoryModal.html",
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
      $scope.equiRunningHrsBijwasan = {};
      $scope.getEquiRunningHrsBijwasan();
    });
    
    $scope.getEquiRunningHrsBijwasan= function(){
      equiRunningHrsBijService.getEquiRunningHrsBijData(JSON.stringify({
        date : $scope.customDate
      })).then(
        function(data) { 
          $scope.equiRunningHrsBijwasan.equiRunningHrsBijData = JSON.parse(data.data.data)[0].data;
          $scope.equiRunningHrsBijwasan.equiRunningHrsBijDate = JSON.parse(data.data.data)[0].date;
          $scope.equiRunningHrsBijwasan.equiRunningHrsBijID = JSON.parse(data.data.data)[0]._id;
          $scope.equiRunningHrsBijwasan.equiRunningHrsBijRemarks = JSON.parse(data.data.data)[0].remarks;
        },
        function(msg) {
        });
    }

    $scope.editEquiRunningHrsBijwasanStart = function(data){
      $scope.editableEquiRunningHrsBijwasanHourlyRec = angular.copy(data);
    }

    $scope.editEquiRunningHrsBijwasanRemark = function(remark){
      
      $scope.equiRunningHrsBijwasan.equiRunningHrsBijRemarks = remark 

      equiRunningHrsBijService.editEquiRunningHrsBijData(JSON.stringify({
        _id : $scope.equiRunningHrsBijwasan.equiRunningHrsBijID,
        date: $scope.equiRunningHrsBijwasan.equiRunningHrsBijDate,
        data: $scope.equiRunningHrsBijwasan.equiRunningHrsBijData,
        remarks: $scope.equiRunningHrsBijwasan.equiRunningHrsBijRemarks
      })).then(function(){
        toasterService.openSucessToast("Record has been successfully inserted/updated!");
        $scope.getEquiRunningHrsBijwasan();
      },function(){
        toasterService.openErrorToast("Record has been successfully inserted/updated!");
      })  
    }

    $scope.editEquiRunningHrsBijData = function(data, index){
      data.editHistory = $scope.editableEquiRunningHrsBijwasanHourlyRec;
      data.editedDate = new Date();
      data.officer = localStorage.getItem("username");
      equiRunningHrsBijService.editEquiRunningHrsBijData(JSON.stringify({
        _id : $scope.equiRunningHrsBijwasan.equiRunningHrsBijID,
        date: $scope.equiRunningHrsBijwasan.equiRunningHrsBijDate,
        data: $scope.equiRunningHrsBijwasan.equiRunningHrsBijData,
        remarks: $scope.equiRunningHrsBijwasan.equiRunningHrsBijRemarks  
      })).then(function(){
        toasterService.openSucessToast("Record has been successfully inserted/updated!");
          $scope.getEquiRunningHrsBijwasan();
        },function(){
          toasterService.openErrorToast("Record has been successfully inserted/updated!");
        })      
    }

    editableOptions.theme = 'bs3';
    editableThemes['bs3'].submitTpl = '<button type="submit" class="btn btn-primary btn-with-icon"><i class="ion-checkmark-round"></i></button>';
    editableThemes['bs3'].cancelTpl = '<button type="button" ng-click="$form.$cancel()" class="btn btn-default btn-with-icon"><i class="ion-close-round"></i></button>';
  }

})();
