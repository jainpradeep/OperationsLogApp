/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';
  angular.module('BlurAdmin.pages.bijwasan.pumpedFromMathura-MD', ['ngAnimate', 'ngSanitize', 'ui.bootstrap'])
    .config(routeConfig)
    .controller('pumpedFromMathura-MD-ctrl', TablesPageCtrl)
    .constant('_',
      window._
    );


    /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('main.bijwasan.pumpedFromMathura-MD', {
        parent: "main.bijwasan",
        url: '/pumpedFromMathura-MD',
        templateUrl: 'app/pages/bijwasan/pumpedFromMathura-MD/pumpedFromMathura-MD.html',
        controller: 'pumpedFromMathura-MD-ctrl',
        title: 'Pumped From Mathura [MD]',
        sidebarMeta: {
          icon: 'ion-android-home',
          order: 0,
        },
        authenticate: true
      });
  }


 
  /** @ngInject */
  function TablesPageCtrl($scope,$rootScope, $http, $filter, editableOptions, editableThemes, pumpedFromMatMDService, $uibModal, $log, _) {
    $rootScope.isAdmin = localStorage.getItem("isAdmin")
    $scope.openRemarks = function(){
    $scope.remarksModal =  $uibModal.open({
        scope: $scope,
        templateUrl: "/app/pages/bijwasan/pumpedFromMathura-MD/remarksmodal.html",
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
          templateUrl: "/app/pages/bijwasan/pumpedFromMathura-MD/editHistoryModal.html",
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
      $scope.pumpedFromMathuraMD = {};
      $scope.getpumpedFromMathuraMD();
    });
    $scope.pumpedFromMathuraMDSelectShift =function(shift){
      $scope.selectedShift = shift.name;
    } 
    
    $scope.getpumpedFromMathuraMD= function(){
      pumpedFromMatMDService.getpumpedFromMatMDData(JSON.stringify({
        date : $scope.customDate
      })).then(
        function(data) { 
          $scope.pumpedFromMathuraMD.pumpedFromMatMDData = JSON.parse(data.data.data)[0].data;
          $scope.pumpedFromMathuraMD.pumpedFromMatMDDate = JSON.parse(data.data.data)[0].date;
          $scope.pumpedFromMathuraMD.pumpedFromMatMDID = JSON.parse(data.data.data)[0]._id;
          $scope.pumpedFromMathuraMD.pumpedFromMatMDRemarks = JSON.parse(data.data.data)[0].remarks;
        },
        function(msg) {
        });
    }

    $scope.editpumpedFromMathuraMDStart = function(data){
      $scope.editablepumpedFromMathuraMDHourlyRec = angular.copy(data);
    }

    $scope.editpumpedFromMathuraMDRemark = function(remark){
      
      $scope.delhiExMRpumpedFromMathuraMD.pumpedFromMatMDRemarks[$scope.$parent.selectedShift.name] = remark 

      delExMrService.editpumpedFromMatMDData(JSON.stringify({
        _id : $scope.pumpedFromMathuraMD.pumpedFromMatMDID,
        date: $scope.pumpedFromMathuraMD.pumpedFromMatMDDate,
        data: $scope.pumpedFromMathuraMD.pumpedFromMatMDData,
        remarks: $scope.pumpedFromMathuraMD.pumpedFromMatMDRemarks
      })).then(function(){
        $scope.getpumpedFromMathuraMD();
      },function(){
        console.log("error")
      })  
    }

    $scope.editpumpedFromMatMDData = function(data, index){
      data.editHistory = $scope.editablepumpedFromMathuraMDHourlyRec;
      data.editedDate = new Date();
      data.officer = localStorage.getItem("username");
      pumpedFromMatMDService.editpumpedFromMatMDData(JSON.stringify({
          _id : $scope.pumpedFromMathuraMD.pumpedFromMatMDID,
          date: $scope.pumpedFromMathuraMD.pumpedFromMatMDDate,
          data: $scope.pumpedFromMathuraMD.pumpedFromMatMDData,
          remarks:  $scope.pumpedFromMathuraMD.pumpedFromMatMDRemarks
        })).then(function(){
          $scope.getpumpedFromMathuraMD();
        },function(){
          console.log("error")
        })      
    }

    editableOptions.theme = 'bs3';
    editableThemes['bs3'].submitTpl = '<button type="submit" class="btn btn-primary btn-with-icon"><i class="ion-checkmark-round"></i></button>';
    editableThemes['bs3'].cancelTpl = '<button type="button" ng-click="$form.$cancel()" class="btn btn-default btn-with-icon"><i class="ion-close-round"></i></button>';
  }

})();
