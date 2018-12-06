angular.module('BlurAdmin.pages.bijwasan.del-ex-mr').service('delExMrService', function ($http,$q) {
    this.message = '';
    this.getDelExMrData = function(reqJSON){
        var deferred = $q.defer();

        $http.post('http://10.14.151.91:3006/getDelhiExMrRecord',reqJSON,{
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

    this.editDelExMrData = function(reqJSON){
        var deferred = $q.defer();
        $http.post('http://10.14.151.91:3006/editDelhiExMrRecord',reqJSON,{
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