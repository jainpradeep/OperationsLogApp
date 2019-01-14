(function () {
    'use strict';

    angular
        .module('BlurAdmin.pages.authSignIn')
        .factory('authservice', authservice);

        authservice.$inject = ['$http', '$q' , '$rootScope','toasterService'];

    function authservice($http, $q, $rootScope, toasterService) {
        var service = {
            authenticate: authenticate
        };
        return service;

        function authenticate(username, password) {
            var defer = $q.defer();
            $http({
                method: 'POST',
                url: 'http://10.14.151.179:3006/authenticate',
                data: JSON.stringify({username : username, password:password}),
            }).success(function (data, status, headers) {
                if(data.msg === "success"){
                    localStorage.setItem('username', username);
                    if(data.isAdmin){
                        $rootScope.isAdmin = true;
                        localStorage.setItem('isAdmin', true);
                    } 
                    if(data.isShiftOfficer){
                        $rootScope.isShiftOfficer = true;
                        localStorage.setItem('isShiftOfficer', true);
                    }    
                    defer.resolve(data);
                }
                else{
                    toasterService.openErrorToast("User Authentication Failed. Please enter correct credential!");
                    defer.reject("err");
                }
            }).error(function (err) {
                toasterService.openErrorToast("Internal Server Error! Please try again.");
                defer.reject(err);
            });
            return defer.promise;
        }
    }
})();