/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';
  angular.module('BlurAdmin.pages.mathura.monitoring-mt-mb-mdpl', ['ngAnimate', 'ngSanitize', 'ui.bootstrap'])
    .config(routeConfig)
    .controller('monitoring-mt-mb-mdpl-ctrl', TablesPageCtrl)
    .constant('_',
      window._
    );


    /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('main.mathura.monitoring-mt-mb-mdpl', {
        parent: "main.mathura",
        url: '/monitoring-mt-mb-mdpl',
        templateUrl: 'app/pages/mathura/monitoring-mt-mb-mdpl/monitoring-mt-mb-mdpl.html',
        controller: 'monitoring-mt-mb-mdpl-ctrl',
        title: 'Monitoring Of MT,MB & MDPL',
        sidebarMeta: {
          icon: 'ion-waterdrop',
          order: 0,
        },
        authenticate: true
      });
  }


 
  /** @ngInject */
  function TablesPageCtrl($scope,$rootScope, $http, $filter, editableOptions, editableThemes, monMtMbMdplService, $uibModal, $log, _, toasterService) {
    $rootScope.isAdmin = localStorage.getItem("isAdmin")
    $scope.openRemarks = function(){
    $scope.remarksModal =  $uibModal.open({
        scope: $scope,
        templateUrl: "/app/pages/mathura/monitoring-mt-mb-mdpl/remarksmodal.html",
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
          templateUrl: "/app/pages/mathura/monitoring-mt-mb-mdpl/editHistoryModal.html",
          size: '',
        })
      };
      
      $scope.ok = function() {
          $scope.$modalInstance.close();
      };
      
      $scope.cancel = function() {
          $scope.$modalInstance.dismiss('cancel');
      };
    
    $scope.selectedShift =  $scope.$parent.selectedShift
    $scope.$parent.$watch('customDate', function(value){
      $scope.customDate = $scope.$parent.customDate;
      $scope.monitoringMtMbMdpl = {};
      $scope.getMonitoringMtMbMdpl();
    });
    $scope.monitoringMtMbMdplSelectShift =function(shift){
      $scope.selectedShift = shift.name;
      $scope.$parent.selectedShift = shift.name;
    } 
    
    $scope.getMonitoringMtMbMdpl= function(){
      monMtMbMdplService.getMonMtMbMdplData(JSON.stringify({
        date : $scope.customDate
      })).then(
        function(data) { 
          $scope.monitoringMtMbMdpl.monMtMbMdplData = JSON.parse(data.data.data)[0].data;
          $scope.monitoringMtMbMdpl.monMtMbMdplDate = JSON.parse(data.data.data)[0].date;
          $scope.monitoringMtMbMdpl.monMtMbMdplID = JSON.parse(data.data.data)[0]._id;
          $scope.monitoringMtMbMdpl.monMtMbMdplRemarks = JSON.parse(data.data.data)[0].remarks;
        },
        function(msg) {
        });
    }

    $scope.editMonitoringMtMbMdplStart = function(data){
      $scope.editableMonitoringMtMbMdplHourlyRec = angular.copy(data);
    }

    $scope.editMonitoringMtMbMdplRemark = function(remark){
      
      $scope.monitoringMtMbMdpl.monMtMbMdplRemarks[$scope.$parent.selectedShift.name] = remark 

      delExMrService.editDelExMrData(JSON.stringify({
        _id : $scope.monitoringMtMbMdpl.monMtMbMdplID,
        date: $scope.monitoringMtMbMdpl.monMtMbMdplDate,
        data: $scope.monitoringMtMbMdpl.monMtMbMdplData,
        remarks: $scope.monitoringMtMbMdpl.monMtMbMdplRemarks
      })).then(function(){
        toasterService.openSucessToast("Record has been successfully inserted/updated!");
        $scope.getMonitoringMtMbMdpl();
      },function(){
        toasterService.openErrorToast("Record has been successfully inserted/updated!");
      })  
    }

    $scope.editMonMtMbMdplData = function(data, index){
      data.editHistory = $scope.editableMonitoringMtMbMdplHourlyRec;
      data.editedDate = new Date();
      data.officer = localStorage.getItem("username");
      monMtMbMdplService.editMonMtMbMdplData(JSON.stringify({
          _id : $scope.monitoringMtMbMdpl.monMtMbMdplID,
          date: $scope.monitoringMtMbMdpl.monMtMbMdplDate,
          data: $scope.monitoringMtMbMdpl.monMtMbMdplData,
          remarks:  $scope.monitoringMtMbMdpl.monMtMbMdplRemarks
        })).then(function(){
          toasterService.openSucessToast("Record has been successfully inserted/updated!");
          $scope.getMonitoringMtMbMdpl();
        },function(){
          toasterService.openErrorToast("Record has been successfully inserted/updated!");
        })      
    }

    editableOptions.theme = 'bs3';
    editableThemes['bs3'].submitTpl = '<button type="submit" class="btn btn-primary btn-with-icon"><i class="ion-checkmark-round"></i></button>';
    editableThemes['bs3'].cancelTpl = '<button type="button" ng-click="$form.$cancel()" class="btn btn-default btn-with-icon"><i class="ion-close-round"></i></button>';
  }

})();
