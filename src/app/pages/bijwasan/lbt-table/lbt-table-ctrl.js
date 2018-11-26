/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';
  angular.module('BlurAdmin.pages.bijwasan.lbt-table', ['ngAnimate', 'ngSanitize', 'ui.bootstrap'])
    .config(routeConfig)
    .controller('lbt-table-ctrl', TablesPageCtrl)
    .constant('_',
      window._
    );


    /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('main.bijwasan.lbt-table', {
        parent: "main.bijwasan",
        url: '/lbt-table',
        templateUrl: 'app/pages/bijwasan/lbt-table/lbt-table.html',
        controller: 'lbt-table-ctrl',
        title: 'LBT Details',
        sidebarMeta: {
          icon: 'ion-android-home',
          order: 0,
        },
        authenticate: true
      });
  }


 
  /** @ngInject */
  function TablesPageCtrl($scope,$rootScope, $http, $filter, editableOptions, editableThemes, lbtTabService, $uibModal, $log, _) {
    $rootScope.isAdmin = localStorage.getItem("isAdmin")
    $scope.openRemarks = function(){
    $scope.remarksModal =  $uibModal.open({
        scope: $scope,
        templateUrl: "/app/pages/bijwasan/lbt-table/remarksmodal.html",
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
          templateUrl: "/app/pages/bijwasan/lbt-table/editHistoryModal.html",
          size: '',
        })
      };
      
      $scope.ok = function() {
          $scope.$modalInstance.close();
      };
      
      $scope.cancel = function() {
          $scope.$modalInstance.dismiss('cancel');
      };
    
    $scope.selectedLbt = "LBT 01";
    $scope.$parent.$watch('customDate', function(value){
      $scope.customDate = $scope.$parent.customDate;
      $scope.lbtTable = {};
      $scope.getLbtTable();
    });
    $scope.lbtTableSelectLbt =function(lbt){
      $scope.selectedLbt = lbt.name;
    } 
    
    $scope.getLbtTable= function(){
      lbtTabService.getLbtTabData(JSON.stringify({
        date : $scope.customDate
      })).then(
        function(data) { 
          $scope.lbtTable.lbtTabData = JSON.parse(data.data.data)[0].data;
          $scope.lbtTable.lbtTabDate = JSON.parse(data.data.data)[0].date;
          $scope.lbtTable.lbtTabID = JSON.parse(data.data.data)[0]._id;
          $scope.lbtTable.lbtTabRemarks = JSON.parse(data.data.data)[0].remarks;
        },
        function(msg) {
        });
    }

    $scope.editLbtTableStart = function(data){
      $scope.editableLbtTableHourlyRec = angular.copy(data);
    }

    $scope.editLbtTableRemark = function(remark){
      
      $scope.lbtTable.lbtTabRemarks[$scope.$parent.selectedLbt.name] = remark 

      lbtTabService.editLbtTabData(JSON.stringify({
        _id : $scope.lbtTable.lbtTabID,
        date: $scope.lbtTable.lbtTabDate,
        data: $scope.lbtTable.lbtTabData,
        remarks: $scope.lbtTable.lbtTabRemarks
      })).then(function(){
        $scope.getLbtTable();
      },function(){
        toasterService.openErrorToast("Record has been successfully inserted/updated!");
      })  
    }

    $scope.editLbtTabData = function(data, index){
      data.editHistory = $scope.editableLbtTableHourlyRec;
      data.editedDate = new Date();
      data.officer = localStorage.getItem("username");
      lbtTabService.editLbtTabData(JSON.stringify({
          _id : $scope.lbtTable.lbtTabID,
          date: $scope.lbtTable.lbtTabDate,
          data: $scope.lbtTable.lbtTabData,
          remarks:  $scope.lbtTable.lbtTabRemarks
        })).then(function(){
          $scope.getLbtTable();
        },function(){
          toasterService.openErrorToast("Record has been successfully inserted/updated!");
        })      
    }

    editableOptions.theme = 'bs3';
    editableThemes['bs3'].submitTpl = '<button type="submit" class="btn btn-primary btn-with-icon"><i class="ion-checkmark-round"></i></button>';
    editableThemes['bs3'].cancelTpl = '<button type="button" ng-click="$form.$cancel()" class="btn btn-default btn-with-icon"><i class="ion-close-round"></i></button>';
  }

})();
