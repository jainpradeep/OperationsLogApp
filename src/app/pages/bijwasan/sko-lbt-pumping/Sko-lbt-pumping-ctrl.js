/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';
  angular.module('BlurAdmin.pages.bijwasan.sko-lbt-pumping', ['ngAnimate', 'ngSanitize', 'ui.bootstrap'])
    .config(routeConfig)  
    .controller('Sko-lbt-pumping-ctrl', SkoLbtPumpingPageCtrl)
    .constant('_',
      window._
    )

    /** @ngInject */
    function routeConfig($stateProvider) {
      $stateProvider
        .state('main.bijwasan.sko-lbt-pumping', {
          url: '/sko-lbt-pumping',
          templateUrl: 'app/pages/bijwasan/sko-lbt-pumping/sko-lbt-pumping.html',
          title: 'SKO-LBT-Pumping',
          controller: 'Sko-lbt-pumping-ctrl',
          sidebarMeta: {
            icon: '',
            order: 0,
          },
          authenticate: true
        });
    }

    /** @ngInject */
  function SkoLbtPumpingPageCtrl($scope,$rootScope, $http, $filter, editableOptions, editableThemes, skoLbtPumpingService, $uibModal, $log, _, toasterService) {
    $rootScope.isAdmin = localStorage.getItem("isAdmin")
    $scope.openRemarks = function(){
    $scope.remarksModal =  $uibModal.open({
        scope: $scope,
        templateUrl: "/app/pages/bijwasan/sko-lbt-pumping/remarksmodal.html",
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
          templateUrl: "/app/pages/bijwasan/sko-lbt-pumping/editHistoryModal.html",
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
      $scope.skoLbtPumping = {};
      $scope.getSkoLbtPumping();
    });
    $scope.skoLbtPumpingSelectShift =function(shift){
      $scope.selectedShift = shift.name;
      $scope.$parent.selectedShift = shift.name;
    } 
    
    $scope.getSkoLbtPumping= function(){
      skoLbtPumpingService.getSkoLbtPumpingData(JSON.stringify({
        date : $scope.customDate
      })).then(
        function(data) { 
          $scope.skoLbtPumping.skoLbtPumpingData = JSON.parse(data.data.data)[0].data;
          $scope.skoLbtPumping.skoLbtPumpingDate = JSON.parse(data.data.data)[0].date;
          $scope.skoLbtPumping.skoLbtPumpingID = JSON.parse(data.data.data)[0]._id;
          $scope.skoLbtPumping.skoLbtPumpingRemarks = JSON.parse(data.data.data)[0].remarks;
        },
        function(msg) {
        });
    }

    $scope.editSkoLbtPumpingStart = function(data){
      $scope.editableSkoLbtPumpingHourlyRec = angular.copy(data);
    }

    $scope.editSkoLbtPumpingRemark = function(remark){
      
      $scope.skoLbtPumping.skoLbtPumpingRemarks[$scope.$parent.selectedShift.name] = remark 

      skoLbtPumpingService.editSkoLbtPumpingData(JSON.stringify({
        _id : $scope.skoLbtPumping.skoLbtPumpingID,
        date: $scope.skoLbtPumping.skoLbtPumpingDate,
        data: $scope.skoLbtPumping.skoLbtPumpingData,
        remarks: $scope.skoLbtPumping.skoLbtPumpingRemarks
      })).then(function(){
        toasterService.openSucessToast("Record has been successfully inserted/updated!");
        $scope.getSkoLbtPumping();
      },function(){
        toasterService.openErrorToast("Record has been successfully inserted/updated!");
      })  
    }

    $scope.editSkoLbtPumpingData = function(data, index){
      data.editHistory = $scope.editableSkoLbtPumpingHourlyRec;
      data.editedDate = new Date();
      data.officer = localStorage.getItem("username");
      skoLbtPumpingService.editSkoLbtPumpingData(JSON.stringify({
          _id : $scope.skoLbtPumping.skoLbtPumpingID,
          date: $scope.skoLbtPumping.skoLbtPumpingDate,
          data: $scope.skoLbtPumping.skoLbtPumpingData,
          remarks:  $scope.skoLbtPumping.skoLbtPumpingRemarks
        })).then(function(){
          toasterService.openSucessToast("Record has been successfully inserted/updated!");
          $scope.getSkoLbtPumping();
        },function(){
          toasterService.openErrorToast("Record has been successfully inserted/updated!");
        })      
    }

    editableOptions.theme = 'bs3';
    editableThemes['bs3'].submitTpl = '<button type="submit" class="btn btn-primary btn-with-icon"><i class="ion-checkmark-round"></i></button>';
    editableThemes['bs3'].cancelTpl = '<button type="button" ng-click="$form.$cancel()" class="btn btn-default btn-with-icon"><i class="ion-close-round"></i></button>';
  }

})();
