angular.module('BlurAdmin.pages.shiftNotes').service('notesService', function ($http,$q) {
    this.message = '';
    this.getnotesData = function(reqJSON){
        var deferred = $q.defer();

        $http.post('http://10.14.151.179:3006/getNotes',reqJSON,{
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

    this.editnotesData = function(reqJSON){
        var deferred = $q.defer();
        $http.post('http://10.14.151.179:3006/editNotes',reqJSON,{
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