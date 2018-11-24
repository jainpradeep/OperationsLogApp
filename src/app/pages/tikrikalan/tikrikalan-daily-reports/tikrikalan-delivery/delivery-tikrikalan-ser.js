angular.module('BlurAdmin.pages.tikrikalan.tikrikalan-daily-reports.delivery-tikrikalan').service('deliveryTikrikalanService', function ($http,$q) {
    this.message = '';
    this.getdeliveryTikrikalanData  = function(reqJSON){
        var deferred = $q.defer();

        $http.post('http://10.14.151.91:3006/getDeliveryTikrikalan',reqJSON,{
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

    this.editdeliveryTikrikalanData  = function(reqJSON){
        var deferred = $q.defer();
        $http.post('http://10.14.151.91:3006/editDeliveryTikrikalan',reqJSON,{
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