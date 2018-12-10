/**
 * @shutdownthor v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';
  angular.module('BlurAdmin.pages.mathura.shutdown', ['ngAnimate', 'ngSanitize', 'ui.bootstrap'])
    .config(routeConfig)
    .controller('shutdown-ctrl', TablesPageCtrl)
    .constant('_',
      window._
    );


    /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('main.mathura.shutdown', {
        parent: "main.mathura.mathura-daily-reports",
        url: '/shutdown',
        templateUrl: 'app/pages/mathura/shutdown/shutdown.html',
        controller: 'shutdown-ctrl',
        title: 'ShutDown',
        sidebarMeta: {
          icon: 'ion-waterdrop',
          order: 0,
        },
        authenticate: true
      });
  }


 
  /** @ngInject */
  function TablesPageCtrl($scope,$rootScope, $http,$state, $filter, editableOptions, editableThemes, shutdownService, $uibModal, $log, _, toasterService) {
    $rootScope.isAdmin = localStorage.getItem("isAdmin"); 
    $rootScope.isShiftOfficer= localStorage.getItem("isShiftOfficer")
    $scope.totalShutDown = 0;
  
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
          templateUrl: "/app/pages/mathura/shutdown/editHistoryModal.html",
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
      $scope.shutdown = {};
      $scope.getshutdown();
    });
    $scope.shutdownSelectShift =function(shift){
      $scope.selectedShift = shift.name;
    } 
    
    $scope.addNewRecord = function(){
      $scope.shutdown.shutdownData.push({
        from : "",
        to : "",
        duration : "",
        accountingDivision : "",
        reason : ""
      })
    }

    $scope.getshutdown= function(){
      shutdownService.getshutdownData(JSON.stringify({
        date : $scope.customDate
      })).then(
        function(data) { 
          $scope.shutdown.shutdownData = JSON.parse(data.data.data)[0].data;
          $scope.shutdown.shutdownDate = JSON.parse(data.data.data)[0].date;
          $scope.shutdown.shutdownID = JSON.parse(data.data.data)[0]._id;
        },
        function(msg) {
        });
    }


    $scope.editshutdownStart = function(data){
      $scope.editableshutdownHourlyRec = angular.copy(data);
    }

    $scope.editshutdownRemark = function(remark){
      
      $scope.shutdown.shutdownRemarks = remark 

      shutdownService.editshutdownData(JSON.stringify({
        _id : $scope.shutdown.shutdownID,
        date: $scope.shutdown.shutdownDate,
        data: $scope.shutdown.shutdownData,
      })).then(function(){
        toasterService.openSucessToast("Record has been successfully inserted/updated!");
        $state.reload();
      },function(){
        toasterService.openErrorToast("Record has been successfully inserted/updated!");
      })  
    }

    $scope.editshutdownData = function(data, index){
      data.editHistory = $scope.editableshutdownHourlyRec;
      data.editedDate = new Date();
      data.officer = localStorage.getItem("username");
      shutdownService.editshutdownData(JSON.stringify({
          _id : $scope.shutdown.shutdownID,
          date: $scope.shutdown.shutdownDate,
          data: $scope.shutdown.shutdownData,
        })).then(function(){
          toasterService.openSucessToast("Record has been successfully inserted/updated!");
          $state.reload();
        },function(){
          toasterService.openErrorToast("Record has been successfully inserted/updated!");
        })      
    }
    $scope.formattedTimeDiff = function(shutdownData){
      var from = new Date(shutdownData.from)
      var to = new Date(shutdownData.to)
      if(from && to && from < to){
      var diff = to.getTime()-from.getTime();
        $scope.totalShutDown = $scope.totalShutDown + diff;
        return Math.floor((Math.round((diff)/60000))/60) + " hrs " + (Math.round((diff)/60000))%60 + " mins";
      }
      else if(from > to){
          var midnight = angular.copy(from)
          midnight.setHours(23);
          midnight.setMinutes(59);
          midnight.setSeconds(59);

          to.setDate(to.getDate()+1)            
      
          var nextDayInit =  angular.copy(to)
          nextDayInit.setHours(0);
          nextDayInit.setMinutes(0);
          nextDayInit.setSeconds(0);
      
          var diff = midnight.getTime()-from.getTime() + to.getTime()-nextDayInit.getTime(); 
          $scope.totalShutDown = $scope.totalShutDown + diff;
          return Math.floor((Math.round(diff)/60000)/60) + " hrs " + Math.round(diff/60000)%60 + " mins";
        }
  }

  $scope.calculateTotalShutDown = function(){
    var temp = $scope.totalShutDown;
    $scope.totalShutDown =0;
    return Math.floor((Math.round((temp)/60000))/60) + " hrs " + (Math.round((temp)/60000))%60 + " mins";
  }

    editableOptions.theme = 'bs3';
    editableThemes['bs3'].submitTpl = '<button type="submit" class="btn btn-primary btn-with-icon"><i class="ion-checkmark-round"></i></button>';
    editableThemes['bs3'].cancelTpl = '<button type="button" ng-click="$form.$cancel()" class="btn btn-default btn-with-icon"><i class="ion-close-round"></i></button>';
  }

})();
