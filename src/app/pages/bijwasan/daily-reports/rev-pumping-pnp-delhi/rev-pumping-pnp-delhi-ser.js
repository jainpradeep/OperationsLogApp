angular.module('BlurAdmin.pages.bijwasan.daily-reports.rev-pumping-pnp-delhi').service('revPumpingPnpDelhiService', function ($http,$q) {
    this.message = '';
    this.getRevPumpingPnpDelhiData = function(reqJSON){
        var deferred = $q.defer();

        $http.post('http://10.14.151.179:3006/getRevPumpingPnpDelhiRecord',reqJSON,{
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

    this.editrevPumpingPnpDelhiData = function(reqJSON){
        var deferred = $q.defer();
        $http.post('http://10.14.151.179:3006/editRevPumpingPnpDelhiRecord',reqJSON,{
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