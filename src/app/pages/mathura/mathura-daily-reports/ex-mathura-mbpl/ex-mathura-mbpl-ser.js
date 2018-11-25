angular.module('BlurAdmin.pages.mathura.mathura-daily-reports.ex-mathura-mbpl').service('exMathuraMBPLService', function ($http,$q) {
    this.message = '';
    this.getexMathuraMBPLData  = function(reqJSON){
        var deferred = $q.defer();

        $http.post('http://localhost:3006/getExMathuraMbpl',reqJSON,{
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

    this.editexMathuraMBPLData  = function(reqJSON){
        var deferred = $q.defer();
        $http.post('http://localhost:3006/editExMathuraMbpl',reqJSON,{
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