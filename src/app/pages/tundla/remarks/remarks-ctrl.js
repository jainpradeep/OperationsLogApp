/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';
  angular.module('BlurAdmin.pages.tundla.remarks', ['ngAnimate', 'ngSanitize', 'ui.bootstrap'])
    .config(routeConfig)
    .controller('remarks-ctrl', TablesPageCtrl)
    .constant('_',
      window._
    );


    /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('main.tundla.remarks', {
        parent: "main.tundla",
        url: '/remarks',
        templateUrl: 'app/pages/tundla/remarks/remarks.html',
        controller: 'remarks-ctrl',
        title: 'Remarks',
        sidebarMeta: {
          icon: 'ion-android-home',
          order: 0,
        },
        authenticate: true
      });
  }


 
  /** @ngInject */
  function TablesPageCtrl($scope,$rootScope, $http, $filter, editableOptions, editableThemes, remarksService, $uibModal, $log, _) {
    $rootScope.isAdmin = localStorage.getItem("isAdmin")
    $scope.selectedShift = "Shift A";
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
          templateUrl: "/app/pages/tundla/remarks/editHistoryModal.html",
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
      $scope.remarks = {};
      $scope.getremarks();
    });
    $scope.remarksSelectShift =function(shift){
      $scope.selectedShift = shift.name;
    } 
    
    $scope.getremarks= function(){
      remarksService.getremarksData(JSON.stringify({
        date : $scope.customDate
      })).then(
        function(data) { 
          $scope.remarks.remarksData = JSON.parse(data.data.data)[0].data;
          $scope.remarks.remarksDate = JSON.parse(data.data.data)[0].date;
          $scope.remarks.remarksID = JSON.parse(data.data.data)[0]._id;
        },
        function(msg) {
        });
    }

    $scope.editremarksStart = function(data){
      $scope.editableremarksHourlyRec = angular.copy(data);
    }

    $scope.editremarksData = function(data, index){
      data.editHistory = $scope.editableremarksHourlyRec;
      data.editedDate = new Date();
      data.officer = localStorage.getItem("username");
      remarksService.editremarksData(JSON.stringify({
          _id : $scope.remarks.remarksID,
          date: $scope.remarks.remarksDate,
          data: $scope.remarks.remarksData,
        })).then(function(){
          $scope.getremarks();
        },function(){
          console.log("error")
        })      
    }

    editableOptions.theme = 'bs3';
    editableThemes['bs3'].submitTpl = '<button type="submit" class="btn btn-primary btn-with-icon"><i class="ion-checkmark-round"></i></button>';
    editableThemes['bs3'].cancelTpl = '<button type="button" ng-click="$form.$cancel()" class="btn btn-default btn-with-icon"><i class="ion-close-round"></i></button>';
  }

})();
