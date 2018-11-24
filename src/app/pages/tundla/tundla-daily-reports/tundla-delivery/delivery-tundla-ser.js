angular.module('BlurAdmin.pages.tundla.tundla-daily-reports.delivery-tundla').service('deliveryTundlaService', function ($http,$q) {
    this.message = '';
    this.getdeliveryTundlaData  = function(reqJSON){
        var deferred = $q.defer();

        $http.post('http://localhost:3006/getDeliveryTundla',reqJSON,{
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

    this.editdeliveryTundlaData  = function(reqJSON){
        var deferred = $q.defer();
        $http.post('http://localhost:3006/editDeliveryTundla',reqJSON,{
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