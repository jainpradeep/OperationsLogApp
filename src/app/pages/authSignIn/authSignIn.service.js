(function () {
    'use strict';

    angular
        .module('BlurAdmin.pages.authSignIn')
        .factory('authservice', authservice);

        authservice.$inject = ['$http', '$q'];

    function authservice($http, $q) {
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
                if(data.msg === "success")
                    defer.resolve(data);
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