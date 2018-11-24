angular.module('BlurAdmin.pages.bijwasan.pro-in-station-linefill').service('proInStationLinefillService', function ($http,$q) {
    this.message = '';
    this.getProInStationLinefillData = function(reqJSON){
        var deferred = $q.defer();

        $http.post('http://localhost:3006/getProductInStationLinefillRecord',reqJSON,{
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

    this.editProInStationLinefillData = function(reqJSON){
        var deferred = $q.defer();
        $http.post('http://localhost:3006/editProductInStationLinefillRecord',reqJSON,{
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