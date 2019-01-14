angular.module('BlurAdmin.pages.bijwasan.daily-reports.delivery-del-rev').service('delhiDeliveryRevService', function ($http,$q) {
    this.message = '';
    this.getdelhiDeliveryRevData = function(reqJSON){
        var deferred = $q.defer();

        $http.post('http://10.14.151.179:3006/getDelhiDeliveryRevRecord',reqJSON,{
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

    this.editdelhiDeliveryRevData = function(reqJSON){
        var deferred = $q.defer();
        $http.post('http://10.14.151.179:3006/editDelhiDeliveryRevRecord',reqJSON,{
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