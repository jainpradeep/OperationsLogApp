/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';
  angular.module('BlurAdmin.pages.bijwasan.del-ex-pr', ['ngAnimate', 'ngSanitize', 'ui.bootstrap'])
    .config(routeConfig)
    .controller('Del-ex-pr-ctrl', TablesPageCtrl)
    .constant('_',
      window._
    );


    /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('main.bijwasan.del-ex-pr', {
        parent: "main.bijwasan",
        url: '/del-ex-pr',
        templateUrl: 'app/pages/bijwasan/del-ex-pr/del-ex-pr.html',
        controller: 'Del-ex-pr-ctrl',
        title: 'Delhi [EX-PR]',
        sidebarMeta: {
          icon: 'ion-waterdrop',
          order: 0,
        },
        authenticate: true
      });
  }


 
  /** @ngInject */
  function TablesPageCtrl($scope,$rootScope, $http, $filter, editableOptions, editableThemes, delExPrService, $uibModal, $log, _, toasterService) {
    $rootScope.isAdmin = localStorage.getItem("isAdmin")
    $scope.openRemarks = function(){
    $scope.remarksModal =  $uibModal.open({
        scope: $scope,
        templateUrl: "/app/pages/bijwasan/del-ex-pr/remarksmodal.html",
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
          templateUrl: "/app/pages/bijwasan/del-ex-pr/editHistoryModal.html",
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
      $scope.delhiExPR = {};
      $scope.getDelhiExPR();
    });
    $scope.delhiExprSelectShift =function(shift){
      $scope.selectedShift = shift.name;
      $scope.$parent.selectedShift = shift.name;
    } 
    
    $scope.getDelhiExPR= function(){
      delExPrService.getDelExPrData(JSON.stringify({
        date : $scope.customDate
      })).then(
        function(data) { 
          $scope.delhiExPR.delExprData = JSON.parse(data.data.data)[0].data;
          $scope.delhiExPR.delExprDate = JSON.parse(data.data.data)[0].date;
          $scope.delhiExPR.delExprID = JSON.parse(data.data.data)[0]._id;
          $scope.delhiExPR.delExPrRemarks = JSON.parse(data.data.data)[0].remarks;
        },
        function(msg) {
        });
    }

    $scope.editDelhiExPrStart = function(data){
      $scope.editableDelhiExPrHourlyRec = angular.copy(data);
    }

    $scope.editDelhiExPrRemark = function(remark){
      
      $scope.delhiExPR.delExPrRemarks[$scope.$parent.selectedShift.name] = remark 

      delExPrService.editDelExPrData(JSON.stringify({
        _id : $scope.delhiExPR.delExprID,
        date: $scope.delhiExPR.delExprDate,
        data: $scope.delhiExPR.delExprData,
        remarks: $scope.delhiExPR.delExPrRemarks
      })).then(function(){
        toasterService.openSucessToast("Record has been successfully inserted/updated!");
        $scope.getDelhiExPR();
      },function(){
        toasterService.openErrorToast("Record has been successfully inserted/updated!");
      })  
    }

    $scope.editDelExPrData = function(data, index){
      data.editHistory = $scope.editableDelhiExPrHourlyRec;
      data.editedDate = new Date();
      data.officer = localStorage.getItem("username");
      delExPrService.editDelExPrData(JSON.stringify({
          _id : $scope.delhiExPR.delExprID,
          date: $scope.delhiExPR.delExprDate,
          data: $scope.delhiExPR.delExprData,
          remarks:  $scope.delhiExPR.delExPrRemarks
        })).then(function(){
          toasterService.openSucessToast("Record has been successfully inserted/updated!");
          $scope.getDelhiExPR();
        },function(){
          toasterService.openErrorToast("Record has been successfully inserted/updated!");
        })      
    }

    editableOptions.theme = 'bs3';
    editableThemes['bs3'].submitTpl = '<button type="submit" class="btn btn-primary btn-with-icon"><i class="ion-checkmark-round"></i></button>';
    editableThemes['bs3'].cancelTpl = '<button type="button" ng-click="$form.$cancel()" class="btn btn-default btn-with-icon"><i class="ion-close-round"></i></button>';
  }

})();
