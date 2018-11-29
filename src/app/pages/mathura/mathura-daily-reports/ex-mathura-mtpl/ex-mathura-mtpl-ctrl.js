/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';
  angular.module('BlurAdmin.pages.mathura.mathura-daily-reports.ex-mathura-mtpl', ['ngAnimate', 'ngSanitize', 'ui.bootstrap'])
    .config(routeConfig)
    .controller('ex-mathura-mtpl-ctrl', TablesPageCtrl)
    .constant('_',
      window._
    );


    /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('main.mathura.mathura-daily-reports.ex-mathura-mtpl', {
        parent: "main.mathura.mathura-daily-reports",
        url: '/ex-mathura-mtpl',
        templateUrl: 'app/pages/mathura/mathura-daily-reports/ex-mathura-mtpl/ex-mathura-mtpl.html',
        controller: 'ex-mathura-mtpl-ctrl',
        title: 'Ex Mathura MTPL',
        sidebarMeta: {
          icon: 'ion-waterdrop',
          order: 0,
        },
        authenticate: true
      });
  }


 
  /** @ngInject */
  function TablesPageCtrl($scope,$rootScope, $http,$state, $filter, editableOptions, editableThemes, exMathuraMTPLService, $uibModal, $log, _, toasterService) {
    $rootScope.isAdmin = localStorage.getItem("isAdmin")
    $scope.products = ["6M","4M","4H","PN","PX","ATF","SKO","PCK","NSKO"]

    $scope.openRemarks = function(){
    $scope.remarksModal =  $uibModal.open({
        scope: $scope,
        templateUrl: "/app/pages/mathura/mathura-daily-reports/ex-mathura-mtpl/remarksmodal.html",
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
          templateUrl: "/app/pages/mathura/mathura-daily-reports/ex-mathura-mtpl/editHistoryModal.html",
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
      $scope.exMathuraMTPL = {};
      $scope.getexMathuraMTPL();
    });
    $scope.exMathuraMTPLSelectShift =function(shift){
      $scope.selectedShift = shift.name;
    } 
    
    $scope.addNewRecord = function(){
      $scope.exMathuraMTPL.exMathuraMTPLData.push({
        product:"",
        seq_no:"",
        tank_no:"",
        fmr:0,
        dip_qty:0,
      })
    }

    $scope.getexMathuraMTPL= function(){
      exMathuraMTPLService.getexMathuraMTPLData(JSON.stringify({
        date : $scope.customDate
      })).then(
        function(data) { 
          $scope.exMathuraMTPL.exMathuraMTPLData = JSON.parse(data.data.data)[0].data;
          $scope.exMathuraMTPL.exMathuraMTPLDate = JSON.parse(data.data.data)[0].date;
          $scope.exMathuraMTPL.exMathuraMTPLID = JSON.parse(data.data.data)[0]._id;
          $scope.exMathuraMTPL.exMathuraMTPLRemarks = JSON.parse(data.data.data)[0].remarks;
        },
        function(msg) {
        });
    }

    $scope.editexMathuraMTPLStart = function(data){
      $scope.editableexMathuraMTPLHourlyRec = angular.copy(data);
    }

    $scope.editexMathuraMTPLRemark = function(remark){
      
      $scope.exMathuraMTPL.exMathuraMTPLRemarks = remark 

      exMathuraMTPLService.editexMathuraMTPLData(JSON.stringify({
        _id : $scope.exMathuraMTPL.exMathuraMTPLID,
        date: $scope.exMathuraMTPL.exMathuraMTPLDate,
        data: $scope.exMathuraMTPL.exMathuraMTPLData,
        remarks: $scope.exMathuraMTPL.exMathuraMTPLRemarks
      })).then(function(){
        toasterService.openSucessToast("Record has been successfully inserted/updated!");
        $state.reload();
      },function(){
        toasterService.openErrorToast("Record has been successfully inserted/updated!");
      })  
    }

    $scope.editexMathuraMTPLData = function(data, index){
      data.editHistory = $scope.editableexMathuraMTPLHourlyRec;
      data.editedDate = new Date();
      data.officer = localStorage.getItem("username");
      exMathuraMTPLService.editexMathuraMTPLData(JSON.stringify({
          _id : $scope.exMathuraMTPL.exMathuraMTPLID,
          date: $scope.exMathuraMTPL.exMathuraMTPLDate,
          data: $scope.exMathuraMTPL.exMathuraMTPLData,
          remarks:  $scope.exMathuraMTPL.exMathuraMTPLRemarks
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
