angular.module('BlurAdmin.pages.tikrikalan.remarks').service('tikrikalanRemarksService', function ($http,$q) {
    this.message = '';
    this.getremarksData = function(reqJSON){
        var deferred = $q.defer();

        $http.post('http://10.14.151.179:3006/getRemarksTikrikalanRecord',reqJSON,{
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

    this.editremarksData = function(reqJSON){
        var deferred = $q.defer();
        $http.post('http://10.14.151.179:3006/editRemarksTikrikalanRecord',reqJSON,{
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