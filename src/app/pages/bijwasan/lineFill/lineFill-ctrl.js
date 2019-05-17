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
    )


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
    $rootScope.isAdmin = localStorage.getItem("isAdmin"); $rootScope.isShiftOfficer= localStorage.getItem("isShiftOfficer")
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

    $scope.addNewRecord = function(data){
      data.push({
        product:"",
        volume : ""
      })
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
          templateUrl: "/app/pages/bijwasan/lineFill/editHistoryModal.html",
          size: '',
        })
      };
      
      $scope.ok = function() {
          $scope.$modalInstance.close();
      };
      
      $scope.cancel = function() {
          $scope.$modalInstance.dismiss('cancel');
      };
      $scope.$parent.lineFillTotal =0
    $scope.selectedShift = "Shift A";
    $scope.customDate = $scope.$parent.customDate;
    $scope.selectedShiftTrimmed = $scope.selectedShift.replace(' ','');
    $scope.$parent.$watch('customDate', function(value){
      $scope.tomorrowDate = new Date(angular.copy($scope.$parent.customDate).setDate($scope.$parent.customDate.getDate() + 1));
      $scope.customDate = $scope.$parent.customDate;
      var today = new Date();
      var myToday = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0);
      $scope.currentShift =  ($scope.$parent.customDate >= myToday) ? (new Date().getHours() < 7 ? "ShiftC" : new Date().getHours() < 14 ? "ShiftA" : "ShiftB") : "ShiftC" ;
      $scope.lineFill = {};
      $scope.getlineFill();
    });
    $scope.lineFillSelectShift =function(shift){
      $scope.selectedShift = shift.name;
      $scope.selectedShiftTrimmed = $scope.selectedShift.replace(' ','');
      $scope.rowform.$cancel()
    } 
    
    $scope.getlineFill= function(){
      lineFillService.getlineFillData(JSON.stringify({
        date : $scope.customDate
      })).then(
        function(data) { 
          $scope.lineFill.lineFillData = JSON.parse(data.data.data)[0].data
          // .map(function(collection) {
          //   return collection.lineFill.reduce(function(result, item) {
              
          //     angular.forEach(item, function(value, index) {
          //       result[index] = result[index] || [];
          //       result[index].push(value);
          //     });
              
          //     return result;
          //   }, {});
          // });
          $scope.lineFill.lineFillDate = JSON.parse(data.data.data)[0].date;
          $scope.lineFill.lineFillID = JSON.parse(data.data.data)[0]._id;
          $scope.lineFill.lineFillRemarks = JSON.parse(data.data.data)[0].remarks;
        },
        function(msg) {
        });
    }

    $scope.editlineFillStart = function(data,rowform){
      $scope.editablelineFillRec = angular.copy(data);
      $scope.rowform = rowform;
    }

    $scope.sumLineFill = function(line){
      line.lineFillSum = 0;
      line.lineFill.map(function(prd){
        line.lineFillSum = Number(line.lineFillSum) + Number(prd.volume); 
        return prd;
      })
      var diff = line.lineFillSum - line.lineFillVolume
      line.style = { "color" : diff > 0 ? "red" : diff < 0 ? "yellow": "DeepSkyBlue"}
      return Number(diff)
    }

    $scope.editlineFillRemark = function(remark){
      
      $scope.lineFill.lineFillRemarks[$scope.selectedShift] = remark 

      lineFillService.editlineFillData(JSON.stringify({
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
      data.editHistory = $scope.editablelineFillRec;
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
