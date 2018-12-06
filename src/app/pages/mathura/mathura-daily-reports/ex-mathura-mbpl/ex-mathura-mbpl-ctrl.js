/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';
  angular.module('BlurAdmin.pages.mathura.mathura-daily-reports.ex-mathura-mbpl', ['ngAnimate', 'ngSanitize', 'ui.bootstrap'])
    .config(routeConfig)
    .controller('ex-mathura-mbpl-ctrl', TablesPageCtrl)
    .constant('_',
      window._
    );


    /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('main.mathura.mathura-daily-reports.ex-mathura-mbpl', {
        parent: "main.mathura.mathura-daily-reports",
        url: '/ex-mathura-mbpl',
        templateUrl: 'app/pages/mathura/mathura-daily-reports/ex-mathura-mbpl/ex-mathura-mbpl.html',
        controller: 'ex-mathura-mbpl-ctrl',
        title: 'Ex Mathura MBPL',
        sidebarMeta: {
          icon: 'ion-waterdrop',
          order: 0,
        },
        authenticate: true
      });
  }


 
  /** @ngInject */
  function TablesPageCtrl($scope,$rootScope, $http, $state, $filter, editableOptions, editableThemes, exMathuraMBPLService, $uibModal, $log, _, toasterService) {
    $rootScope.isAdmin = localStorage.getItem("isAdmin"); $rootScope.isShiftOfficer= localStorage.getItem("isShiftOfficer")
    $scope.products = ["6M","4M","4H","PN","PX","ATF","SKO","PCK","NSKO"]

    $scope.openRemarks = function(){
    $scope.remarksModal =  $uibModal.open({
        scope: $scope,
        templateUrl: "/app/pages/mathura/mathura-daily-reports/ex-mathura-mbpl/remarksmodal.html",
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
          templateUrl: "/app/pages/mathura/mathura-daily-reports/ex-mathura-mbpl/editHistoryModal.html",
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
    $scope.$parent.$parent.$watch('customDate', function(value){
      $scope.customDate = $scope.$parent.customDate;
      $scope.exMathuraMBPL = {};
      $scope.getexMathuraMBPL();
    });
    $scope.exMathuraMBPLSelectShift =function(shift){
      $scope.selectedShift = shift.name;
    } 
    
    $scope.addNewRecord = function(){
      $scope.exMathuraMBPL.exMathuraMBPLData.push({
        product:"",
        seq_no:"",
        tank_no:"",
        fmr:0,
        dip_qty:0,
      })
    }

    $scope.getexMathuraMBPL= function(){
      exMathuraMBPLService.getexMathuraMBPLData(JSON.stringify({
        date : $scope.customDate
      })).then(
        function(data) { 
          $scope.exMathuraMBPL.exMathuraMBPLData = JSON.parse(data.data.data)[0].data;
          $scope.exMathuraMBPL.exMathuraMBPLDate = JSON.parse(data.data.data)[0].date;
          $scope.exMathuraMBPL.exMathuraMBPLID = JSON.parse(data.data.data)[0]._id;
          $scope.exMathuraMBPL.exMathuraMBPLRemarks = JSON.parse(data.data.data)[0].remarks;
        },
        function(msg) {
        });
    }

    $scope.editexMathuraMBPLStart = function(data){
      $scope.editableexMathuraMBPLHourlyRec = angular.copy(data);
    }

    $scope.editexMathuraMBPLRemark = function(remark){
      
      $scope.exMathuraMBPL.exMathuraMBPLRemarks = remark 

      exMathuraMBPLService.editexMathuraMBPLData(JSON.stringify({
        _id : $scope.exMathuraMBPL.exMathuraMBPLID,
        date: $scope.exMathuraMBPL.exMathuraMBPLDate,
        data: $scope.exMathuraMBPL.exMathuraMBPLData,
        remarks: $scope.exMathuraMBPL.exMathuraMBPLRemarks
      })).then(function(){
        toasterService.openSucessToast("Record has been successfully inserted/updated!");
        $state.reload();
      },function(){
        toasterService.openErrorToast("Record has been successfully inserted/updated!");
      })  
    }

    $scope.editexMathuraMBPLData = function(data, index){
      data.editHistory = $scope.editableexMathuraMBPLHourlyRec;
      data.editedDate = new Date();
      data.officer = localStorage.getItem("username");
      exMathuraMBPLService.editexMathuraMBPLData(JSON.stringify({
          _id : $scope.exMathuraMBPL.exMathuraMBPLID,
          date: $scope.exMathuraMBPL.exMathuraMBPLDate,
          data: $scope.exMathuraMBPL.exMathuraMBPLData,
          remarks:  $scope.exMathuraMBPL.exMathuraMBPLRemarks
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
