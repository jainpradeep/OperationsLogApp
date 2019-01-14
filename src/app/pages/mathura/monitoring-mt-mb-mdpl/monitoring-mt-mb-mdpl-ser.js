angular.module('BlurAdmin.pages.mathura.monitoring-mt-mb-mdpl').service('monMtMbMdplService', function ($http,$q) {
    this.message = '';
    this.getMonMtMbMdplData = function(reqJSON){
        var deferred = $q.defer();

        $http.post('http://10.14.151.179:3006/getMonitoringMtMbMdplRecord',reqJSON,{
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

    this.editMonMtMbMdplData = function(reqJSON){
        var deferred = $q.defer();
        $http.post('http://10.14.151.179:3006/editMonitoringMtMbMdplRecord',reqJSON,{
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