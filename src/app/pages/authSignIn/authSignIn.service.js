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
                url: 'http://10.14.151.92:3006/authenticate',
                data: JSON.stringify({username : username, password:password}),
            }).success(function (data, status, headers) {
                defer.resolve(data);
            }).error(function (err) {
                defer.reject(err);
            });
            return defer.promise;
        }
    }
})();