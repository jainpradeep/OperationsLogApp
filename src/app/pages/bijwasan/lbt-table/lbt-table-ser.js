angular.module('BlurAdmin.pages.bijwasan.lbt-table').service('lbtTabService', function ($http,$q) {
    this.message = '';
    this.getLbtTabData = function(reqJSON){
        var deferred = $q.defer();

        $http.post('http://localhost:3006/getLbtTableRecord',reqJSON,{
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

    this.editLbtTabData = function(reqJSON){
        var deferred = $q.defer();
        $http.post('http://localhost:3006/editLbtTableRecord',reqJSON,{
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