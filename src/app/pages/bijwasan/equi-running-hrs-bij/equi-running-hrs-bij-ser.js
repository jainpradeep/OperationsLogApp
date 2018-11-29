angular.module('BlurAdmin.pages.bijwasan.equi-running-hrs-bij').service('equiRunningHrsBijService', function ($http,$q) {
    this.message = '';
    this.getEquiRunningHrsBijData = function(reqJSON){
        var deferred = $q.defer();

        $http.post('http://10.14.151.91:3006/getEquiRunningHrsBijwasanRecord',reqJSON,{
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

    this.editEquiRunningHrsBijData = function(reqJSON){
        var deferred = $q.defer();
        $http.post('http://10.14.151.91:3006/editEquiRunningHrsBijwasanRecord',reqJSON,{
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