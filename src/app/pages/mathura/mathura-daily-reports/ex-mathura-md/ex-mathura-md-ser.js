angular.module('BlurAdmin.pages.mathura.mathura-daily-reports.ex-mathura-md').service('exMathuraMDService', function ($http,$q) {
    this.message = '';
    this.getexMathuraMDData  = function(reqJSON){
        var deferred = $q.defer();

        $http.post('http://10.14.151.91:3006/getExMathuraMd',reqJSON,{
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

    this.editexMathuraMDData  = function(reqJSON){
        var deferred = $q.defer();
        $http.post('http://10.14.151.91:3006/editExMathuraMd',reqJSON,{
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