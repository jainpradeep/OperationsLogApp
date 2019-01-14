angular.module('BlurAdmin.pages.bijwasan.sko-lbt-pumping').service('skoLbtPumpingService', function ($http,$q) {
    this.message = '';
    this.getSkoLbtPumpingData = function(reqJSON){
        var deferred = $q.defer();

        $http.post('http://10.14.151.179:3006/getSkoLbtPumpingRecord',reqJSON,{
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

    this.editSkoLbtPumpingData = function(reqJSON){
        var deferred = $q.defer();
        $http.post('http://10.14.151.179:3006/editSkoLbtPumpingRecord',reqJSON,{
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