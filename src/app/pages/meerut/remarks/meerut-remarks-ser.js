angular.module('BlurAdmin.pages.meerut.remarks').service('meerutRemarksService', function ($http,$q) {
    this.message = '';
    this.getremarksData = function(reqJSON){
        var deferred = $q.defer();

        $http.post('http://localhost:3006/getRemarksMeerutRecord',reqJSON,{
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
        $http.post('http://localhost:3006/editRemarksMeerutRecord',reqJSON,{
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