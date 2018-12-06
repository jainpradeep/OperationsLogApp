angular.module('BlurAdmin.pages.meerut.meerut-daily-reports.delivery-meerut').service('deliveryMeerutService', function ($http,$q) {
    this.message = '';
    this.getdeliveryMeerutData  = function(reqJSON){
        var deferred = $q.defer();

        $http.post('http://10.14.151.91:3006/getDeliveryMeerut',reqJSON,{
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

    this.editdeliveryMeerutData  = function(reqJSON){
        var deferred = $q.defer();
        $http.post('http://10.14.151.91:3006/editDeliveryMeerut',reqJSON,{
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