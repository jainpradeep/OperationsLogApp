angular.module('BlurAdmin.pages.bijwasan.daily-reports.Delivery-Pnp').service('DeliveryPnpService', function ($http,$q) {
    this.message = '';
    this.getDeliveryPnpData = function(reqJSON){
        var deferred = $q.defer();

        $http.post('http://10.14.151.179:3006/getDeliveryPnpRecord',reqJSON,{
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

    this.editDeliveryPnpData = function(reqJSON){
        var deferred = $q.defer();
        $http.post('http://10.14.151.179:3006/editDeliveryPnpRecord',reqJSON,{
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