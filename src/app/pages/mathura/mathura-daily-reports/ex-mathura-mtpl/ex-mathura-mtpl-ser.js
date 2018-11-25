angular.module('BlurAdmin.pages.mathura.mathura-daily-reports.ex-mathura-mtpl').service('exMathuraMTPLService', function ($http,$q) {
    this.message = '';
    this.getexMathuraMTPLData  = function(reqJSON){
        var deferred = $q.defer();

        $http.post('http://localhost:3006/getExMathuraMtpl',reqJSON,{
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

    this.editexMathuraMTPLData  = function(reqJSON){
        var deferred = $q.defer();
        $http.post('http://localhost:3006/editExMathuraMtpl',reqJSON,{
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