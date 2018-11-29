/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';
  angular.module('BlurAdmin.pages.bijwasan.lineFill', ['ngAnimate', 'ngSanitize', 'ui.bootstrap'])
    .config(routeConfig)
    .controller('lineFill-ctrl', TablesPageCtrl)
    .constant('_',
      window._
    );


    /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('main.bijwasan.lineFill', {
        parent: "main.bijwasan",
        url: '/lineFill',
        templateUrl: 'app/pages/bijwasan/lineFill/lineFill.html',
        controller: 'lineFill-ctrl',
        title: 'Line Fill ',
        sidebarMeta: {
          icon: 'ion-android-home',
          order: 0,
        },
        authenticate: true
      });
  }


 
  /** @ngInject */
  function TablesPageCtrl($scope,$rootScope, $http, $filter, editableOptions, editableThemes, lineFillService, $uibModal, $log, _, toasterService) {
    $rootScope.isAdmin = localStorage.getItem("isAdmin")
    $scope.openRemarks = function(){
    $scope.remarksModal =  $uibModal.open({
        scope: $scope,
        templateUrl: "/app/pages/bijwasan/lineFill/remarksmodal.html",
        size: '',
      })
    }
  
    $scope.editRemarksModal = function() {
      $scope.remarksModal.close();
    };
  
    $scope.cancelRemarksModal = function() {
      $scope.remarksModal.dismiss('cancel');
    };

    
    $scope.lineFillData = [{
      lineFillName : "Matura - Delhi",
      lineFillVolume : "17738",
      lineFill : [{
          product : "",
          volume : ""
      }]
    },{
      lineFillName : "Delhi-Tikri",
      lineFillVolume : "1882",
      lineFill : [{
          product : "",
          volume : ""
      }]
    },{
      lineFillName : "Tikri-Sonipat",
      lineFillVolume : "3125",
      lineFill : [{
          product : "",
          volume : ""
      }]
    },{
      lineFillName : "PNP-BIJ (ATF)",
      lineFillVolume : "5900",
      lineFill : [{
          product : "",
          volume : ""
      }]
    },{
      lineFillName : "Sonipat-Panipat",
      lineFillVolume : "6145",
      lineFill : [{
          product : "",
          volume : ""
      }]
    },{
      lineFillName : "Sonipat-Meerut",
      lineFillVolume : "3775",
      lineFill : [{
          product : "",
          volume : ""
      }]
    },{
      lineFillName : "-Bharatpur",
      lineFillVolume : "752",
      lineFill : [{
          product : "",
          volume : ""
      }]
    },{
      lineFillName : "-Tundla",
      lineFillVolume : "6995",
      lineFill : [{
          product : "",
          volume : ""
      }]
    }];


    
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
          templateUrl: "/app/pages/bijwasan/lineFill/lineFill.html",
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
      $scope.lineFill = {};
      //$scope.getlineFill();
    });
    $scope.lineFillSelectShift =function(shift){
      $scope.selectedShift = shift.name;
    } 
    
    $scope.getlineFill= function(){
      lineFillService.getlineFillData(JSON.stringify({
        date : $scope.customDate
      })).then(
        function(data) { 
          $scope.lineFill.lineFillData = JSON.parse(data.data.data)[0].data;
          $scope.lineFill.lineFillDate = JSON.parse(data.data.data)[0].date;
          $scope.lineFill.lineFillID = JSON.parse(data.data.data)[0]._id;
          $scope.lineFill.lineFillRemarks = JSON.parse(data.data.data)[0].remarks;
        },
        function(msg) {
        });
    }

    $scope.editlineFillStart = function(data){
      $scope.editablelineFillHourlyRec = angular.copy(data);
    }

    $scope.editlineFillRemark = function(remark){
      
      $scope.delhiExMRlineFill.lineFillRemarks[$scope.$parent.selectedShift.name] = remark 

      delExMrService.editlineFillData(JSON.stringify({
        _id : $scope.lineFill.lineFillID,
        date: $scope.lineFill.lineFillDate,
        data: $scope.lineFill.lineFillData,
        remarks: $scope.lineFill.lineFillRemarks
      })).then(function(){
        toasterService.openSucessToast("Record has been successfully inserted/updated!");
        $scope.getlineFill();
      },function(){
        toasterService.openErrorToast("Record has been successfully inserted/updated!");
      })  
    }

    $scope.editlineFillData = function(data, index){
      data.editHistory = $scope.editablelineFillHourlyRec;
      data.editedDate = new Date();
      data.officer = localStorage.getItem("username");
      lineFillService.editlineFillData(JSON.stringify({
          _id : $scope.lineFill.lineFillID,
          date: $scope.lineFill.lineFillDate,
          data: $scope.lineFill.lineFillData,
          remarks:  $scope.lineFill.lineFillRemarks
        })).then(function(){
          toasterService.openSucessToast("Record has been successfully inserted/updated!");
          $scope.getlineFill();
        },function(){
          toasterService.openErrorToast("Record has been successfully inserted/updated!");
        })      
    }

    editableOptions.theme = 'bs3';
    editableThemes['bs3'].submitTpl = '<button type="submit" class="btn btn-primary btn-with-icon"><i class="ion-checkmark-round"></i></button>';
    editableThemes['bs3'].cancelTpl = '<button type="button" ng-click="$form.$cancel()" class="btn btn-default btn-with-icon"><i class="ion-close-round"></i></button>';
  }

})();
