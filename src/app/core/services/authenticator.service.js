(function() {
    'use strict';

    angular
        .module('pythonSocial')
        .factory('ApiAuthenticator', ['$state', 'Notification', '$rootScope', '$window', ApiAuthenticator]);

    function ApiAuthenticator(state, Notification, $rootScope, $window) {
        var reply = {};
        // var Notification = angular.injector(['Notification']);
        reply.authenticateAndRedirectApiResponse = function(response, callback) {
            if (response.status == 401) {
                reply.lock();
            } else if (response.status == 500) {
                Notification.error({ title: 'Error', body: 'Server is currently unable to process this request. Please contact admin.' });
                return false;
            } else if (response.status == 404) {
                //reply.logout();
                Notification.error({ title: 'Error', message: "Page not found" });
            } else if (response.status == 429) {
                Notification.error({ title: 'Error', message: 'You\'ve sent too many requests. Please wait a minute and try again.' });
                return false;
            } else {
                callback();
            }
        };

        reply.authenticateUserIsLoggedIn = function() {
            if (typeof localStorage.isUserLoggedIn === undefined || localStorage.isUserLoggedIn === "0") {
                // reply.toLogin();
                $window.location.href = '/#/app/auth/login';
                return false;
            }
            dispatchUserRootScopeLogin();
            return true;
        };

        function dispatchUserRootScopeLogin() {
            $rootScope.isBusinessLoggedIn = localStorage.getItem('isUserLoggedIn');
        }
        reply.saveUserLogin = function(user_object, cb) {
            localStorage.isUserLoggedIn = 1;
            localStorage.user_details = JSON.stringify(user_object.payload);
            localStorage.api_token = user_object.access_token;
            dispatchUserRootScopeLogin();
            cb();
        };

        reply.lock = function() {
            localStorage.isUserLoggedIn = 0;
            localStorage.api_token = "";

            state.go('lock');
        };

        reply.toLogin = function() {
            localStorage.isUserLoggedIn = 0;
            localStorage.user_details = "";
            localStorage.api_token = "";

            state.go('login', { has_error: true, message: { type: 'info', text: 'You need to login first' } });
        };

        reply.logout = function() {
            localStorage.isUserLoggedIn = 0;
            localStorage.user_details = "";
            localStorage.api_token = "";

            state.go('login', { has_error: true, message: { type: 'success', text: 'You have been logged out successfully' } });
        };

        reply.getSessionUser = function() {
            var user = { id: '', email: '' };

            if (angular.isDefined(localStorage.user_details)) {
                user = JSON.parse(localStorage.user_details);
            }

            return JSON.parse(user);
        };

        return reply;
    }
})();