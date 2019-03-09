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
    $rootScope.isAdmin = localStorage.getItem("isAdmin"); $rootScope.isShiftOfficer= localStorage.getItem("isShiftOfficer")
    $scope.openRemarks = function(){
    $scope.remarksModal =  $uibModal.open({
        scope: $scope,
        templateUrl: "/app/pages/bijwasan/equi-running-hrs-bij/remarksmodal.html",
        size: '',
      })
    }
    $scope.Math = window.Math;
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
      $scope.equiRunningHrsBijwasan.equipSum = [{
        "BP 1" : 0,
        "BP 2" : 0,
        "MP 1" : 0,
        "MP 2" : 0,
        "MP 3" : 0,
        "DG SET" : 0,
        "FFE" : 0,
        "FFM" : 0,
        "SUMP PUMP" : 0,
        "S/R PUMP" : 0,
        "OWS PUMP" : 0
      },{
        "BP 1" : 0,
        "BP 2" : 0,
        "MP 1" : 0,
        "MP 2" : 0,
        "MP 3" : 0,
        "DG SET" : 0,
        "FFE" : 0,
        "FFM" : 0,
        "SUMP PUMP" : 0,
        "S/R PUMP" : 0,
        "OWS PUMP" : 0
      }]
    });
    
    $scope.getEquiRunningHrsBijwasan= function(){
      $scope.equiRunningHrsBijwasan.equipSum = [{
        "BP 1" : 0,
        "BP 2" : 0,
        "MP 1" : 0,
        "MP 2" : 0,
        "MP 3" : 0,
        "DG SET" : 0,
        "FFE" : 0,
        "FFM" : 0,
        "SUMP PUMP" : 0,
        "S/R PUMP" : 0,
        "OWS PUMP" : 0
      },{
        "BP 1" : 0,
        "BP 2" : 0,
        "MP 1" : 0,
        "MP 2" : 0,
        "MP 3" : 0,
        "DG SET" : 0,
        "FFE" : 0,
        "FFM" : 0,
        "SUMP PUMP" : 0,
        "S/R PUMP" : 0,
        "OWS PUMP" : 0
      }];

      equiRunningHrsBijService.getEquiRunningHrsBijData(JSON.stringify({
        date : $scope.customDate
      })).then(
        function(data) { 
          var monthlyData = JSON.parse(data.data.data)
          $scope.equiRunningHrsBijwasan.equiRunningHrsBijData = monthlyData[monthlyData.length-1].data;
          $scope.equiRunningHrsBijwasan.equiRunningHrsBijDate = monthlyData[monthlyData.length-1].date;
          $scope.equiRunningHrsBijwasan.equiRunningHrsBijID = monthlyData[monthlyData.length-1]._id;
          $scope.equiRunningHrsBijwasan.equiRunningHrsBijRemarks = monthlyData[monthlyData.length-1].remarks;

          $scope.equiRunningHrsBijwasan.equipSum = monthlyData.reduce(function(cumalativeRunHrs,dayData){
            dayData.data.map(function(equipData){
              var shiftA = {
                hrs : equipData.shiftAHH,
                mins:  equipData.shiftAMM
              }
              var shiftB ={
                hrs: equipData.shiftBHH,
                mins:  equipData.shiftBMM
              }
              var shiftC = {
                hrs: equipData.shiftCHH,
                mins:  equipData.shiftCMM
              }
              
              var minSum = (!isNaN(shiftA.mins)?shiftA.mins:0) + (!isNaN(shiftB.mins)?shiftB.mins:0) + (!isNaN(shiftC.mins)?shiftC.mins:0)
              var cumalativeSum = parseFloat((!isNaN(shiftA.hrs)?shiftA.hrs:0) + (!isNaN(shiftB.hrs)?shiftB.hrs:0) + (!isNaN(shiftC.hrs)?shiftC.hrs:0)) + parseFloat(minSum)/60.0
              
              cumalativeRunHrs[0][equipData.equipment] = angular.copy(cumalativeRunHrs[1][equipData.equipment]);
              cumalativeRunHrs[1][equipData.equipment] = angular.copy(cumalativeRunHrs[1][equipData.equipment]) + (cumalativeSum ? cumalativeSum : 0);
              return equipData;
            })
            return cumalativeRunHrs;
          },$scope.equiRunningHrsBijwasan.equipSum)        
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
