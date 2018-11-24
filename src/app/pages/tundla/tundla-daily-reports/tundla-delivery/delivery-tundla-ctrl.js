/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';
  angular.module('BlurAdmin.pages.tundla.tundla-daily-reports.delivery-tundla', ['ngAnimate', 'ngSanitize', 'ui.bootstrap'])
    .config(routeConfig)
    .controller('tundla-daily-report-ctrl', TablesPageCtrl)
    .constant('_',
      window._
    );


    /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('main.tundla.tundla-daily-reports.delivery-tundla', {
        parent: "main.tundla.tundla-daily-reports",
        url: '/tundla-daily-reports',
        templateUrl: 'app/pages/tundla/tundla-daily-reports/tundla-delivery/delivery-tundla.html',
        controller: 'tundla-daily-report-ctrl',
        title: 'Tundla Daily Reports',
        sidebarMeta: {
          icon: 'ion-android-home',
          order: 0,
        },
        authenticate: true
      });
  }


 
  /** @ngInject */
  function TablesPageCtrl($scope,$rootScope, $http, $filter, editableOptions, editableThemes, deliveryTundlaService, $uibModal, $log, _) {
    $rootScope.isAdmin = localStorage.getItem("isAdmin")
    $scope.openRemarks = function(){
    $scope.remarksModal =  $uibModal.open({
        scope: $scope,
        templateUrl: "/app/pages/tundla/tundla-daily-reports/tundla-delivery/remarksmodal.html",
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
          templateUrl: "/app/pages/tundla/tundla-daily-reports/tundla-delivery/editHistoryModal.html",
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
      $scope.deliveryTundla = {};
      $scope.getdeliveryTundla();
    });
    $scope.deliveryTundlaSelectShift =function(shift){
      $scope.selectedShift = shift.name;
    } 
    
    $scope.getdeliveryTundla= function(){
      deliveryTundlaService.getdeliveryTundlaData(JSON.stringify({
        date : $scope.customDate
      })).then(
        function(data) { 
          $scope.deliveryTundla.deliveryTundlaData = JSON.parse(data.data.data)[0].data;
          $scope.deliveryTundla.deliveryTundlaDate = JSON.parse(data.data.data)[0].date;
          $scope.deliveryTundla.deliveryTundlaID = JSON.parse(data.data.data)[0]._id;
          $scope.deliveryTundla.deliveryTundlaRemarks = JSON.parse(data.data.data)[0].remarks;
        },
        function(msg) {
        });
    }

    $scope.editdeliveryTundlaStart = function(data){
      $scope.editabledeliveryTundlaHourlyRec = angular.copy(data);
    }

    $scope.editdeliveryTundlaRemark = function(remark){
      
      $scope.deliveryTundla.deliveryTundlaRemarks = remark 

      deliveryTundlaService.editdeliveryTundlaData(JSON.stringify({
        _id : $scope.deliveryTundla.deliveryTundlaID,
        date: $scope.deliveryTundla.deliveryTundlaDate,
        data: $scope.deliveryTundla.deliveryTundlaData,
        remarks: $scope.deliveryTundla.deliveryTundlaRemarks
      })).then(function(){
        $scope.getdeliveryTundla();
      },function(){
        console.log("error")
      })  
    }

    $scope.editdeliveryTundlaData = function(data, index){
      data.editHistory = $scope.editabledeliveryTundlaHourlyRec;
      data.editedDate = new Date();
      data.officer = localStorage.getItem("username");
      deliveryTundlaService.editdeliveryTundlaData(JSON.stringify({
          _id : $scope.deliveryTundla.deliveryTundlaID,
          date: $scope.deliveryTundla.deliveryTundlaDate,
          data: $scope.deliveryTundla.deliveryTundlaData,
          remarks:  $scope.deliveryTundla.deliveryTundlaRemarks
        })).then(function(){
          $scope.getdeliveryTundla();
        },function(){
          console.log("error")
        })      
    }

    editableOptions.theme = 'bs3';
    editableThemes['bs3'].submitTpl = '<button type="submit" class="btn btn-primary btn-with-icon"><i class="ion-checkmark-round"></i></button>';
    editableThemes['bs3'].cancelTpl = '<button type="button" ng-click="$form.$cancel()" class="btn btn-default btn-with-icon"><i class="ion-close-round"></i></button>';
  }

})();
