(function () {
    'use strict';

    angular
        .module('BlurAdmin.pages.authSignIn')
        .factory('authservice', authservice);

        authservice.$inject = ['$http', '$q' , '$rootScope'];

    function authservice($http, $q, $rootScope) {
        var service = {
            authenticate: authenticate
        };
        return service;

        function authenticate(username, password) {
            var defer = $q.defer();
            $http({
                method: 'POST',
                url: 'http://10.14.151.91:3006/authenticate',
                data: JSON.stringify({username : username, password:password}),
            }).success(function (data, status, headers) {
                if(data.msg === "success"){
                    localStorage.setItem('username', username);
                    if(data.isAdmin){
                        $rootScope.isAdmin = true;
                        localStorage.setItem('isAdmin', true);
                    }    
                    defer.resolve(data);
                }
                else{
                    defer.reject(err);
                }
            }).error(function (err) {
                defer.reject(err);
            });
            return defer.promise;
        }
    }
})();