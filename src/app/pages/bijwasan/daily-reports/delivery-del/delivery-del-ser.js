angular.module('BlurAdmin.pages.bijwasan.daily-reports.delivery-del').service('delhiDeliveryService', function ($http,$q) {
    this.message = '';
    this.getdelhiDeliveryData = function(reqJSON){
        var deferred = $q.defer();

        $http.post('http://localhost:3006/getDelhiDeliveryRecord',reqJSON,{
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

    this.editdelhiDeliveryData = function(reqJSON){
        var deferred = $q.defer();
        $http.post('http://localhost:3006/editDelhiDeliveryRecord',reqJSON,{
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