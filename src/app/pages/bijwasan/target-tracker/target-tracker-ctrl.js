/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';
  angular.module('BlurAdmin.pages.bijwasan.target-tracker', ['ngAnimate', 'ngSanitize', 'ui.bootstrap'])
    .config(routeConfig)  
    .controller('target-tracker-ctrl', targetTrackerPageCtrl)
    .constant('_',
      window._
    )

    /** @ngInject */
    function routeConfig($stateProvider) {
      $stateProvider
        .state('main.bijwasan.target-tracker', {
          url: '/target-tracker',
          templateUrl: 'app/pages/bijwasan/target-tracker/target-tracker.html',
          title: 'Target Tracker',
          controller: 'target-tracker-ctrl',
          sidebarMeta: {
            icon: '',
            order: 0,
          },
          authenticate: true
        });
    }

    /** @ngInject */
  function targetTrackerPageCtrl($scope,$rootScope, $http, $filter, editableOptions, editableThemes, targetTrackerService, $uibModal, $log, _, toasterService) {
    $rootScope.isAdmin = localStorage.getItem("isAdmin"); $rootScope.isShiftOfficer= localStorage.getItem("isShiftOfficer")

    $scope.targets = [{name: "Yearly", isSelected : true, index : 0},{name: "Monthly", index : 1}, {name: "psaTarget", index : 1}]
            
    $scope.selectedTarget = $scope.targets[0] ;
    $scope.selectTarget = function(target){
        $scope.targets.map(function(trgt){
            trgt.isSelected = false
            return trgt;
        })
        $scope.selectedTarget = target
        target.isSelected = true;
    }
    
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
          templateUrl: "/app/pages/bijwasan/target-tracker/editHistoryModal.html",
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
      $scope.targetTracker = {};
      $scope.gettargetTracker();
    });
    
    $scope.gettargetTracker= function(){
      targetTrackerService.getTargetTrackerData(JSON.stringify({
        date : $scope.customDate
      })).then(
        function(data) { 
          $scope.targetTracker.targetTrackerData = JSON.parse(data.data.data)[0].targets;
          $scope.targetTracker.targetTrackerDate = JSON.parse(data.data.data)[0].date;
          $scope.targetTracker.targetTrackerID = JSON.parse(data.data.data)[0]._id;
        },
        function(msg) {
        });
    }

    $scope.edittargetTrackerStart = function(data){
      $scope.editabletargetTrackerRec = angular.copy(data);
    }

    $scope.edittargetTrackerData = function(data, index){
      data.editHistory = $scope.editabletargetTrackerRec;
      data.editedDate = new Date();
      data.officer = localStorage.getItem("username");
      targetTrackerService.editTargetTrackerData(JSON.stringify({
          _id : $scope.targetTracker.targetTrackerID,
          date: $scope.targetTracker.targetTrackerDate,
          targets: $scope.targetTracker.targetTrackerData,
          remarks:  $scope.targetTracker.targetTrackerRemarks
        })).then(function(){
          toasterService.openSucessToast("Record has been successfully inserted/updated!");
          $scope.gettargetTracker();
        },function(){
          toasterService.openErrorToast("Record has been successfully inserted/updated!");
        })      
    }

    editableOptions.theme = 'bs3';
    editableThemes['bs3'].submitTpl = '<button type="submit" class="btn btn-primary btn-with-icon"><i class="ion-checkmark-round"></i></button>';
    editableThemes['bs3'].cancelTpl = '<button type="button" ng-click="$form.$cancel()" class="btn btn-default btn-with-icon"><i class="ion-close-round"></i></button>';
  }

})();
