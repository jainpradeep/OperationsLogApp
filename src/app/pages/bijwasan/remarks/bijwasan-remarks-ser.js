angular.module('BlurAdmin.pages.bijwasan.remarks').service('bijwasanRemarksService', function ($http,$q) {
    this.message = '';
    this.getRemarksData = function(reqJSON){
        var deferred = $q.defer();

        $http.post('http://10.14.151.179:3006/getRemarksbijwasanRecord',reqJSON,{
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

    this.editRemarksData = function(reqJSON){
        var deferred = $q.defer();
        $http.post('http://10.14.151.179:3006/editRemarksbijwasanRecord',reqJSON,{
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