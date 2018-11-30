angular.module('BlurAdmin.pages.bijwasan.bijwasan-product-planning').service('bijwasanProductPlanningService', function ($http,$q) {
    this.message = '';
    this.getBijwasanProductPlanningData = function(reqJSON){
        var deferred = $q.defer();

        $http.post('http://localhost:3006/getBijwasanProductPlanningData',reqJSON,{
            headers : {
                'Content-Type' : 'application/json; charset=utf-8'
                    }
            }).
            success(function (data, status) {
              if(data.msg === "success"){
                deferred.resolve({
                    data: data});
                }
            }).
            error(function (msg, status) {
                deferred.reject(msg);
            });
       return deferred.promise;
    }

    this.editBijwasanProductPlanningData = function(reqJSON){
        var deferred = $q.defer();
        $http.post('http://localhost:3006/editBijwasanProductPlanningData',reqJSON,{
            headers : {
                'Content-Type' : 'application/json; charset=utf-8'
            }
          }).
          success(function (data, status) {
            console.log("upadate Successful")
            deferred.resolve({
                data: data});
          }).
          error(function (msg, status) {
            deferred.reject(msg);
        });
        return deferred.promise;
    }
});