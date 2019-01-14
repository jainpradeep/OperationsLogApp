angular.module('BlurAdmin.pages.bijwasan.target-tracker').service('targetTrackerService', function ($http,$q) {
    this.message = '';
    this.getTargetTrackerData = function(reqJSON){
        var deferred = $q.defer();

        $http.post('http://10.14.151.179:3006/getTargets',reqJSON,{
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

    this.editTargetTrackerData = function(reqJSON){
        var deferred = $q.defer();
        $http.post('http://10.14.151.179:3006/editTargets',reqJSON,{
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