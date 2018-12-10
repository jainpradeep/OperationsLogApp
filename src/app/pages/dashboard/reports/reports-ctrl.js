(function () {
    'use strict';
    angular.module('BlurAdmin.pages.dashboard')
      .controller('lineFill-ctrl', TablesPageCtrl)
      .constant('_',
        window._
      )
   
    /** @ngInject */
    function TablesPageCtrl($scope,$rootScope, $http, $filter, editableOptions, editableThemes, lineFillService, $uibModal, $log, _, toasterService) {
      $rootScope.isAdmin = localStorage.getItem("isAdmin"); $rootScope.isShiftOfficer= localStorage.getItem("isShiftOfficer")
      $scope.$parent.lineFillTotal =0
      $scope.selectedShift = "Shift A";
      $scope.selectedShiftTrimmed = $scope.selectedShift.replace(' ','');
      $scope.$parent.$watch('customDate', function(value){
        $scope.customDate = $scope.$parent.customDate;
        $scope.lineFill = {};
        $scope.getlineFill();
      });
      $scope.lineFillSelectShift =function(shift){
        $scope.selectedShift = shift.name;
        $scope.selectedShiftTrimmed = $scope.selectedShift.replace(' ','');
      } 
      
      $scope.getlineFill= function(){
        lineFillService.getlineFillData(JSON.stringify({
          date : $scope.customDate
        })).then(
          function(data) { 
            $scope.lineFill.lineFillData = JSON.parse(data.data.data)[0].data
            $scope.lineFill.lineFillDate = JSON.parse(data.data.data)[0].date;
            $scope.lineFill.lineFillID = JSON.parse(data.data.data)[0]._id;
            $scope.lineFill.lineFillRemarks = JSON.parse(data.data.data)[0].remarks;
          },
          function(msg) {
          });
      }
  
    
      $scope.sumLineFill = function(line){
        line.lineFillSum = 0;
        line.lineFill.map(function(prd){
          line.lineFillSum = Number(line.lineFillSum) + Number(prd.volume); 
          return prd;
        })
        var diff = line.lineFillSum - line.lineFillVolume
        line.style = { "color" : diff > 0 ? "red" : diff < 0 ? "yellow": "green"}
        return diff
      }
      editableOptions.theme = 'bs3';
      editableThemes['bs3'].submitTpl = '<button type="submit" class="btn btn-primary btn-with-icon"><i class="ion-checkmark-round"></i></button>';
      editableThemes['bs3'].cancelTpl = '<button type="button" ng-click="$form.$cancel()" class="btn btn-default btn-with-icon"><i class="ion-close-round"></i></button>';
    }
  
  })();
  