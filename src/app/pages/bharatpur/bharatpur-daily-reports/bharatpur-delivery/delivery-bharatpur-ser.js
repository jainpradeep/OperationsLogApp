angular.module('BlurAdmin.pages.bharatpur.bharatpur-daily-reports.delivery-bharatpur').service('deliveryBharatpurService', function ($http,$q) {
    this.message = '';
    this.getdeliveryBharatpurData  = function(reqJSON){
        var deferred = $q.defer();

        $http.post('http://localhost:3006/getDeliveryBharatpur',reqJSON,{
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

    this.editdeliveryBharatpurData  = function(reqJSON){
        var deferred = $q.defer();
        $http.post('http://localhost:3006/editDeliveryBharatpur',reqJSON,{
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