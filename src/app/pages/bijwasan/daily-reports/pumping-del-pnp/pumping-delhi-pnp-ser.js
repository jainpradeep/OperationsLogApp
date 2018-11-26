angular.module('BlurAdmin.pages.bijwasan.daily-reports.pumping-delhi-pnp').service('PumpingDelhiPnpService', function ($http,$q) {
    this.message = '';
    this.getPumpingDelhiPnpData = function(reqJSON){
        var deferred = $q.defer();

        $http.post('http://10.14.151.91:3006/getPumpingDelhiPnpRecord',reqJSON,{
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

    this.editPumpingDelhiPnpData = function(reqJSON){
        var deferred = $q.defer();
        $http.post('http://10.14.151.91:3006/editPumpingDelhiPnpRecord',reqJSON,{
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