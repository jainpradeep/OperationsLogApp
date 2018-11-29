angular.module('BlurAdmin.pages.bijwasan.lineFill').service('lineFillService', function ($http,$q) {
    this.message = '';
    this.getlineFillData = function(reqJSON){
        var deferred = $q.defer();

        $http.post('http://localhost:3006/getlineFillRecord',reqJSON,{
            headers : {
                'Content-Type' : 'application/json; charset=utf-8'
                    }
            }).
            success(function (data, status) {
              if(data.msg ===   "success"){
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
        $http.post('http://localhost:3006/editlineFillRecord',reqJSON,{
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