angular.module('BlurAdmin.pages.bharatpur.remarks').service('bharatpurRemarksService', function ($http,$q) {
    this.message = '';
    this.getremarksData = function(reqJSON){
        var deferred = $q.defer();

        $http.post('http://10.14.151.179:3006/getRemarksbharatpurRecord',reqJSON,{
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

    this.editremarksData = function(reqJSON){
        var deferred = $q.defer();
        $http.post('http://10.14.151.179:3006/editRemarksbharatpurRecord',reqJSON,{
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