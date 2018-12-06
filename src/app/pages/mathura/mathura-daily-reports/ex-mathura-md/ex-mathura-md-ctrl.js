/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';
  angular.module('BlurAdmin.pages.mathura.mathura-daily-reports.ex-mathura-md', ['ngAnimate', 'ngSanitize', 'ui.bootstrap'])
    .config(routeConfig)
    .controller('ex-mathura-md-ctrl', TablesPageCtrl)
    .constant('_',
      window._
    );


    /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('main.mathura.mathura-daily-reports.ex-mathura-md', {
        parent: "main.mathura.mathura-daily-reports",
        url: '/ex-mathura-md',
        templateUrl: 'app/pages/mathura/mathura-daily-reports/ex-mathura-md/ex-mathura-md.html',
        controller: 'ex-mathura-md-ctrl',
        title: 'Ex Mathura MD',
        sidebarMeta: {
          icon: 'ion-waterdrop',
          order: 0,
        },
        authenticate: true
      });
  }


 
  /** @ngInject */
  function TablesPageCtrl($scope,$rootScope, $http,$state, $filter, editableOptions, editableThemes, exMathuraMDService, $uibModal, $log, _, toasterService) {
    $rootScope.isAdmin = localStorage.getItem("isAdmin"); $rootScope.isShiftOfficer= localStorage.getItem("isShiftOfficer")
    $scope.products = ["6M","4M","4H","PN","PX","ATF","SKO","PCK","NSKO"]

    $scope.openRemarks = function(){
    $scope.remarksModal =  $uibModal.open({
        scope: $scope,
        templateUrl: "/app/pages/mathura/mathura-daily-reports/ex-mathura-md/remarksmodal.html",
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
          templateUrl: "/app/pages/mathura/mathura-daily-reports/ex-mathura-md/editHistoryModal.html",
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
      $scope.exMathuraMD = {};
      $scope.getexMathuraMD();
    });
    $scope.exMathuraMDSelectShift =function(shift){
      $scope.selectedShift = shift.name;
    } 
    
    $scope.addNewRecord = function(){
      $scope.exMathuraMD.exMathuraMDData.push({
        product:"",
        seq_no:"",
        tank_no:"",
        fmr:0,
        dip_qty:0,
      })
    }

    $scope.getexMathuraMD= function(){
      exMathuraMDService.getexMathuraMDData(JSON.stringify({
        date : $scope.customDate
      })).then(
        function(data) { 
          $scope.exMathuraMD.exMathuraMDData = JSON.parse(data.data.data)[0].data;
          $scope.exMathuraMD.exMathuraMDDate = JSON.parse(data.data.data)[0].date;
          $scope.exMathuraMD.exMathuraMDID = JSON.parse(data.data.data)[0]._id;
          $scope.exMathuraMD.exMathuraMDRemarks = JSON.parse(data.data.data)[0].remarks;
        },
        function(msg) {
        });
    }

    $scope.editexMathuraMDStart = function(data){
      $scope.editableexMathuraMDHourlyRec = angular.copy(data);
    }

    $scope.editexMathuraMDRemark = function(remark){
      
      $scope.exMathuraMD.exMathuraMDRemarks = remark 

      exMathuraMDService.editexMathuraMDData(JSON.stringify({
        _id : $scope.exMathuraMD.exMathuraMDID,
        date: $scope.exMathuraMD.exMathuraMDDate,
        data: $scope.exMathuraMD.exMathuraMDData,
        remarks: $scope.exMathuraMD.exMathuraMDRemarks
      })).then(function(){
        toasterService.openSucessToast("Record has been successfully inserted/updated!");
        $state.reload();
      },function(){
        toasterService.openErrorToast("Record has been successfully inserted/updated!");
      })  
    }

    $scope.editexMathuraMDData = function(data, index){
      data.editHistory = $scope.editableexMathuraMDHourlyRec;
      data.editedDate = new Date();
      data.officer = localStorage.getItem("username");
      exMathuraMDService.editexMathuraMDData(JSON.stringify({
          _id : $scope.exMathuraMD.exMathuraMDID,
          date: $scope.exMathuraMD.exMathuraMDDate,
          data: $scope.exMathuraMD.exMathuraMDData,
          remarks:  $scope.exMathuraMD.exMathuraMDRemarks
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
