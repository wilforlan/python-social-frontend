(function() {
    'use strict';

    angular
        .module('pythonSocial')
        .config(AuthenticationModule);

    /** @ngInject */
    function AuthenticationModule($stateProvider) {
        $stateProvider
            .state('login', {
                url: '/app/auth/login',
                templateUrl: 'app/modules/authentication/login.html',
                controller: 'AuthenticationController',
                controllerAs: 'vm'
            })
            .state('register', {
                url: '/app/auth/register',
                templateUrl: 'app/modules/authentication/register.html',
                controller: 'AuthenticationController',
                controllerAs: 'vm'
            });
    }

})();