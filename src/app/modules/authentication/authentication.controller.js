(function() {
    'use strict';

    angular
        .module('pythonSocial')
        .controller('AuthenticationController', AuthenticationController);

    /** @ngInject */
    function AuthenticationController($http, $window, endpoint, Notification, Http, ApiAuthenticator, $state) {
        var vm = this;

        vm.performLogin = function performLogin(logins) {
            var options = {
                url: endpoint + '/auth/login',
                method: 'POST',
                data: vm.login || logins
            };
            Http.Normalload(options, successCallBack);

            function successCallBack(response) {
                var data = response.data;
                if (data.status === 'success') {
                    console.log(JSON.parse(data.payload));
                    ApiAuthenticator.saveUserLogin(data, function() {
                        $state.go('newsfeed.main');
                    });
                } else {
                    Notification.error({ title: 'Login Error', body: data.message });
                }
            }
        };

        vm.completeRegistration = function performLogin() {
            var options = {
                url: endpoint + '/auth/register',
                method: 'POST',
                data: vm.register
            };
            Http.Normalload(options, successCallBack);

            function successCallBack(response) {
                var data = response.data;
                if (data.status === 'success') {
                    Notification.success({ title: 'Registration Successful', body: 'We are logging you in !' });
                    vm.performLogin({ index: vm.register.username, password: vm.register.password })
                } else {
                    Notification.error({ title: 'Login Error', body: data.message });
                }
            }
        };

        vm.UserLogout = function UserLogout() {
            ApiAuthenticator.logout();
        };

    }
})();