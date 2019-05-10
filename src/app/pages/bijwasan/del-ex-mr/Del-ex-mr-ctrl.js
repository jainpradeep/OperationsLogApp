/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';
  angular.module('BlurAdmin.pages.bijwasan.del-ex-mr', ['ngAnimate', 'ngSanitize', 'ui.bootstrap'])
    .config(routeConfig)
    .controller('Del-ex-mr-ctrl', TablesPageCtrl)
    .constant('_',
      window._
    );


    /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('main.bijwasan.del-ex-mr', {
        parent: "main.bijwasan",
        url: '/del-ex-mr',
        templateUrl: 'app/pages/bijwasan/del-ex-mr/del-ex-mr.html',
        controller: 'Del-ex-mr-ctrl',
        title: 'Delhi [EX-MR]',
        sidebarMeta: {
          icon: 'ion-waterdrop',
          order: 0,
        },
        authenticate: true
      });
  }


 
  /** @ngInject */
  function TablesPageCtrl($scope,$rootScope, $http, $filter, editableOptions, editableThemes, delExMrService, $uibModal, $log, _, toasterService) {
    $rootScope.isAdmin = localStorage.getItem("isAdmin"); $rootScope.isShiftOfficer= localStorage.getItem("isShiftOfficer")
    $scope.currentIndex = -1;
    $scope.openRemarks = function(){
    $scope.remarksModal =  $uibModal.open({
        scope: $scope,
        templateUrl: "/app/pages/bijwasan/del-ex-mr/remarksmodal.html",
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
          templateUrl: "/app/pages/bijwasan/del-ex-mr/editHistoryModal.html",
          size: '',
        })
      };

      $scope.calcFlowDiff = function(data){
        if(data.position==0)
          return Number($scope.delhiExMR.mathuraYesterdayPumpedData[24].fmr) - Number($scope.delhiExMR.mathuraYesterdayPumpedData[23].fmr)  - (Number(data.flowRateDelivery) + Number(data.flowRatePumping))
        else
          return Number($scope.delhiExMR.mathuraPumpedData[data.position].fmr) - Number($scope.delhiExMR.mathuraPumpedData[data.position -1].fmr)  - (Number(data.flowRateDelivery) + Number(data.flowRatePumping))
      }
      
      $scope.ok = function() {
          $scope.$modalInstance.close();
      };
      
      $scope.cancel = function() {
          $scope.$modalInstance.dismiss('cancel');
      };
    
      $scope.selectedShift =  $scope.$parent.selectedShift
    $scope.$parent.$watch('customDate', function(value){
      $scope.customDate = $scope.$parent.customDate;
      $scope.delhiExMR = {};
      $scope.getDelhiExMR();
    });
    $scope.delhiExmrSelectShift =function(shift){
      $scope.selectedShift = shift.name;
      $scope.$parent.selectedShift = shift.name;
    } 
    
    $scope.getDelhiExMR= function(){
      delExMrService.getDelExMrData(JSON.stringify({
        date : $scope.customDate
      })).then(
        function(data) { 
          $scope.delhiExMR.delExmrData = JSON.parse(data.data.data).items[1].data;
          $scope.delhiExMR.mathuraPumpedData = JSON.parse(data.data.data).mathuraItems[1].data;
          $scope.delhiExMR.mathuraYesterdayPumpedData = JSON.parse(data.data.data).mathuraItems[0].data;
          $scope.delhiExMR.delExmrDate = JSON.parse(data.data.data).items[1].date;
          $scope.delhiExMR.delExmrID = JSON.parse(data.data.data).items[1]._id;
          $scope.delhiExMR.delExMrRemarks = JSON.parse(data.data.data).items[1].remarks;
        },
        function(msg) {
        });
    }

    $scope.editDelhiExMrStart = function(data){
      $scope.editableDelhiExMrHourlyRec = angular.copy(data);
    }

    $scope.editDelhiExMrRemark = function(remark){
      
      $scope.delhiExMR.delExMrRemarks[$scope.$parent.selectedShift] = remark 

      delExMrService.editDelExMrData(JSON.stringify({
        _id : $scope.delhiExMR.delExmrID,
        date: $scope.delhiExMR.delExmrDate,
        data: $scope.delhiExMR.delExmrData,
        remarks: $scope.delhiExMR.delExMrRemarks
      })).then(function(){
        toasterService.openSucessToast("Record has been successfully inserted/updated!");
        $scope.getDelhiExMR();
      },function(){
        toasterService.openErrorToast("Insert/update failed!");
      })  
    }
    $scope.delExMrCopy = function($index){
      $index=Number($index);
      $scope.delhiExMR.delExmrData[$index +1].product=$scope.delhiExMR.delExmrData[$index].product;
      $scope.delhiExMR.delExmrData[$index +1].seq_no=$scope.delhiExMR.delExmrData[$index].seq_no;
      $scope.delhiExMR.delExmrData[$index +1].density=$scope.delhiExMR.delExmrData[$index].density;
      $scope.delhiExMR.delExmrData[$index +1].temperature=$scope.delhiExMR.delExmrData[$index].temperature;
      $scope.delhiExMR.delExmrData[$index +1].fmr=$scope.delhiExMR.delExmrData[$index].fmr;
      $scope.delhiExMR.delExmrData[$index +1].pumpingBypass=$scope.delhiExMR.delExmrData[$index].pumpingBypass;
      $scope.delhiExMR.delExmrData[$index +1].tank_no=$scope.delhiExMR.delExmrData[$index].tank_no;
      $scope.delhiExMR.delExmrData[$index +1].tank_dip=$scope.delhiExMR.delExmrData[$index].tank_dip;
       $scope.editDelExMrData($scope.delhiExMR.delExmrData[$index +1],$index+1);
    }
    $scope.editDelExMrData = function(data, index){
      data.editHistory = $scope.editableDelhiExMrHourlyRec;
      data.editedDate = new Date();
      data.officer = localStorage.getItem("username");
      delExMrService.editDelExMrData(JSON.stringify({
          _id : $scope.delhiExMR.delExmrID,
          date: $scope.delhiExMR.delExmrDate,
          data: $scope.delhiExMR.delExmrData,
          remarks:  $scope.delhiExMR.delExMrRemarks
        })).then(function(){
          toasterService.openSucessToast("Record has been successfully inserted/updated!");
          $scope.getDelhiExMR();
        },function(){
          toasterService.openErrorToast("Insert/Update fail!");
        })      
    }

    editableOptions.theme = 'bs3';
    editableThemes['bs3'].submitTpl = '<button type="submit" class="btn btn-primary btn-with-icon"><i class="ion-checkmark-round"></i></button>';
    editableThemes['bs3'].cancelTpl = '<button type="button" ng-click="$form.$cancel()" class="btn btn-default btn-with-icon"><i class="ion-close-round"></i></button>';
  }

})();
