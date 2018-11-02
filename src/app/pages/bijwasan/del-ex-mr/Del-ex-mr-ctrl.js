/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';
  angular.module('BlurAdmin.pages.bijwasan.del-ex-mr', [])
    .config(routeConfig)
    .controller('Del-ex-mr-ctrl', TablesPageCtrl);

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
          icon: 'ion-android-home',
          order: 0,
        },
        authenticate: true
      });
  }
 
  /** @ngInject */
  function TablesPageCtrl($scope, $http, $filter, editableOptions, editableThemes) {
    
    $scope.getDelhiExMR= function(){
      $http.post('http://localhost:3006/getDelhiExMrRecord',JSON.stringify($scope.reqParams),{
        headers : {
            'Content-Type' : 'application/json; charset=utf-8'
                }
        }).
        success(function (data, status) {
          if(data.msg === "success"){
            $scope.delExmrData = data.data.data;
            $scope.delExmrDate = data.data.date;
            $scope.delExmrID = data.data._id;
          }
        }).
        error(function (data, status) {
        });
    }
    $scope.getDelhiExMR();
    $scope.editDelhiExMrRecord = function(hourEntry, index){
      $scope.delExmrData[index] = hourEntry;
      $http.post('http://localhost:3006/editDelhiExMrRecord',angular.toJson({
        _id : $scope.delExmrID,
        date: $scope.delExmrDate,
        data: $scope.delExmrData
      }),{
        headers : {
            'Content-Type' : 'application/json; charset=utf-8'
        }
      }).
      success(function (data, status) {
        console.log("upadate Successful")
        if(data.msg === "success")
          $scope.getDelhiExMR();
      }).
      error(function (data, status) {
      })
    }

    editableOptions.theme = 'bs3';
    editableThemes['bs3'].submitTpl = '<button type="submit" class="btn btn-primary btn-with-icon"><i class="ion-checkmark-round"></i></button>';
    editableThemes['bs3'].cancelTpl = '<button type="button" ng-click="$form.$cancel()" class="btn btn-default btn-with-icon"><i class="ion-close-round"></i></button>';
  }

})();
